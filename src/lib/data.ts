// Product Data
export interface Product {
    name: string;
    desc: string;
    price: number;
    oldPrice?: number;
    emoji: string;
    tag?: string;
    vip?: boolean;
    imgSrc?: string;
}

export const MENU: { [key: string]: Product[] } = {
    special: [
        { name: "Dear Box 16 Pcs", desc: "4 Pcs Crazy Shrimp Roll, 4 Pcs Seared Salmon Roll, 4 Pcs Oman Chips Roll & 4 Pcs California Roll", price: 89, oldPrice: 120, emoji: "🍣", tag: "Popular", imgSrc: "/images/31.png" },
        { name: "Happy Box 16 Pcs", desc: "4 Pcs Eel Dragon Roll, 4 Pcs Spicy Tuna Dragon Roll, 4 Pcs Arigato Roll & 4 Pcs Salmon Nigiri", price: 99, oldPrice: 130, emoji: "🍱", tag: "Hot Deal", imgSrc: "/images/32.png" },
        { name: "Mini Salmon Lover 12 Pcs", desc: "4 Pcs Salmon Nigiri, 4 Pcs Salmon Sashimi & 4 Pcs Salmon Hoso Maki", price: 99, emoji: "🐟", tag: "Value", imgSrc: "/images/33.png" }
    ],
    lovers: [
        { name: "Dear Box 16 Pcs", desc: "4 Pcs Crazy Shrimp Roll, 4 Pcs Seared Salmon Roll, 4 Pcs Oman Chips Roll & 4 Pcs California Roll", price: 89, emoji: "🍣", imgSrc: "/images/31.png" },
        { name: "Happy Box 16 Pcs", desc: "4 Pcs Eel Dragon Roll, 4 Pcs Spicy Tuna Dragon Roll, 4 Pcs Arigato Roll & 4 Pcs Salmon Nigiri", price: 99, emoji: "🍣", imgSrc: "/images/32.png" },
        { name: "Mini Salmon Lover 12 Pcs", desc: "4 Pcs Salmon Nigiri, 4 Pcs Salmon Sashimi & 4 Pcs Salmon Hoso Maki", price: 99, emoji: "🐟", imgSrc: "/images/33.png" },
        { name: "Raw Mixed Platter 24 Pcs", desc: "8 Pcs New Phila Roll, 4 Pcs Tiger Phila Roll, 4 Pcs California Salmon Dream Roll, 4 Pcs Salmon Nigiri, 2 Pcs Tuna Nigiri & 2 Pcs Ebi Nigiri", price: 139, emoji: "🍱", imgSrc: "/images/34.png" },
        { name: "Super Salmon Lover Box 24 Pcs", desc: "4 Pcs Philadelphia Roll, 4 Pcs Salmon Nigiri, 4 Pcs Volcano Roll, 4 Pcs Flaming Star Salmon Roll, 4 Pcs Cooked Salmon Roll & 4 Pcs Spring Salmon Roll", price: 149, emoji: "🍣", imgSrc: "/images/35.png" },
        { name: "Shrimp Lover Box 24 Pcs", desc: "8 Pcs King Salmon Shrimp Roll, 8 Pcs Crazy Shrimp Roll & 8 Pcs Shrimp Hoso Maki", price: 129, emoji: "🦐", imgSrc: "/images/36.png" },
        { name: "Crab Lover Box 28 Pcs", desc: "4 Pcs California Roll, 4 Pcs Black Cali Roll, 4 Pcs Arigato Roll, 4 Pcs Crunchy Crab Roll, 4 Pcs Kani Nigiri & 8 Pcs Kanikama Hosomaki", price: 149, emoji: "🦀", imgSrc: "/images/37.png" },
        { name: "Vibrant Vegetable Box 28 Pcs", desc: "8 Pcs Yasai Roll, 8 Pcs Veg Futo Roll, 8 Pcs Avocado Maki & 4 Pcs Beetroot Roll", price: 99, emoji: "🥑", tag: "Vegan", imgSrc: "/images/38.png" },
        { name: "Matsu Sashimi & Nigiri 18 Pcs", desc: "3 Pcs Salmon Sashimi, 3 Pcs Salmon Belly Sashimi, 3 Pcs Tuna Sashimi, 3 Pcs Salmon Nigiri, 3 Pcs Ebi Nigiri & 3 Pcs Kani Nigiri", price: 189, emoji: "🍱", imgSrc: "/images/39.png" },
        { name: "Royal Salmon Lover Box 32 Pcs", desc: "8 Pcs Salmon Nigiri, 8 Pcs Salmon Philadelphia Roll, 4 Pcs Salmon Belly Nigiri, 4 Pcs Salmon Volcano Roll, 4 Pcs Cooked Salmon Roll & 4 Pcs Salmon Nisoku", price: 199, emoji: "🍣", imgSrc: "/images/40.png" },
    ],
    sakura: [
        { name: "Wow Classico Box A 20 Pcs", desc: "4 Pcs Salmon Dream Roll, 4 Pcs Shrimp Dynamite Roll, 4 Pcs Crazy Crab Roll, 4 Pcs Crab Philly Roll & 4 Pcs Salmo Hoso Maki", price: 109, emoji: "🌸", imgSrc: "/images/24.png" },
        { name: "Wow Classico Box B 12 Pcs", desc: "4 Pcs Seared Salmon Roll, 4 Pcs Spicy Seared Salmon Roll & 4 Pcs Golden Garden Roll", price: 79, emoji: "🍣", imgSrc: "/images/25.png" },
        { name: "Wow Classico Box C 12 Pcs", desc: "4 Pcs Dragon Roll, 4 Pcs Crab Philly Roll & 4 Pcs Kanikama Hoso Maki", price: 69, emoji: "🍱", imgSrc: "/images/26.png" },
        { name: "Philla Dream Box 24 Pcs", desc: "8 Pcs Philadelphia Salmon Roll, 8 Pcs Crab Philly Roll, 4 Pcs Tiger Phila Roll & 4 Pcs Unagi Salmon Cream Salmon", price: 179, emoji: "🌸", imgSrc: "/images/27.png" },
    ],
    cooked: [
        { name: "Fire & Sea Box A 16 Pcs", desc: "4 Pcs Eel Dragon Roll, 4 Pcs Dragon Roll, 4 Pcs Crazy Shrimp & 4 Pcs Veg Creamy Roll", price: 99, emoji: "🔥", imgSrc: "/images/12.png" },
        { name: "Fire & Sea Box B 24 Pcs", desc: "8 Pcs Dynamite Roll, 4 Pcs Seared Salmon Roll, 4 Pcs Crazy Crab Roll, 4 Pcs Cooked Salmon Roll & 4 Pcs Dragon Roll", price: 149, emoji: "🔥", imgSrc: "/images/13.png" },
        { name: "Cooked Box 20 Pcs", desc: "4 Pcs Dragon Roll, 4 Pcs Dynamite Shrimp Roll, 4 Pcs Oman Crispy Roll, 4 Pcs Crazy Crab Roll & 4 Pcs Crab Dragon Roll", price: 129, emoji: "🍱", imgSrc: "/images/14.png" },
        { name: "Fire & Sea Box C 32 Pcs", desc: "4 Pcs Cooked Salmon Nigiri, 4 Pcs Mango Crab Roll, 4 Pcs Eel Dragon Roll, 4 Pcs Rosie Roll, 4 Pcs Cooked Salmon Roll, 4 Pcs Arigato Roll, 4 Pcs Cooked Futo Roll & 4 Pcs Crazy Shrimp Roll", price: 219, emoji: "🔥", tag: "Best Value", imgSrc: "/images/15.png" },
    ],
    vip: [
        { name: "Fusion VIP Moriwase 24 Pcs", desc: "4 Pcs Unagi Dragon Roll, 4 Pcs Salmon Philadelphia Roll, 4 Pcs Crazy Crab Roll, 4 Pcs Cooked Salmon Roll, 4 Pcs Salmon Sashimi, 2 Pcs Tuna Nigiri & 2 Pcs Ebi Nigiri", price: 149, emoji: "👑", tag: "VIP", imgSrc: "/images/16.png" },
        { name: "Fusion VIP Moriwase 32 Pcs", desc: "4 Pcs Salmon Nigiri, 4 Pcs Salmon Philadelphia Roll, 4 Pcs Mango Crab Roll, 4 Pcs Crazy Shrimp Roll, 4 Pcs Rosie Roll, 4 Pcs Unagi Dragon Roll, 4 Pcs Yasai Roll & 4 Pcs Tuna Maki", price: 199, emoji: "👑", tag: "VIP", imgSrc: "/images/17.png" },
        { name: "Fusion VIP Moriwase 60 Pcs", desc: "8 Pcs Unagi Dragon Roll, 8 Pcs Salmon Philadelphia Roll, 8 Pcs Crazy Shrimp Roll, 8 Pcs Crazy Crab Roll, 4 Pcs Dragon Roll, 4 Pcs California Roll, 4 Pcs Oman Crunchy Roll, 4 Pcs Avocado Hosomaki, 3 Pcs Salmon Sashimi, 3 Pcs Tuna Sashimi, 3 Pcs Salmon Nigiri & 3 Pcs Tuna Nigiri", price: 369, emoji: "🏆", tag: "Premium", imgSrc: "/images/18.png" },
    ],
    maki: [
        { name: "Sake Maki", desc: "Classic salmon hoso maki roll", price: 29, emoji: "🍣", imgSrc: "/images/41.png" },
        { name: "Tuna Maki", desc: "Fresh tuna hoso maki roll", price: 29, emoji: "🍱", imgSrc: "/images/42.png" },
        { name: "Kappa Maki", desc: "Crisp cucumber hoso maki roll", price: 19, emoji: "🥒", tag: "Vegan", imgSrc: "/images/43.png" },
        { name: "Mango Maki", desc: "Sweet mango hoso maki roll", price: 19, emoji: "🥭", tag: "Vegan", imgSrc: "/images/44.png" },
        { name: "Kanikama Maki", desc: "Crab stick hoso maki roll", price: 19, emoji: "🦀", imgSrc: "/images/45.png" },
        { name: "Unagi Maki", desc: "Grilled eel hoso maki roll", price: 29, emoji: "🐍", imgSrc: "/images/46.png" },
    ],
    temaki: [
        { name: "Sake Temaki", desc: "Fresh salmon hand roll in a crispy nori cone", price: 39, emoji: "🥢", imgSrc: "/images/19.png" },
        { name: "California Temaki", desc: "Crab, avocado & cucumber hand roll", price: 29, emoji: "🥢", imgSrc: "/images/20.png" },
        { name: "Unagi Temaki", desc: "Grilled eel hand roll with sweet sauce", price: 39, emoji: "🥢", imgSrc: "/images/8.png" },
        { name: "Shrimp Avocado Temaki", desc: "Shrimp & creamy avocado hand roll", price: 39, emoji: "🥢", imgSrc: "/images/47.png" },
    ]
};

export const CATEGORIES = [
    { id: 'special', name: 'Special Offers', icon: '🌟' },
    { id: 'lovers', name: 'Lovers Box', icon: '🍣' },
    { id: 'sakura', name: 'Sakura Combos', icon: '🌸' },
    { id: 'cooked', name: 'Cooked Box', icon: '🔥' },
    { id: 'vip', name: 'VIP Moriwase', icon: '👑' },
    { id: 'maki', name: 'Hoso Maki', icon: '🌿' },
    { id: 'temaki', name: 'Temaki', icon: '🥢' },
];
