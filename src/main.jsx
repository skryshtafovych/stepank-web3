import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import React from 'react';

console.log('main.jsx is loading...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log('React root created');
    
    // Test with plain React.createElement instead of JSX
    const testElement = React.createElement('div', {
      style: {
        color: 'white',
        background: 'red',
        padding: '50px',
        fontSize: '24px',
        textAlign: 'center',
        minHeight: '100vh'
      }
    }, '🔴 RED BACKGROUND - React is working!');
    
    root.render(testElement);
    console.log('App rendered');
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = '<div style="color: white; background: red; padding: 20px; font-size: 24px;">React Error: ' + error.message + '</div>';
  }
} else {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: white; background: red; padding: 20px; font-size: 24px;">Root element not found!</div>';
}
