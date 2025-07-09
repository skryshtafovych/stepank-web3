import React, { useState, useEffect } from 'react';
import './KNews.css';

// Example quick ideas data
const ideas = [
  {
    id: 1,
    text: 'What if you could use AI to summarize your entire Google Drive in one click?',
    link: 'https://drive.google.com',
    driveEmbed: null
  },
  {
    id: 2,
    text: 'A daily "mood board" generated from your recent photos and docs.',
    link: null,
    driveEmbed: 'https://drive.google.com/file/d/1QwErTyUiOPeXAMPLE/preview'
  },
  {
    id: 3,
    text: 'Quick thought: What if every blog post had a "star rating" from your friends?',
    link: null,
    driveEmbed: null
  },
  {
    id: 4,
    text: 'Check out this Google Sheet for my latest crypto tracking:',
    link: null,
    driveEmbed: 'https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/preview'
  }
];

function AnimatedStar() {
  const [position, setPosition] = useState('top');

  useEffect(() => {
    let timeout;
    if (position === 'top') {
      timeout = setTimeout(() => setPosition('bottom'), 1200);
    } else {
      timeout = setTimeout(() => setPosition('top'), 1200);
    }
    return () => clearTimeout(timeout);
  }, [position]);

  return (
    <div className={`star-anim star-${position}`}>★</div>
  );
}

function KNews() {
  return (
    <div className="knews-container">
      <AnimatedStar />
      <h2 className="knews-title">K*news</h2>
      <p className="knews-sub">Quick ideas, thoughts, and experiments ✨</p>
      <div className="knews-list">
        {ideas.map(idea => (
          <div className="knews-card" key={idea.id}>
            <div className="knews-text">{idea.text}</div>
            {idea.link && (
              <a className="knews-link" href={idea.link} target="_blank" rel="noopener noreferrer">Open Link</a>
            )}
            {idea.driveEmbed && (
              <div className="knews-drive-embed">
                <iframe
                  src={idea.driveEmbed}
                  width="100%"
                  height="220"
                  allow="autoplay"
                  title="Google Drive Embed"
                  frameBorder="0"
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KNews; 