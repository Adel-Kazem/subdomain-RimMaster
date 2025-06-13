// Store and Product Data Management
class StoreManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.loading = false;
        this.initialized = false;

        this.init();
    }

    async init() {
        if (this.initialized) return;

        this.loading = true;
        try {
            // Load sample product data (in real app, this would be from API/JSON file)
            await this.loadProducts();
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize store:', error);
        } finally {
            this.loading = false;
        }
    }

    async loadProducts() {
        // Sample product data - in real app, load from assets/data/products.json
        this.products = [
            {
                id: 1,
                name: "Classic Running Shoes",
                slug: "classic-running-shoes",
                price: 89.99,
                category: "shoes",
                image: "https://via.placeholder.com/300x300?text=Running+Shoes",
                description: "Comfortable running shoes perfect for daily exercise and casual wear.",
                inStock: true,
                stock: 25,
                featured: true
            },
            {
                id: 2,
                name: "Wireless Bluetooth Headphones",
                slug: "wireless-bluetooth-headphones",
                price: 129.99,
                category: "electronics",
                image: "https://via.placeholder.com/300x300?text=Headphones",
                description: "High-quality wireless headphones with noise cancellation technology.",
                inStock: true,
                stock: 15,
                featured: true
            },
            {
                id: 3,
                name: "Cotton T-Shirt",
                slug: "cotton-t-shirt",
                price: 24.99,
                category: "clothing",
                image: "https://via.placeholder.com/300x300?text=T-Shirt",
                description: "100% cotton comfortable t-shirt available in multiple sizes.",
                inStock: true,
                stock: 50,
                featured: false
            },
            {
                id: 4,
                name: "Smartphone Case",
                slug: "smartphone-case",
                price: 19.99,
                category: "accessories",
                image: "https://via.placeholder.com/300x300?text=Phone+Case",
                description: "Durable smartphone case with shock absorption technology.",
                inStock: true,
                stock: 30,
                featured: true
            },
            {
                id: 5,
                name: "Coffee Mug",
                slug: "coffee-mug",
                price: 12.99,
                category: "home",
                image: "https://via.placeholder.com/300x300?text=Coffee+Mug",
                description: "Ceramic coffee mug perfect for your morning coffee.",
                inStock: false,
                stock: 0,
                featured: false
            }
        ];

        this.categories = [...new Set(this.products.map(p => p.category))];
    }

    getAllProducts() {
        return this.products;
    }

    getProductBySlug(slug) {
        return this.products.find(product => product.slug === slug);
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getFeaturedProducts(limit = 4) {
        return this.products.filter(product => product.featured).slice(0, limit);
    }

    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    getCategories() {
        return this.categories;
    }

    isLoading() {
        return this.loading;
    }
}

// Initialize store manager
window.storeManager = new StoreManager();

// Alpine.js data for home page
window.homePage = function() {
    return {
        loading: true,
        featuredProducts: [],

        async init() {
            await window.storeManager.init();
            this.featuredProducts = window.storeManager.getFeaturedProducts();
            this.loading = false;
        }
    }
}
