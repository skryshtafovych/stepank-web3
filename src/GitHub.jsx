import { useState, useEffect } from 'react';
import './GitHub.css';

function GitHub() {
  const [activeTab, setActiveTab] = useState('projects');
  const [myProjects, setMyProjects] = useState([]);
  const [likedRepos, setLikedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's repositories
      const reposResponse = await fetch('https://api.github.com/users/skryshtafovych/repos?sort=updated&per_page=100');
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const repos = await reposResponse.json();
      
      // Fetch user's starred repositories
      const starredResponse = await fetch('https://api.github.com/users/skryshtafovych/starred?per_page=100');
      if (!starredResponse.ok) {
        throw new Error('Failed to fetch starred repositories');
      }
      const starred = await starredResponse.json();

      // Process repositories
      const processedRepos = repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'No description available',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updated_at: repo.updated_at,
        is_fork: repo.fork
      }));

      // Process starred repositories
      const processedStarred = starred.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'No description available',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updated_at: repo.updated_at,
        owner: repo.owner.login
      }));

      setMyProjects(processedRepos);
      setLikedRepos(processedStarred);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const renderRepoCard = (repo) => (
    <div key={repo.id} className="repo-card">
      <div className="repo-header">
        <h3 className="repo-name">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            {repo.full_name || repo.name}
          </a>
        </h3>
        <div className="repo-stats">
          <span className="stat">
            <span className="stat-icon">⭐</span>
            {repo.stars.toLocaleString()}
          </span>
          <span className="stat">
            <span className="stat-icon">🔀</span>
            {repo.forks.toLocaleString()}
          </span>
        </div>
      </div>
      <p className="repo-description">{repo.description}</p>
      <div className="repo-footer">
        <span className="repo-language" data-language={repo.language}>{repo.language}</span>
        {repo.updated_at && (
          <span className="repo-updated">
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="github-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-container">
        <div className="error-container">
          <h2>Error loading GitHub data</h2>
          <p>{error}</p>
          <button onClick={fetchGitHubData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="github-container">
      <div className="github-header">
        <h1>GitHub</h1>
        <p>My projects and repositories I find interesting</p>
        <div className="github-profile">
          <img 
            src="https://github.com/skryshtafovych.png" 
            alt="Stepan Kryshtafovych" 
            className="profile-avatar"
          />
          <div className="profile-info">
            <h3>Stepan Kryshtafovych</h3>
            <p>Android Developer, Google Enthusiast, New Tool Dabbler</p>
            <p>📍 USA, CA | 🌐 stepank.com</p>
          </div>
        </div>
      </div>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          My Projects ({myProjects.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked Repos ({likedRepos.length})
        </button>
      </div>

      <div className="content-area">
        {activeTab === 'projects' && (
          <div className="repos-grid">
            {myProjects.length > 0 ? (
              myProjects.map(renderRepoCard)
            ) : (
              <div className="empty-state">
                <p>No repositories found</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'liked' && (
          <div className="repos-grid">
            {likedRepos.length > 0 ? (
              likedRepos.map(renderRepoCard)
            ) : (
              <div className="empty-state">
                <p>No starred repositories found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHub; 