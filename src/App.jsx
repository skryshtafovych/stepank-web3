import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GitHub from './GitHub'
import BackgroundCanvas from './BackgroundCanvas'
import { blogPosts, categories } from './blogData'
import { blogService } from './blogService'
import Security from './Security'
import About from './About'
import NFT from './NFT'

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
    <span>
      ✅ Cache: {cacheInfo.size} bytes, {cacheInfo.age}ms old
    </span>
  );
}

function PageTitle() {
  useEffect(() => {
    document.title = "Stepan's Web3 Portfolio";
  }, []);
  return null;
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await blogService.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on technology, skiing, and Ukrainian culture</p>
        <div className="cache-info">
          <CacheInfo />
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-category">{post.category}</span>
              </div>
            </div>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-footer">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
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

export default App;
