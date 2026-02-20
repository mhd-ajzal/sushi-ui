'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/data';

interface CategoryBarProps {
    activeCategory: string;
    onSelectCategory: (id: string, name: string) => void;
}

export default function CategoryBar({ activeCategory, onSelectCategory }: CategoryBarProps) {
    return (
        <div className="catbar">
            <div className="catbar-inner">
                {CATEGORIES.map((cat) => (
                    <div
                        key={cat.id}
                        className={`cat-item ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(cat.id, cat.name)}
                    >
                        <div className="cat-img">{cat.icon}</div>
                        <span className="cat-name">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
