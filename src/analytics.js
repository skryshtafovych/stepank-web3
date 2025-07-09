// src/analytics.js
export const sendPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
}; 