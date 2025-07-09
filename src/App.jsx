import { useState, useEffect } from 'react'
// import './App.css'

// Very simple debug component to test if React is working
function SimpleDebug() {
  return (
    <div style={{ 
      padding: '50px', 
      color: 'white', 
      background: 'red',
      fontSize: '24px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>🔴 RED BACKGROUND - React is working!</h1>
      <p>If you see this red background, React is loading correctly.</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  );
}

function App() {
  console.log('App component is rendering...');
  return <SimpleDebug />;
}

export default App;
