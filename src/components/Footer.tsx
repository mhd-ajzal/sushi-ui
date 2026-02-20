import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Sushi Fusion</div>
        <div className="footer-locations">
          <span className="footer-tag">Business Bay</span>
          <span className="footer-tag">Jumeirah Village Circle</span>
        </div>
        <div className="footer-copy">© {year} Sushi Fusion. All rights reserved.</div>
      </div>
    </footer>
  );
}

