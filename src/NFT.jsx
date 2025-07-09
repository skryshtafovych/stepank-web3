import React, { useState, useEffect } from 'react';

function NFT() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intro, setIntro] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [nfts, setNfts] = useState([]);
  const [nftLoading, setNftLoading] = useState(true);

  // Your OpenSea wallet address
  const WALLET_ADDRESS = '0x82e0e3901f8634b2e64cfa3a3fe8c2ee4dadd429';

  // Sample summary/intro text
  const originalIntro = `Stepan's Web3 Portfolio showcases a creative collection of NFTs, DeFi tokens, and digital collectibles inspired by Ukrainian culture, skiing, and blockchain innovation. Explore unique assets, rare tokens, and digital achievements that reflect a passion for technology and tradition.`;

  // Sample DeFi tokens and collectibles (keeping these for now)
  const defiTokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: "12.5",
      image: "https://via.placeholder.com/100x100/627eea/ffffff?text=ETH"
    },
    {
      id: 2,
      name: "UkraineDAO",
      symbol: "UKRAINE",
      balance: "5000.0",
      image: "https://via.placeholder.com/100x100/0057b8/ffffff?text=UKR"
    },
    {
      id: 3,
      name: "Ski Resort Token",
      symbol: "SKI",
      balance: "10000.0",
      image: "https://via.placeholder.com/100x100/1e40af/ffffff?text=SKI"
    },
    {
      id: 4,
      name: "Carpathian Coin",
      symbol: "CARP",
      balance: "25000.0",
      image: "https://via.placeholder.com/100x100/059669/ffffff?text=CARP"
    },
    {
      id: 5,
      name: "Kyiv Winter Token",
      symbol: "KWT",
      balance: "8000.0",
      image: "https://via.placeholder.com/100x100/dc2626/ffffff?text=KWT"
    }
  ];

  // Sample collectibles
  const collectibles = [
    {
      id: 1,
      name: "ENS Domain",
      domain: "stepank.eth",
      image: "https://via.placeholder.com/200x200/6366f1/ffffff?text=ENS",
      type: "Domain"
    },
    {
      id: 2,
      name: "Ukraine Support POAP",
      description: "Stand With Ukraine - Digital Resistance",
      image: "https://via.placeholder.com/200x200/0057b8/ffffff?text=POAP",
      type: "Badge"
    },
    {
      id: 3,
      name: "Bukovel Ski Pass NFT",
      description: "Lifetime access to Carpathian slopes",
      image: "https://via.placeholder.com/200x200/1e40af/ffffff?text=PASS",
      type: "Access"
    },
    {
      id: 4,
      name: "Kyiv Winter Olympics Badge",
      description: "2024 Digital Winter Games Participant",
      image: "https://via.placeholder.com/200x200/dc2626/ffffff?text=OLYMP",
      type: "Achievement"
    },
    {
      id: 5,
      name: "Carpathian Mountain Guide",
      description: "Certified digital mountain guide",
      image: "https://via.placeholder.com/200x200/059669/ffffff?text=GUIDE",
      type: "Certification"
    },
    {
      id: 6,
      name: "Ukrainian Folk Art NFT",
      description: "Traditional vyshyvanka pattern",
      image: "https://via.placeholder.com/200x200/7c3aed/ffffff?text=FOLK",
      type: "Art"
    }
  ];

  // Fetch NFTs from OpenSea API
  const fetchNFTs = async () => {
    try {
      setNftLoading(true);
      
      // Try the newer API first
      const response = await fetch(`https://api.opensea.io/api/v2/chain/ethereum/account/${WALLET_ADDRESS}/nfts?limit=50`, {
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': '' // OpenSea API key (optional for public data)
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch NFTs from OpenSea');
      }

      const data = await response.json();
      
      if (data.nfts && data.nfts.length > 0) {
        setNfts(data.nfts);
      } else {
        // Fallback to legacy API if no results
        const legacyResponse = await fetch(`https://api.opensea.io/api/v1/assets?owner=${WALLET_ADDRESS}&limit=50`);
        if (legacyResponse.ok) {
          const legacyData = await legacyResponse.json();
          if (legacyData.assets && legacyData.assets.length > 0) {
            // Transform legacy format to match new format
            const transformedNfts = legacyData.assets.map(asset => ({
              identifier: asset.token_id,
              name: asset.name || `#${asset.token_id}`,
              description: asset.description,
              image_url: asset.image_url || asset.image_thumbnail_url,
              collection: asset.collection?.name || 'Unknown Collection',
              contract: asset.asset_contract?.address,
              token_standard: asset.asset_contract?.schema_name
            }));
            setNfts(transformedNfts);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      // Fallback to sample data if API fails
      setNfts([
        {
          identifier: "1",
          name: "Sample NFT #1",
          description: "Sample NFT from your collection",
          image_url: "https://via.placeholder.com/300x300/1e40af/ffffff?text=NFT1",
          collection: "Sample Collection",
          contract: "0x123...",
          token_standard: "ERC721"
        }
      ]);
    } finally {
      setNftLoading(false);
    }
  };

  // Group NFTs by collection
  const groupNFTsByCollection = () => {
    const grouped = {};
    nfts.forEach(nft => {
      const collection = nft.collection || 'Unknown Collection';
      if (!grouped[collection]) {
        grouped[collection] = [];
      }
      grouped[collection].push(nft);
    });
    return grouped;
  };

  const categories = [
    { id: 'all', name: 'All Assets', count: nfts.length + defiTokens.length + collectibles.length },
    { id: 'nfts', name: 'NFTs', count: nfts.length },
    { id: 'defi', name: 'DeFi', count: defiTokens.length },
    { id: 'collectibles', name: 'Collectibles', count: collectibles.length }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return '#fbbf24';
      case 'Epic': return '#8b5cf6';
      case 'Rare': return '#3b82f6';
      case 'Common': return '#6b7280';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    // Simulate loading and error (replace with real fetch if needed)
    setTimeout(() => {
      setIntro(originalIntro);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="portfolio-hero">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Stepan's</span> Web3 Portfolio
          </h1>
          <p className="hero-subtitle">
            Exploring the intersection of Ukrainian culture, skiing, and blockchain innovation
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{nfts.length + defiTokens.length + collectibles.length}</span>
              <span className="stat-label">Total Assets</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Object.keys(groupNFTsByCollection()).length}</span>
              <span className="stat-label">Collections</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{nfts.length}</span>
              <span className="stat-label">NFTs Owned</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-glow"></div>
            <img 
              src={nfts.length > 0 ? nfts[0].image_url : "https://via.placeholder.com/200x200/1e40af/ffffff?text=NFT"} 
              alt="Featured NFT" 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="portfolio-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading portfolio overview...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        ) : (
          <>
            {/* Portfolio Summary Cards */}
            <div className="summary-grid">
              <div className="summary-card glass">
                <div className="card-icon">🎨</div>
                <h3>NFTs Owned</h3>
                <p className="summary-value">{nfts.length}</p>
                <span className="summary-change positive">From OpenSea</span>
              </div>
              <div className="summary-card glass">
                <div className="card-icon">💰</div>
                <h3>DeFi Positions</h3>
                <p className="summary-value">{defiTokens.length}</p>
                <span className="summary-change neutral">Active</span>
              </div>
              <div className="summary-card glass">
                <div className="card-icon">🏆</div>
                <h3>Collectibles</h3>
                <p className="summary-value">{collectibles.length}</p>
                <span className="summary-change positive">Growing</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>

            {/* NFTs Section */}
            {(selectedCategory === 'all' || selectedCategory === 'nfts') && (
              <section className="portfolio-section">
                <h2 className="section-title">
                  <span className="gradient-text">NFT</span> Collections
                </h2>
                {nftLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your NFTs from OpenSea...</p>
                  </div>
                ) : (
                  <div className="collections-grid">
                    {Object.entries(groupNFTsByCollection()).map(([collectionName, collectionNFTs]) => (
                      <div key={collectionName} className="collection-card glass">
                        <div className="collection-header">
                          <img 
                            src={collectionNFTs[0]?.image_url || "https://via.placeholder.com/80x80/1e40af/ffffff?text=COLL"} 
                            alt={collectionName} 
                            className="collection-image" 
                          />
                          <div className="collection-info">
                            <h3>{collectionName}</h3>
                            <p>{collectionNFTs.length} NFTs in this collection</p>
                            <div className="collection-stats">
                              <span>Items: {collectionNFTs.length}</span>
                            </div>
                          </div>
                        </div>
                        <div className="collection-items">
                          {collectionNFTs.slice(0, 6).map(nft => (
                            <div key={nft.identifier} className="nft-item">
                              <img 
                                src={nft.image_url || "https://via.placeholder.com/120x120/6b7280/ffffff?text=NFT"} 
                                alt={nft.name} 
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/120x120/6b7280/ffffff?text=NFT";
                                }}
                              />
                              <div className="nft-item-info">
                                <h4>{nft.name || `#${nft.identifier}`}</h4>
                                <span className="rarity-badge" style={{ backgroundColor: '#3b82f6' }}>
                                  {nft.token_standard || 'NFT'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {collectionNFTs.length > 6 && (
                            <div className="nft-item">
                              <div className="more-items">
                                <span>+{collectionNFTs.length - 6} more</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

 
          
          
          
          </>
        )}
      </div>
    </div>
  );
}

export default NFT; 