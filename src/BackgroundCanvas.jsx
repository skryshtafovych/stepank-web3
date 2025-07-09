import { useEffect, useRef, useState } from 'react';
import BackgroundGenerator from './backgroundGenerator';

function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const generatorRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !generatorRef.current) {
      // Initialize the background generator
      generatorRef.current = new BackgroundGenerator();
      generatorRef.current.init(canvasRef.current);
      
      // Generate the initial background
      generatorRef.current.generateBackground();
    }
  }, []);

  const generateNewBackground = () => {
    if (generatorRef.current) {
      setIsGenerating(true);
      
      // Generate a new user seed for variety
      generatorRef.current.userSeed = Math.floor(Math.random() * 1000000);
      
      // Generate new background
      generatorRef.current.generateBackground();
      
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Background controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button
          onClick={generateNewBackground}
          disabled={isGenerating}
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: '#1f2937',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: '600',
            opacity: isGenerating ? 0.6 : 1,
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          title="Generate new background pattern"
        >
          {isGenerating ? '🎨 Generating...' : '🎨 New Pattern'}
        </button>
        
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.7rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          AI Background
        </div>
      </div>
    </>
  );
}

export default BackgroundCanvas; 