import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/sushi-fusion-logo.png" alt="Sushi Fusion" />
          </div>
          <div>
            <div className="footer-brand">Sushi Fusion</div>
            <div className="footer-copy">© {year} Sushi Fusion. All rights reserved.</div>
          </div>
        </div>
        <div className="footer-locations">
          <span className="footer-tag">Location: Business Bay,Jumeirah Village Circle</span>
        </div>
      </div>
    </footer>
  );
}

