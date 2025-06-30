// Blog service for fetching data from GitHub with localStorage caching
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/skryshtafovych/web3/main/blog.json';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = 'stepank_blog_cache';
const CACHE_TIMESTAMP_KEY = 'stepank_blog_cache_timestamp';

class BlogService {
  constructor() {
    this.cache = null;
    this.cacheTimestamp = null;
    this.loadCacheFromStorage();
  }

  loadCacheFromStorage() {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();
        
        if (now - timestamp < CACHE_DURATION) {
          this.cache = JSON.parse(cachedData);
          this.cacheTimestamp = timestamp;
          console.log('Loaded cached data from localStorage:', this.cache);
        } else {
          console.log('Cached data expired, clearing localStorage');
          this.clearCache();
        }
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
      this.clearCache();
    }
  }

  saveCacheToStorage(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      console.log('Saved data to localStorage cache');
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  async fetchBlogData() {
    try {
      // Check if we have valid cached data
      if (this.cache && this.cacheTimestamp && (Date.now() - this.cacheTimestamp) < CACHE_DURATION) {
        console.log('Returning cached blog data from memory');
        return this.cache;
      }

      console.log('🔍 Starting GitHub fetch from:', GITHUB_RAW_URL);
      const response = await fetch(GITHUB_RAW_URL);
      
      console.log('📡 GitHub response status:', response.status);
      console.log('📡 GitHub response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawText = await response.text();
      console.log('📄 Raw GitHub response (first 500 chars):', rawText.substring(0, 500));
      
      const data = JSON.parse(rawText);
      console.log('✅ JSON parsed successfully');
      console.log('📊 Raw GitHub data structure:', Object.keys(data));
      console.log('📊 Blog object keys:', data.blog ? Object.keys(data.blog) : 'No blog object');
      
      // Transform the data to our internal format
      const transformedData = this.transformBlogData(data);
      console.log('🔄 Transformed data:', transformedData);
      
      // Cache the transformed data in memory and localStorage
      this.cache = transformedData;
      this.cacheTimestamp = Date.now();
      this.saveCacheToStorage(transformedData);
      
      console.log('💾 Blog data fetched and cached successfully');
      return transformedData;
      
    } catch (error) {
      console.error('❌ Error fetching blog data:', error);
      console.error('❌ Error details:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      // Try to load from localStorage as fallback
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          console.log('🔄 Using fallback data from localStorage');
          const parsedData = JSON.parse(cachedData);
          this.cache = parsedData;
          this.cacheTimestamp = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0');
          return parsedData;
        }
      } catch (fallbackError) {
        console.error('❌ Error loading fallback data:', fallbackError);
      }
      
      throw error;
    }
  }

  transformBlogData(rawData) {
    console.log('🔄 Starting data transformation...');
    console.log('📥 Raw data type:', typeof rawData);
    console.log('📥 Raw data keys:', Object.keys(rawData));
    
    // Handle the GitHub JSON format
    const blog = rawData.blog;
    
    if (!blog) {
      console.error('❌ No blog data found in response');
      return { posts: [], categories: [] };
    }
    
    console.log('📊 Blog object found with keys:', Object.keys(blog));
    
    // Check if we have posts array in the blog object
    if (blog.posts && Array.isArray(blog.posts)) {
      console.log('✅ Found posts array with', blog.posts.length, 'posts');
      console.log('📝 First post title:', blog.posts[0]?.title);
      
      // Transform each post to our internal format
      const transformedPosts = blog.posts.map((post, index) => {
        console.log(`🔄 Transforming post ${index + 1}:`, post.title);
        
        const transformedPost = {
          id: index + 1, // Use index + 1 as ID since we need numeric IDs
          title: post.title || 'Untitled Post',
          author: post.author || 'Stepank',
          date: post.date || new Date().toISOString().split('T')[0],
          tags: post.tags || [],
          summary: post.summary || 'No summary available',
          content: post.content || [],
          media: post.media || [],
          extensible: post.extensible || false,
          featured: post.featured || false,
          readTime: post.readTime || this.calculateReadTime(post.content),
          imageUrl: post.imageUrl || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
          slug: post.slug || this.generateSlug(post.title || 'untitled')
        };
        
        console.log(`✅ Transformed post ${index + 1}:`, transformedPost.title);
        return transformedPost;
      });
      
      console.log('📊 All transformed posts:', transformedPosts.map(p => ({ id: p.id, title: p.title, featured: p.featured })));
      
      // Use categories from the blog object if available, otherwise generate from tags
      let transformedCategories = [];
      if (blog.categories && Array.isArray(blog.categories)) {
        transformedCategories = blog.categories;
        console.log('✅ Using provided categories:', transformedCategories);
      } else {
        // Generate categories from all post tags
        const allTags = transformedPosts.flatMap(post => post.tags);
        transformedCategories = this.generateCategories(allTags);
        console.log('🔄 Generated categories from tags:', transformedCategories);
      }
      
      const result = {
        posts: transformedPosts,
        categories: transformedCategories
      };
      
      console.log('🎉 Transformation complete!');
      console.log('📊 Final result - Posts:', result.posts.length, 'Categories:', result.categories.length);
      
      return result;
    }
    
    // Fallback: handle the old format (single blog post)
    console.log('⚠️ No posts array found, treating as single blog post');
    const post = {
      id: 1,
      title: blog.title || 'Untitled Post',
      author: blog.author || 'Stepank',
      date: blog.date || new Date().toISOString().split('T')[0],
      tags: blog.tags || [],
      summary: blog.summary || 'No summary available',
      content: blog.content || [],
      media: blog.media || [],
      extensible: blog.extensible || false,
      featured: true,
      readTime: this.calculateReadTime(blog.content),
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      slug: this.generateSlug(blog.title || 'untitled')
    };
    
    console.log('✅ Created single post:', post.title);
    
    return {
      posts: [post],
      categories: this.generateCategories(blog.tags || [])
    };
  }

  calculateReadTime(content) {
    if (!content || !Array.isArray(content)) return "5 min read";
    
    // Count words in all text content
    const totalWords = content.reduce((count, item) => {
      if (item.text) {
        return count + item.text.split(' ').length;
      }
      return count;
    }, 0);
    
    // Average reading speed: 200 words per minute
    const minutes = Math.ceil(totalWords / 200);
    return `${minutes} min read`;
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  generateCategories(tags) {
    const categoryMap = {
      'Web3': 'web3',
      'Development': 'development', 
      'DeFi': 'defi',
      'Smart Contracts': 'smart-contracts',
      'NFTs': 'nfts',
      'Security': 'security',
      'Scaling': 'scaling'
    };

    const categories = [
      { name: "All", slug: "all", count: 1 }
    ];

    tags.forEach(tag => {
      const slug = categoryMap[tag] || tag.toLowerCase().replace(/\s+/g, '-');
      const existingCategory = categories.find(cat => cat.slug === slug);
      
      if (!existingCategory) {
        categories.push({
          name: tag,
          slug: slug,
          count: 1
        });
      } else {
        existingCategory.count++;
      }
    });

    return categories;
  }

  clearCache() {
    this.cache = null;
    this.cacheTimestamp = null;
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log('Cache cleared from memory and localStorage');
  }

  getCacheInfo() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp);
      const now = Date.now();
      const age = now - timestamp;
      const isExpired = age >= CACHE_DURATION;
      
      return {
        exists: true,
        age: age,
        ageMinutes: Math.floor(age / 60000),
        isExpired: isExpired,
        dataSize: cachedData.length,
        timestamp: new Date(timestamp).toLocaleString()
      };
    }
    
    return {
      exists: false,
      age: 0,
      ageMinutes: 0,
      isExpired: true,
      dataSize: 0,
      timestamp: null
    };
  }
}

export const blogService = new BlogService(); 