'use client';

import React, { useState } from 'react';
import LocationModal from './LocationModal';
import type { Language } from '@/lib/i18n';

interface HeaderProps {
    cartCount: number;
    onToggleCart: () => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    language: Language;
    onToggleLanguage: () => void;
    t: (key: string) => string;
}

export default function Header({
    cartCount,
    onToggleCart,
    searchValue,
    onSearchChange,
    language,
    onToggleLanguage,
    t,
}: HeaderProps) {
    const [activeMode, setActiveMode] = useState<'delivery' | 'pickup' | 'dineIn'>('delivery');
    const [showLocationModal, setShowLocationModal] = useState(false);

    const handleModeClick = (mode: 'delivery' | 'pickup' | 'dineIn') => {
        setActiveMode(mode);
        setShowLocationModal(true);
    };

    const renderModeTabs = (className: string) => {
        const modes: { key: 'delivery' | 'pickup' | 'dineIn'; icon: string }[] = [
            { key: 'delivery', icon: '🏠' },
            { key: 'pickup', icon: '🛍️' },
            { key: 'dineIn', icon: '🍽️' },
        ];

        return (
            <div className={className}>
                {modes.map((mode) => (
                    <button
                        key={mode.key}
                        className={`mode-tab ${activeMode === mode.key ? 'active' : ''}`}
                        onClick={() => handleModeClick(mode.key)}
                    >
                        {mode.icon} {t(`header.mode.${mode.key}`)}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <header className="topbar">
            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="logo-wrap">
                <img src="/sushi-fusion-logo.png" alt="Sushi Fusion" />
            </div>

            {renderModeTabs('mode-tabs')}

            <button className="location-btn">📍 {t('header.selectLocation')}</button>
            <div className="topbar-spacer"></div>

            <div className="search-wrap">
                <input
                    type="text"
                    placeholder={t('header.searchPlaceholder')}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <span className="si">🔍</span>
            </div>

            <button className="cart-btn" onClick={onToggleCart}>
                🛒<span className="cart-badge" id="cart-count">{cartCount}</span>
            </button>
            <button className="lang-btn" onClick={onToggleLanguage}>
                {language === 'en' ? 'عربي' : 'EN'}
            </button>
            <button className="login-btn">{t('header.login')}</button>

            {renderModeTabs('mode-tabs-mobile')}

            <LocationModal
                isOpen={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                mode={t(`header.mode.${activeMode}`)}
                t={t}
                onProceed={(data) => {
                    console.log('Location Data:', data);
                    setShowLocationModal(false);
                }}
            />
        </header>
    );
}
