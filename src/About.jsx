import React, { useState, useEffect } from 'react';

function About() {
  const [aboutText, setAboutText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const originalText = `Stepan Kryshtafovych is a seasoned software developer with extensive experience in mobile application development and database administration. Since joining the California State Lottery in 2013, he has played a key role in developing native mobile applications and managing lottery operations databases. Prior to his work with the California State Lottery, Stepan served as a Tech Manager at Staples, where he honed his skills in technical management and customer service. He is a graduate of California State University-Sacramento and is proficient in English, Ukrainian, and Polish. With a strong background in both public and private sectors, Stepan brings a wealth of knowledge in cybersecurity, project management, and a wide array of mobile technologies.`;

  const verifyRecaptcha = async () => {
    return new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined') {
        // If reCAPTCHA is not loaded, proceed without verification
        resolve(true);
        return;
      }
      
      grecaptcha.ready(() => {
        grecaptcha.execute('6LejYnMrAAAAAB5mYjXEdZCMvVFgZVsckqlyCYur', {action: 'about_page'})
          .then(token => {
            // For now, just resolve with true if we get a token
            // In production, you might want to verify the token with your backend
            resolve(true);
          })
          .catch(error => {
            console.error('reCAPTCHA error:', error);
            reject(error);
          });
      });
    });
  };

  useEffect(() => {
    const fetchRewrittenText = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Verify reCAPTCHA first
        await verifyRecaptcha();
        
        const response = await fetch('/api/rewrite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: originalText
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rewritten text');
        }

        const data = await response.json();
        setAboutText(data.rewrittenText);
      } catch (err) {
        console.error(err);
        setError('Could not generate a new about section. Please try again later.');
        setAboutText(originalText); // Fallback to original text
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewrittenText();
  }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <div className="about-container">
      <div className="about-card">
        <h2 className="about-title">About Stepan Kryshtafovych</h2>
        {isLoading ? (
          <p className="about-text">Generating a unique introduction...</p>
        ) : error ? (
            <p className="about-text" style={{ color: 'red' }}>{error}</p>
        ) : (
          <p className="about-text">{aboutText}</p>
        )}
      </div>
    </div>
  );
}

export default About; 