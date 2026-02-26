'use client';

import React, { useState, useEffect } from 'react';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: string;
    onProceed: (data: any) => void;
    t: (key: string) => string;
}

export default function LocationModal({ isOpen, onClose, mode, onProceed, t }: LocationModalProps) {
    const [activeTab, setActiveTab] = useState<'Delivery' | 'Pickup'>('Delivery');
    const [searchQuery, setSearchQuery] = useState('');
    const [city, setCity] = useState('');
    const [store, setStore] = useState('');

    useEffect(() => {
        if (isOpen) {
            setActiveTab(mode === 'Pickup' ? 'Pickup' : 'Delivery');
        }
    }, [isOpen, mode]);

    if (!isOpen) return null;

    const handleDeliverySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onProceed({ mode: 'Delivery', address: searchQuery || 'Current Location' });
    };

    const handlePickupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onProceed({ mode: 'Pickup', city, store });
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {activeTab === 'Delivery' ? 'Select Delivery Location' : 'Select Pickup Location'}
                    </h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-tabs">
                    <button 
                        className={`modal-tab ${activeTab === 'Delivery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Delivery')}
                        type="button"
                    >
                        Delivery
                    </button>
                    <button 
                        className={`modal-tab ${activeTab === 'Pickup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Pickup')}
                        type="button"
                    >
                        Pickup
                    </button>
                </div>

                <div className="modal-body">
                    {activeTab === 'Delivery' && (
                        <form id="delivery-form" onSubmit={handleDeliverySubmit}>
                            <div className="delivery-search-bar">
                                <span className="search-icon">🔍</span>
                                <input 
                                    type="text" 
                                    placeholder="Search Location or Address" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="country-flag">🇦🇪</span>
                            </div>

                            <div className="map-placeholder">
                                <span className="map-pin">📍</span>
                                <button type="button" className="map-recenter" title="Recenter">
                                    🧭
                                </button>
                            </div>

                            <div className="login-prompt-bar">
                                <span className="login-prompt-text">Login to use your saved addresses</span>
                                <button type="button" className="login-prompt-btn">Login</button>
                            </div>

                            <button type="submit" className="btn-primary-large">
                                CONFIRM LOCATION
                            </button>
                        </form>
                    )}

                    {activeTab === 'Pickup' && (
                        <form id="pickup-form" onSubmit={handlePickupSubmit} className="pickup-form">
                            <div className="pickup-form-group">
                                <label className="pickup-form-label" htmlFor="city-select">Select City</label>
                                <select
                                    id="city-select"
                                    className="pickup-form-select"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select your city...</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                </select>
                            </div>

                            <div className="pickup-form-group">
                                <label className="pickup-form-label" htmlFor="store-select">Select Outlet</label>
                                <select
                                    id="store-select"
                                    className="pickup-form-select"
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    required
                                    disabled={!city}
                                >
                                    <option value="" disabled>Select an outlet...</option>
                                    <option value="Jumeirah Branch">Jumeirah Branch</option>
                                    <option value="Downtown Mall">Downtown Mall</option>
                                    <option value="Marina Walk">Marina Walk</option>
                                </select>
                            </div>

                            <button type="button" className="btn-outlined-location">
                                📍 Use My Location
                            </button>

                            <p className="pickup-helper-text">
                                Which outlet you would like to pickup from. Pickup service is available at select outlets only.
                            </p>

                            <button 
                                type="submit" 
                                className="btn-primary-large"
                                disabled={!city || !store}
                            >
                                PROCEED
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
