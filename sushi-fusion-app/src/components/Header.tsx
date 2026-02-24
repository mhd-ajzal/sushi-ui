'use client';

import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Form state
    const [city, setCity] = useState('');
    const [store, setStore] = useState('');

    const handleModeClick = (mode: 'delivery' | 'pickup' | 'dineIn') => {
        setActiveMode(mode);
        setIsPopoverOpen(true);
    };

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Location Data:', { city, store, mode: t(`header.mode.${activeMode}`) });
        setIsPopoverOpen(false);
    };

    const renderModeTabs = (className: string) => {
        const modes: { key: 'delivery' | 'pickup' | 'dineIn'; icon: React.ReactNode }[] = [
            { key: 'delivery', icon: <img src="/images/delivery-man.png" alt="Delivery" className="mode-icon" /> },
            { key: 'pickup', icon: <img src="/images/pickup.png" alt="Pickup" className="mode-icon" /> },
            { key: 'dineIn', icon: <img src="/images/dine in.png" alt="Dine In" className="mode-icon" /> },
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

    const currentModeText = t(`header.mode.${activeMode}`);

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

            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <button className="location-btn bg-white hover:bg-gray-50/80 outline-none ring-0 border border-solid border-gray-200 text-gray-800 transition-all duration-300 rounded-full h-auto py-2.5 px-5 flex items-center gap-2.5 font-bold text-[14px] whitespace-nowrap md:w-auto w-max hover:shadow-md hover:border-[#ed3743] hover:text-[#ed3743] focus:bg-gray-50 active:scale-95 cursor-pointer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ed3743] drop-shadow-sm"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="center"
                    sideOffset={0}
                    className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:p-6 bg-black/20 backdrop-blur-[2px] border-none shadow-none ring-0 w-screen max-w-none"
                >
                    <div className="mt-10 w-full max-w-[720px] rounded-[24px] bg-white shadow-[0_26px_80px_rgba(15,23,42,0.45)] ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in-[0.98] duration-300 ease-out">
                    {/* Header */}
                    <div className="flex justify-between items-center px-7 py-5 border-b border-gray-100 bg-white/50">
                        <h3 className="text-[19px] font-[800] text-gray-900 tracking-tight font-sans">
                            Select <span className="text-[#ed3743] capitalize">{activeMode.replace(/([A-Z])/g, ' $1').trim()}</span> Location
                        </h3>
                        <button className="text-gray-400 hover:text-[#ed3743] transition-all bg-transparent hover:bg-red-50 p-2 rounded-full cursor-pointer active:scale-90" aria-label="Close" onClick={() => setIsPopoverOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div className="px-7 py-6 flex flex-col gap-5">
                        {/* Search Bar */}
                        <div className="relative flex items-center border border-gray-200 rounded-[14px] bg-[#F9FAFB] overflow-hidden shadow-sm h-[54px] focus-within:bg-white focus-within:border-[#ed3743] focus-within:ring-4 focus-within:ring-[#ed3743]/10 transition-all duration-300">
                            <div className="pl-5 pr-3 text-gray-400 flex items-center justify-center transition-colors focus-within:text-[#ed3743]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <div className="flex items-center gap-2 pr-5 border-l border-gray-200 pl-4 h-full cursor-pointer hover:bg-gray-100 transition-colors group">
                                {/* UAE Flag Icon */}
                                <div className="w-[30px] h-[20px] bg-white border border-gray-300 rounded-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)] transition-all">
                                    <div className="w-full h-1/3 bg-[#00732f]"></div>
                                    <div className="w-full h-1/3 bg-white"></div>
                                    <div className="w-full h-1/3 bg-black"></div>
                                    <div className="absolute left-0 top-0 w-2 h-full bg-[#ff0000]"></div>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-gray-700 transition-colors"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>

                        {/* Map Overlay Placeholder */}
                        <div className="w-full h-[240px] bg-[#e5e3df] rounded-[16px] overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-gray-200/80 flex items-center justify-center group pointer-events-auto">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src="https://www.openstreetmap.org/export/embed.html?bbox=55.32%2C25.30%2C55.42%2C25.36&amp;layer=mapnik"
                                style={{ border: 0, opacity: 0.85, pointerEvents: 'none', filter: 'contrast(1.05) saturate(1.1)' }}
                                title="Map Placeholder"
                                className="transition-opacity duration-500 group-hover:opacity-100"
                            ></iframe>

                            {/* Red Map Pin with pulse glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%]">
                                <div className="absolute inset-0 bg-[#ed3743] rounded-full blur-[12px] opacity-40 animate-pulse"></div>
                                <div className="relative text-[#ed3743] drop-shadow-[0_8px_12px_rgba(237,55,67,0.4)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3.5" fill="white"></circle></svg>
                                </div>
                            </div>

                            {/* GPS Locate Button */}
                            <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.12)] text-[#4050b5] hover:text-[#2d3a8c] hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>
                            </button>
                        </div>

                        {/* Login Row */}
                        <div className="flex justify-between items-center py-2 bg-gray-50/50 px-4 rounded-[12px] border border-gray-100">
                            <span className="text-[14px] font-[600] text-gray-700">Login to use your saved addresses</span>
                            <button type="button" className="bg-[#ed3743] hover:bg-[#d62828] text-white px-6 py-2.5 rounded-[8px] text-[13.5px] font-[800] tracking-wide transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">Login</button>
                        </div>
                    </div>

                    {/* Footer Row */}
                    <div className="px-7 py-6 border-t border-gray-100 flex justify-between items-center gap-6 bg-white/80">
                        <div className="flex items-start gap-4 flex-1 overflow-hidden">
                            <div className="pt-0.5 flex-shrink-0 text-[#ed3743] drop-shadow-sm">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div className="flex flex-col flex-1 overflow-hidden gap-1.5">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="border border-[#ed3743] text-[#ed3743] hover:bg-red-50 hover:shadow-sm transition-all px-3 py-1 rounded-[6px] text-[12px] font-bold leading-none active:scale-95"
                                        onClick={() => {
                                            setIsPopoverOpen(true);
                                        }}
                                    >
                                    </button>
                                </div>

                            </div>
                        </div>
                        <button className="bg-[#ed3743] hover:bg-[#d62828] text-white px-8 py-4 flex-shrink-0 rounded-[12px] font-[800] text-[15px] tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(237,55,67,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(237,55,67,0.5)] active:scale-[0.98] whitespace-nowrap" onClick={(e) => handleLocationSubmit(e as any)}>
                            CONFIRM LOCATION
                        </button>
                    </div>
                    </div>
                </PopoverContent>
            </Popover>

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
        </header>
    );
}
