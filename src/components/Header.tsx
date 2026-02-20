'use client';

import React, { useState } from 'react';

export default function Header({ cartCount }: { cartCount: number }) {
    const [activeMode, setActiveMode] = useState('Delivery');

    return (
        <header className="topbar">
            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Sushi Fusion Circular Badge Logo */}
            <div className="logo-wrap">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" fill="#FF6A0C" />
                    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="38" fill="white" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#FF6A0C" strokeWidth="2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#FF6A0C" strokeWidth="1.5" />
                    <ellipse cx="43" cy="52" rx="11" ry="7" fill="#FF6A0C" />
                    <ellipse cx="43" cy="49" rx="11" ry="7" fill="#FF6A0C" />
                    <ellipse cx="43" cy="49" rx="7.5" ry="4.5" fill="white" />
                    <ellipse cx="43" cy="48" rx="4.5" ry="3" fill="#FF6A0C" />
                    <ellipse cx="57" cy="54" rx="10" ry="6" fill="white" stroke="#FF6A0C" strokeWidth="1.5" />
                    <path d="M49,53 Q54,48 65,51" stroke="#FF6A0C" strokeWidth="1" fill="none" strokeDasharray="2,1.5" />
                    <path id="ta" d="M 16,50 A 34,34 0 0,1 84,50" fill="none" />
                    <text fontFamily="Arial,sans-serif" fontWeight="800" fontSize="8.5" fill="white" letterSpacing="2.8">
                        <textPath href="#ta" startOffset="7%">SUSHI FUSION</textPath>
                    </text>
                    <path id="ba" d="M 16,50 A 34,34 0 0,0 84,50" fill="none" />
                    <text fontFamily="Arial,sans-serif" fontWeight="800" fontSize="8.5" fill="#FF6A0C" letterSpacing="2.8">
                        <textPath href="#ba" startOffset="7%">SUSHI FUSION</textPath>
                    </text>
                </svg>
            </div>

            <div className="mode-tabs">
                {['Delivery', 'Pickup', 'Dine-In'].map((mode) => (
                    <button
                        key={mode}
                        className={`mode-tab ${activeMode === mode ? 'active' : ''}`}
                        onClick={() => setActiveMode(mode)}
                    >
                        {mode === 'Delivery' && '🏠'}
                        {mode === 'Pickup' && '🛍️'}
                        {mode === 'Dine-In' && '🍽️'} {mode}
                    </button>
                ))}
            </div>

            <button className="location-btn">📍 Select Location →</button>
            <div className="topbar-spacer"></div>

            <div className="search-wrap">
                <input type="text" placeholder="Search menu..." />
                <span className="si">🔍</span>
            </div>

            <button className="cart-btn">
                🛒<span className="cart-badge" id="cart-count">{cartCount}</span>
            </button>
            <button className="lang-btn">عربي</button>
            <button className="login-btn">LOGIN</button>
        </header>
    );
}
