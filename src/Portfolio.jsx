import React, { useState } from 'react';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample NFT data - you can replace with real data from APIs
  const nftCollections = [
    {
      id: 1,
      name: "Carpathian Ski Legends",
      symbol: "CSL",
      description: "Legendary skiers conquering the Ukrainian Carpathians",
      floorPrice: "3.2 ETH",
      totalSupply: 5000,
      image: "",
      items: [
        { id: 1, name: "Carpathian Skier #007", image: "", rarity: "Legendary", description: "Golden Eagle Skier - Bukovel Peak" },
        { id: 2, name: "Carpathian Skier #042", image: "", rarity: "Epic", description: "Powder Hunter - Mount Hoverla" },
        { id: 3, name: "Carpathian Skier #133", image: "", rarity: "Rare", description: "Freestyle Master - Dragobrat Slopes" }
      ]
    },
    {
      id: 2,
      name: "Ukrainian Freedom Fighters",
      symbol: "UFF",
      description: "Digital warriors supporting Ukraine's sovereignty",
      floorPrice: "8.5 ETH",
      totalSupply: 10000,
      image: "",
      items: [
        { id: 1, name: "Freedom Fighter #001", image: "", rarity: "Legendary", description: "Cyber Resistance Leader" },
        { id: 2, name: "Freedom Fighter #777", image: "", rarity: "Epic", description: "Digital Defender" },
        { id: 3, name: "Freedom Fighter #888", image: "", rarity: "Rare", description: "Blockchain Patriot" }
      ]
    },
    {
      id: 3,
      name: "Ski Resort Memories",
      symbol: "SRM",
      description: "Capturing the magic of Ukrainian ski resorts",
      floorPrice: "1.8 ETH",
      totalSupply: 3000,
      image: "",
      items: [
        { id: 1, name: "Resort Memory #202", image: "", rarity: "Rare", description: "Sunset at Bukovel" },
        { id: 2, name: "Resort Memory #404", image: "", rarity: "Common", description: "Morning Powder Run" },
        { id: 3, name: "Resort Memory #505", image: "", rarity: "Epic", description: "Aerial View - Carpathian Peaks" }
      ]
    },
    {
      id: 4,
      name: "Kyiv Winter Warriors",
      symbol: "KWW",
      description: "Urban skiers conquering Kyiv's winter streets",
      floorPrice: "2.1 ETH",
      totalSupply: 2000,
      image: "",
      items: [
        { id: 1, name: "Winter Warrior #001", image: "", rarity: "Legendary", description: "Maidan Square Skier" },
        { id: 2, name: "Winter Warrior #007", image: "", rarity: "Epic", description: "Dnipro River Crosser" }
      ]
    },
    {
      id: 5,
      name: "Ukrainian Folk Skiers",
      symbol: "UFS",
      description: "Traditional Ukrainian culture meets modern skiing",
      floorPrice: "4.2 ETH",
      totalSupply: 1500,
      image: "",
      items: [
        { id: 1, name: "Folk Skier #123", image: "", rarity: "Legendary", description: "Vyshyvanka Skier" },
        { id: 2, name: "Folk Skier #456", image: "", rarity: "Rare", description: "Traditional Pattern Rider" },
        { id: 3, name: "Folk Skier #789", image: "", rarity: "Common", description: "Village Slope Master" }
      ]
    }
  ];

  // Sample DeFi tokens and collectibles
  const defiTokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: "12.5",
      value: "$25,000",
      image: "",
      change24h: "+5.2%"
    },
    {
      id: 2,
      name: "UkraineDAO",
      symbol: "UKRAINE",
      balance: "5000.0",
      value: "$2,500",
      image: "",
      change24h: "+15.3%"
    },
    {
      id: 3,
      name: "Ski Resort Token",
      symbol: "SKI",
      balance: "10000.0",
      value: "$1,800",
      image: "",
      change24h: "+8.7%"
    },
    {
      id: 4,
      name: "Carpathian Coin",
      symbol: "CARP",
      balance: "25000.0",
      value: "$3,750",
      image: "",
      change24h: "+12.1%"
    },
    {
      id: 5,
      name: "Kyiv Winter Token",
      symbol: "KWT",
      balance: "8000.0",
      value: "$1,200",
      image: "",
      change24h: "-2.1%"
    }
  ];

  // Sample collectibles
  const collectibles = [
    {
      id: 1,
      name: "ENS Domain",
      domain: "stepank.eth",
      value: "$500",
      image: "",
      type: "Domain"
    },
    {
      id: 2,
      name: "Ukraine Support POAP",
      description: "Stand With Ukraine - Digital Resistance",
      value: "Priceless",
      image: "",
      type: "Badge"
    },
    {
      id: 3,
      name: "Bukovel Ski Pass NFT",
      description: "Lifetime access to Carpathian slopes",
      value: "$1,200",
      image: "",
      type: "Access"
    },
    {
      id: 4,
      name: "Kyiv Winter Olympics Badge",
      description: "2024 Digital Winter Games Participant",
      value: "$300",
      image: "",
      type: "Achievement"
    },
    {
      id: 5,
      name: "Carpathian Mountain Guide",
      description: "Certified digital mountain guide",
      value: "$800",
      image: "",
      type: "Certification"
    },
    {
      id: 6,
      name: "Ukrainian Folk Art NFT",
      description: "Traditional vyshyvanka pattern",
      value: "$450",
      image: "",
      type: "Art"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Assets', count: nftCollections.length + defiTokens.length + collectibles.length },
    { id: 'nfts', name: 'NFTs', count: nftCollections.length },
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

  const getChangeColor = (change) => {
    return change.startsWith('+') ? '#10b981' : '#ef4444';
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Web3 Portfolio</h2>
        <p>My digital assets across the decentralized ecosystem</p>
      </div>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card">
          <h3>Total Value</h3>
          <p className="summary-value">$38,750</p>
          <span className="summary-change positive">+15.2% (24h)</span>
        </div>
        <div className="summary-card">
          <h3>NFTs Owned</h3>
          <p className="summary-value">13</p>
          <span className="summary-change positive">+5 this month</span>
        </div>
        <div className="summary-card">
          <h3>DeFi Positions</h3>
          <p className="summary-value">5</p>
          <span className="summary-change neutral">Active</span>
        </div>
        <div className="summary-card">
          <h3>Collectibles</h3>
          <p className="summary-value">6</p>
          <span className="summary-change positive">Growing</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="portfolio-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`portfolio-category ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
            <span className="portfolio-category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* NFTs Section */}
      {(selectedCategory === 'all' || selectedCategory === 'nfts') && (
        <div className="portfolio-section">
          <h3 className="section-title">NFT Collections</h3>
          <div className="nft-collections">
            {nftCollections.map(collection => (
              <div key={collection.id} className="nft-collection">
                <div className="collection-header">
                  <img src={collection.image} alt={collection.name} className="collection-image" />
                  <div className="collection-info">
                    <h4>{collection.name}</h4>
                    <p>{collection.description}</p>
                    <div className="collection-stats">
                      <span>Floor: {collection.floorPrice}</span>
                      <span>Supply: {collection.totalSupply.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="collection-items">
                  {collection.items.map(item => (
                    <div key={item.id} className="nft-item">
                      <img src={item.image} alt={item.name} />
                      <div className="nft-item-info">
                        <h5>{item.name}</h5>
                        <span 
                          className="rarity-badge"
                          style={{ backgroundColor: getRarityColor(item.rarity) }}
                        >
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DeFi Tokens Section */}
      {(selectedCategory === 'all' || selectedCategory === 'defi') && (
        <div className="portfolio-section">
          <h3 className="section-title">DeFi Tokens</h3>
          <div className="defi-tokens">
            {defiTokens.map(token => (
              <div key={token.id} className="defi-token">
                <div className="token-info">
                  <img src={token.image} alt={token.name} className="token-icon" />
                  <div className="token-details">
                    <h4>{token.name}</h4>
                    <p className="token-symbol">{token.symbol}</p>
                  </div>
                </div>
                <div className="token-balance">
                  <p className="balance-amount">{token.balance}</p>
                  <p className="balance-value">{token.value}</p>
                </div>
                <div className="token-change">
                  <span 
                    className="change-24h"
                    style={{ color: getChangeColor(token.change24h) }}
                  >
                    {token.change24h}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collectibles Section */}
      {(selectedCategory === 'all' || selectedCategory === 'collectibles') && (
        <div className="portfolio-section">
          <h3 className="section-title">Collectibles & Social</h3>
          <div className="collectibles-grid">
            {collectibles.map(item => (
              <div key={item.id} className="collectible-item">
                <img src={item.image} alt={item.name} className="collectible-image" />
                <div className="collectible-info">
                  <h4>{item.name}</h4>
                  {item.domain && <p className="collectible-domain">{item.domain}</p>}
                  {item.handle && <p className="collectible-handle">{item.handle}</p>}
                  {item.description && <p className="collectible-description">{item.description}</p>}
                  <div className="collectible-meta">
                    <span className="collectible-type">{item.type}</span>
                    <span className="collectible-value">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio; 