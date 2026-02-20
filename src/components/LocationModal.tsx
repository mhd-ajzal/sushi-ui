'use client';

import React, { useState } from 'react';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: string;
    onProceed: (data: any) => void;
    t: (key: string) => string;
}

export default function LocationModal({ isOpen, onClose, mode, onProceed, t }: LocationModalProps) {
    const [city, setCity] = useState('');
    const [store, setStore] = useState('');

    if (!isOpen) return null;

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onProceed({ city, store, mode });
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{t('location.title')}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <p style={{ fontSize: '14px', color: 'var(--g)', marginBottom: '20px' }}>
                        {t('location.selectedPrefix')} <strong>{mode}</strong>. {t('location.bodySuffix')}
                    </p>

                    <form id="location-form" onSubmit={handlesubmit}>
                        {mode !== 'Dine-In' && (
                            <button type="button" className="use-location-btn">
                                📍 {t('location.useMyLocation')}
                            </button>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="city-select">{t('location.city')}</label>
                            <select
                                id="city-select"
                                className="form-select"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            >
                                <option value="" disabled>{t('location.selectYourCity')}</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Abu Dhabi">Abu Dhabi</option>
                                <option value="Sharjah">Sharjah</option>
                            </select>
                        </div>

                        {(mode === 'Pickup' || mode === 'Dine-In') && (
                            <div className="form-group">
                                <label className="form-label" htmlFor="store-select">{t('location.store')}</label>
                                <select
                                    id="store-select"
                                    className="form-select"
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>{t('location.selectStore')}</option>
                                    <option value="Jumeirah Branch">Jumeirah Branch</option>
                                    <option value="Downtown Mall">Downtown Mall</option>
                                    <option value="Marina Walk">Marina Walk</option>
                                </select>
                            </div>
                        )}
                    </form>
                </div>

                <div className="modal-footer">
                    <button
                        type="submit"
                        form="location-form"
                        className="btn-primary"
                        disabled={!city || ((mode === 'Pickup' || mode === 'Dine-In') && !store)}
                    >
                        {t('location.proceed')}
                    </button>
                </div>
            </div>
        </div>
    );
}
