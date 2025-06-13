// categories.js - Product Categories for GreenLion Electronics
const CATEGORIES = [
    {
        id: 1,
        name: "Mobile Accessories",
        description: "Essential accessories for your mobile devices including chargers, cables, and protective gear",
        slug: "mobile-accessories",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 1,
        featured: true,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 25,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 2,
        name: "Charging Solutions",
        description: "Fast and efficient charging solutions including wireless chargers, power banks, and wall adapters",
        slug: "charging",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 2,
        featured: true,
        image: "https://images.unsplash.com/photo-1609592179726-e4ef8b8b5f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 18,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 3,
        name: "Audio Devices",
        description: "Premium audio equipment including wireless earbuds, headphones, and speakers",
        slug: "audio",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 3,
        featured: true,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 15,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 4,
        name: "Cables & Adapters",
        description: "High-quality cables and adapters for all your connectivity needs",
        slug: "cables",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 4,
        featured: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 12,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 5,
        name: "Power Banks",
        description: "Portable power solutions to keep your devices charged on the go",
        slug: "power-banks",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 8,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 6,
        name: "Smart Home",
        description: "Smart home devices and automation solutions for modern living",
        slug: "smart-home",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 6,
        featured: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 10,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 7,
        name: "Stands & Holders",
        description: "Convenient stands and holders for phones, tablets, and other devices",
        slug: "stands",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 7,
        featured: false,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 6,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 8,
        name: "Device Protection",
        description: "Screen protectors, cases, and other protective accessories",
        slug: "protection",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 8,
        featured: false,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 14,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 9,
        name: "Gaming Accessories",
        description: "Gaming peripherals and accessories for enhanced gaming experience",
        slug: "gaming",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 9,
        featured: false,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 7,
        updated_at: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 10,
        name: "Computer Accessories",
        description: "Essential accessories for laptops and desktop computers",
        slug: "computer-accessories",
        active: true,
        created_at: "2025-01-01T00:00:00.000Z",
        display_order: 10,
        featured: false,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        parent_id: null,
        productCount: 9,
        updated_at: "2025-01-01T00:00:00.000Z"
    }
];

// Helper function to get category by slug
function getCategoryBySlug(slug) {
    return CATEGORIES.find(category => category.slug === slug && category.active);
}

// Helper function to get category by ID
function getCategoryById(id) {
    return CATEGORIES.find(category => category.id === id && category.active);
}

// Helper function to get all active categories
function getActiveCategories() {
    return CATEGORIES.filter(category => category.active);
}

// Helper function to get featured categories
function getFeaturedCategories() {
    return CATEGORIES.filter(category => category.active && category.featured);
}

// Helper function to get category name from slug
function getCategoryNameFromSlug(slug) {
    const category = getCategoryBySlug(slug);
    return category ? category.name : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
