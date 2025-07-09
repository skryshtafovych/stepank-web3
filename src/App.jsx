import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GitHub from './GitHub'
import BackgroundCanvas from './BackgroundCanvas'
import { blogPosts, categories } from './blogData'
import { blogService } from './blogService'
import Security from './Security'
import About from './About'
import Portfolio from './NFT'

// Import the GitHub URL for debugging
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/skryshtafovych/web3/main/blog.json';

function CacheInfo() {
  const [cacheInfo, setCacheInfo] = useState(blogService.getCacheInfo());

  useEffect(() => {
    const updateCacheInfo = () => {
      setCacheInfo(blogService.getCacheInfo());
    };

    // Update cache info every second
    const interval = setInterval(updateCacheInfo, 1000);
    return () => clearInterval(interval);
  }, []);


  
  if (!cacheInfo.exists) {
    return <span>❌ No cache</span>;
  }

  return (
    <span style={{ 
      color: cacheInfo.isExpired ? '#ef4444' : '#10b981',
      fontWeight: 'bold'
    }}>
      {cacheInfo.isExpired ? '⚠️' : '✅'} Cache: {cacheInfo.ageMinutes}m old ({cacheInfo.dataSize} chars)
    </span>
  );
}

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogData, setBlogData] = useState({ posts: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    console.log('Expanded card state changed:', expandedCard);
  }, [expandedCard]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await blogService.fetchBlogData();
      console.log('Fetched blog data in component:', data);
      setBlogData(data);
      
    } catch (err) {
      console.error('Failed to fetch blog data:', err);
      setError('Failed to load blog posts. Please try again later.');
      
      // Fallback to local data
      console.log('Using fallback local data');
      setBlogData({ posts: blogPosts, categories: categories });
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (postId) => {
    console.log('Card clicked:', postId, 'Current expanded:', expandedCard);
    
    if (expandedCard === postId) {
      // Collapse the card
      console.log('Collapsing card:', postId);
      setExpandedCard(null);
    } else {
      // Expand the card
      console.log('Expanding card:', postId);
      setExpandedCard(postId);
      
      // Scroll to the expanded card after animation
      setTimeout(() => {
        const element = document.getElementById(`blog-card-${postId}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 300);
    }
  };

  const handleCloseCard = (e) => {
    e.stopPropagation();
    console.log('Close button clicked');
    setExpandedCard(null);
  };

  const handleReadMoreClick = (e, postId) => {
    e.stopPropagation();
    console.log('Read More button clicked for post:', postId);
    handleCardClick(postId);
  };

  // Reset body overflow when card is collapsed
  useEffect(() => {
    if (!expandedCard) {
      document.body.style.overflow = 'auto';
    }
  }, [expandedCard]);

  const renderContent = (content) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return <p key={index}>{item.text}</p>;
        case 'heading':
          return <h3 key={index}>{item.text}</h3>;
        case 'analogy':
          return (
            <div key={index} className="analogy">
              <strong>Analogy:</strong> {item.text}
            </div>
          );
        default:
          return <p key={index}>{item.text}</p>;
      }
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? blogData.posts 
    : blogData.posts.filter(post => post.tags.some(tag => 
        blogData.categories.find(cat => cat.slug === selectedCategory)?.name.toLowerCase().includes(tag.toLowerCase())
      ));

  console.log('Blog data posts:', blogData.posts);
  console.log('Filtered posts:', filteredPosts);
  console.log('Selected category:', selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="blog-header">
          <h2>Web3 Blog</h2>
          <p>Loading latest posts...</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching blog data from GitHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="blog-header">
          <h2>Web3 Blog</h2>
          <p>Exploring the decentralized future, one post at a time</p>
        </div>
        <div className="error-container">
          <h3>⚠️ Connection Issue</h3>
          <p>{error}</p>
          <p>Showing cached content while we reconnect...</p>
          <button onClick={fetchBlogData} className="retry-button">
            Try Again
          </button>
        </div>
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className={`blog-card ${post.featured ? 'featured' : ''}`}>
              <div className="blog-card-image">
                <img src={post.imageUrl} alt={post.title} />
              </div>
              
              <div className="blog-card-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-summary">{post.summary}</p>
                
                <div className="blog-card-meta">
                  <span className="blog-card-author">{post.author}</span>
                  <span className="blog-card-date">{formatDate(post.date)}</span>
                </div>
                
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="blog-card-tag">{tag}</span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="blog-card-tag">+{post.tags.length - 3}</span>
                  )}
                </div>
                
                <div className="blog-card-footer">
                  <span className="blog-card-read-time">{post.readTime}</span>
                  <button className="blog-card-button">Read More</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-header">
        
        <p>Exploring the decentralized future, one post at a time</p>

         
      
      </div>

      <div className="blog-categories">
        {blogData.categories.map(category => (
          <button
            key={category.slug}
            className={`blog-category ${selectedCategory === category.slug ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.name}
            <span className="blog-category-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className={`blog-grid ${expandedCard ? 'expanded' : ''}`}>
        {filteredPosts.map(post => {
          console.log('Rendering post:', post.id, post.title, 'Expanded:', expandedCard === post.id);
          return (
            <article 
              key={post.id} 
              id={`blog-card-${post.id}`}
              className={`blog-card ${post.featured ? 'featured' : ''} ${expandedCard === post.id ? 'expanded' : ''}`}
              onClick={() => {
                console.log('Card clicked!', post.id, 'Current expanded:', expandedCard);
                handleCardClick(post.id);
              }}
            >
              <div className="blog-card-image">
                <img src={post.imageUrl} alt={post.title} />
              </div>
              
              <div className="blog-card-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-summary">{post.summary}</p>
                
                <div className="blog-card-meta">
                  <span className="blog-card-author">{post.author}</span>
                  <span className="blog-card-date">{formatDate(post.date)}</span>
                </div>
                
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="blog-card-tag">{tag}</span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="blog-card-tag">+{post.tags.length - 3}</span>
                  )}
                </div>
                
                <div className="blog-card-footer">
                  <span className="blog-card-read-time">{post.readTime}</span>
                  <button 
                    className={`blog-card-button ${expandedCard === post.id ? 'expanded' : ''}`}
                    onClick={(e) => {
                      console.log('Read More button clicked!', post.id);
                      handleReadMoreClick(e, post.id);
                    }}
                  >
                    {expandedCard === post.id ? 'Close' : 'Read More'}
                  </button>
                </div>

                {/* Expanded content */}
                <div className="blog-card-expanded-content">
                  {renderContent(post.content)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}


function PageTitle() {
  const location = useLocation();
  let title = '';
  if (location.pathname === '/') {
    title = 'Web3 Blog';
  } else if (location.pathname === '/about') {
    title = 'About Stepank';
  } else if (location.pathname === '/github') {
    title = 'GitHub';
  }
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ margin: 0, fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.02em' }}>{title}</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <BackgroundCanvas />
      <PageTitle />
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Blog</Link>
        <Link to="/github" className={`nav-item ${location.pathname === '/github' ? 'active' : ''}`}>GitHub</Link>
        <Link to="/security" className={`nav-item ${location.pathname === '/security' ? 'active' : ''}`}>Security</Link>
        <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
        <Link to="/NFT" className={`nav-item ${location.pathname === '/NFT' ? 'active' : ''}`}>NFT</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/github" element={<GitHub />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />
        <Route path="/NFT" element={<NFT />} />
      </Routes>
    </Router>
  );
}

export default App
