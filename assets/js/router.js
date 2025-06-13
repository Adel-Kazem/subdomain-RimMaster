// SPA Router for E-Commerce Store
class SPARouter {
    constructor() {
        this.routes = {
            '': () => this.loadHome(),
            '#/': () => this.loadHome(),
            '#/products': () => this.loadProductList(),
            '#/cart': () => this.loadCart(),
            '#/checkout': () => this.loadCheckout()
        };

        this.init();
    }

    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle initial load
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRoute();
        });
    }

    handleRoute() {
        const hash = window.location.hash;

        // Handle product detail routes (#/products/product-slug)
        if (hash.startsWith('#/products/') && hash.split('/').length === 3) {
            const slug = hash.split('/')[2];
            this.loadProductDetail(slug);
            return;
        }

        // Handle defined routes
        if (this.routes[hash]) {
            this.routes[hash]();
            return;
        }

        // Default to home if route not found
        this.loadHome();
    }

    loadHome() {
        document.getElementById('app').innerHTML = `
            <div class="home-page" x-data="homePage()">
                <section class="hero">
                    <div class="hero-content">
                        <h1>Welcome to MyStore</h1>
                        <p>Discover amazing products at great prices</p>
                        <a href="#/products" class="cta-button">Shop Now</a>
                    </div>
                </section>
                
                <section class="featured-products">
                    <h2>Featured Products</h2>
                    <div class="products-grid" x-show="!loading">
                        <template x-for="product in featuredProducts" :key="product.id">
                            <div class="product-card">
                                <img :src="product.image" :alt="product.name" class="product-image">
                                <h3 x-text="product.name"></h3>
                                <p class="price" x-text="'$' + product.price"></p>
                                <a :href="'#/products/' + product.slug" class="btn btn-primary">View Details</a>
                            </div>
                        </template>
                    </div>
                    <div x-show="loading" class="loading">Loading featured products...</div>
                </section>
            </div>
        `;

        // Re-initialize Alpine.js for the new content
        Alpine.initTree(document.getElementById('app'));
    }

    loadProductList() {
        if (typeof window.loadProductListPage === 'function') {
            window.loadProductListPage();
        }
    }

    loadProductDetail(slug) {
        if (typeof window.loadProductDetailPage === 'function') {
            window.loadProductDetailPage(slug);
        }
    }

    loadCart() {
        if (typeof window.loadCartPage === 'function') {
            window.loadCartPage();
        }
    }

    loadCheckout() {
        document.getElementById('app').innerHTML = `
            <div class="checkout-page">
                <h1>Checkout</h1>
                <p>Checkout functionality coming soon...</p>
                <a href="#/cart" class="btn btn-secondary">Back to Cart</a>
            </div>
        `;
    }

    // Navigation helper method
    static navigate(path) {
        window.location.hash = path;
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.router = new SPARouter();
});

// Helper function for navigation
function navigateTo(path) {
    SPARouter.navigate(path);
}
