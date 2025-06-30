import { useEffect, useState, useRef } from 'react';
import { AudioVisualizer } from '@fjw/audiovisualizer';

function Security() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [micError, setMicError] = useState(null);
  const [httpsWarning, setHttpsWarning] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(true);

  const visualizer = useRef(null);

  useEffect(() => {
    // HTTPS/localhost check
    if (!(window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      setHttpsWarning(true);
    }
    fetch('https://ipapi.co/json/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch IP info');
        return res.json();
      })
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Initialize the visualizer once on component mount
  useEffect(() => {
    try {
      visualizer.current = new AudioVisualizer({
        v: [
          {
            type: "spectrum",
            container: "#spectrum-container"
          },
          {
            type: "waveform",
            container: "#waveform-container"
          }
        ]
      });
    } catch (err) {
      console.error("Failed to initialize visualizer:", err);
      setMicError("Could not start visualizer. " + err.message);
    }
    // No cleanup needed as per library docs, it seems to manage its own lifecycle
  }, []);

  const handleMic = () => {
    if (visualizer.current) {
        try {
            setMicError(null);
            visualizer.current.setSource(null); // null uses microphone
        } catch (err) {
            setMicError("Failed to switch to microphone. " + err.message);
        }
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && visualizer.current) {
      try {
        setMicError(null);
        const url = URL.createObjectURL(file);
        visualizer.current.setSource(url);
      } catch (err) {
        setMicError("Failed to load audio file. " + err.message);
      }
    }
  };
  
  return (
    <div className="security-container">
      <h2 style={{marginBottom: '2rem'}}>Security & IP Information</h2>
      <div className="security-card blog-card">
        {loading && <p>Loading your security info...</p>}
        {error && <p style={{color: '#fbbf24'}}>{error}</p>}
        {info && (
          <>
            <div className="security-row"><span>IP Address:</span> <b>{info.ip}</b></div>
            <div className="security-row"><span>City:</span> <b>{info.city}</b></div>
            <div className="security-row"><span>Region:</span> <b>{info.region}</b></div>
            <div className="security-row"><span>Country:</span> <b>{info.country_name}</b></div>
            <div className="security-row"><span>ISP:</span> <b>{info.org}</b></div>
            <div className="security-row"><span>Coordinates:</span> <b>{info.latitude}, {info.longitude}</b></div>
          </>
        )}
      </div>
      {httpsWarning && (
        <div style={{color:'#f87171', marginBottom:'1rem', fontWeight:600}}>
          Microphone access requires HTTPS or localhost. Please use a secure connection.
        </div>
      )}
      <div style={{marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
        <p>This information is fetched from <a href="https://ipapi.co/" target="_blank" rel="noopener noreferrer" style={{color:'#fbbf24'}}>ipapi.co</a> and is only visible to you. It helps you understand what information is visible to websites you visit.</p>
      </div>

      <div className="audio-visualizer-section card--style">
        <div className="audio-visualizer-header" onClick={() => setIsVisualizerOpen(p => !p)}>
          <h3>Audio Visualizer</h3>
          <button className="collapse-btn">
              <div className="icon-plus"></div>
          </button>
        </div>
        <div className={`audio-visualizer-content ${isVisualizerOpen ? 'open' : ''}`}>
          <div> {/* This extra div is needed for the grid animation to work correctly */}
            <div style={{display:'flex', gap:'1rem', alignItems:'center', marginBottom:'1rem', flexWrap: 'wrap'}}>
              <input type="file" accept="audio/*" onChange={handleAudioChange} />
              <button onClick={(e) => { e.stopPropagation(); handleMic(); }} className="mic-btn" style={{background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', color: '#1f2937', fontWeight:600, border:'none', borderRadius:8, padding:'8px 18px', cursor: 'pointer', fontSize:'0.95rem', transition:'all 0.2s'}}>
                Use Microphone
              </button>
            </div>
            {micError && <div style={{color:'#f87171', marginBottom:'1rem'}}>{micError}</div>}
            {/* The library will create its own audio element, so we don't need one */}
            <div className="visualizer-row">
              <div id="spectrum-container" className="visualizer-container" />
              <div id="waveform-container" className="visualizer-container" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;