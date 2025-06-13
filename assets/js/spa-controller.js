// js/spa-controller.js - Main SPA Controller and State Management
document.addEventListener('alpine:init', () => {
    // Main SPA Controller
    Alpine.data('spa', () => ({
        scrollTop: false,
        isInitialized: false,

        init() {
            // Initialize the router
            this.$store.router.init();

            // Initialize other stores
            this.$store.cart.init();

            // Handle scroll for floating buttons
            window.addEventListener('scroll', () => {
                this.scrollTop = window.scrollY > 100;
            });

            // Mark as initialized
            this.isInitialized = true;

            console.log('SPA initialized successfully');
        }
    }));

    // Featured Products Component for Home Page
    Alpine.data('featuredProducts', () => ({
        products: [],

        init() {
            this.loadFeaturedProducts();
        },

        loadFeaturedProducts() {
            if (typeof PRODUCTS !== 'undefined') {
                // Get featured products or first 6 products
                this.products = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

                // If no featured products, get first 6
                if (this.products.length === 0) {
                    this.products = PRODUCTS.slice(0, 6);
                }
            }
        },

        get template() {
            if (this.products.length === 0) {
                return '<div class="text-center text-gray-500">No featured products available</div>';
            }

            return this.products.map(product => `
                <div class="bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div class="relative overflow-hidden aspect-square">
                        <img src="${Array.isArray(product.images) ? product.images[0] : product.images}" 
                             alt="${product.name} - ${product.brand || 'GreenLion'}" 
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                             onerror="this.src='https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=No+Image'">
                        <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                        
                        <!-- Product Badges -->
                        <div class="absolute top-3 left-3 flex flex-col gap-1">
                            ${product.isNew ? '<span class="bg-green-500 text-white text-xs px-2 py-1 font-medium">NEW</span>' : ''}
                            ${product.isOnSale ? '<span class="bg-red-500 text-white text-xs px-2 py-1 font-medium">SALE</span>' : ''}
                            ${product.isFeatured ? '<span class="bg-primary text-white text-xs px-2 py-1 font-medium">FEATURED</span>' : ''}
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onclick="Alpine.store('ui').openWhatsApp('Hello! I\\'m interested in the ${product.name.replace(/'/g, "\\'")}. Could you provide more information?')" 
                                    class="bg-white/90 hover:bg-white p-2 shadow-md transition-colors">
                                <svg class="h-4 w-4 text-green-600">
                                    <use xlink:href="#icon-whatsapp"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-sm text-gray-500 font-medium mb-2">${product.brand || 'GreenLion'}</div>
                        <h3 class="text-lg font-semibold text-primary mb-3 group-hover:text-primary-hover transition-colors line-clamp-2">
                            ${product.name}
                        </h3>
                        
                        <!-- Price Section -->
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-baseline gap-2">
                                <span class="text-xl font-bold text-primary">$${(product.salePrice || product.base_price || product.price).toFixed(2)}</span>
                                ${product.salePrice && product.base_price !== product.salePrice ?
                `<span class="text-sm text-gray-500 line-through">$${product.base_price.toFixed(2)}</span>` : ''}
                            </div>
                            ${product.free_shipping ? '<span class="text-xs text-green-600 font-medium">Free Shipping</span>' : ''}
                        </div>
                        
                        <!-- Stock Status -->
                        <div class="mb-4">
                            ${(product.hasVariants ? product.totalVariantStock : product.stock) > 0 ?
                '<span class="text-sm text-green-600 flex items-center gap-1"><svg class="h-4 w-4"><use xlink:href="#icon-check"></use></svg>In Stock</span>' :
                '<span class="text-sm text-red-600">Out of Stock</span>'}
                        </div>
                        
                        <!-- Action Button -->
                        <button onclick="Alpine.store('router').navigateToProduct('${product.slug}')" 
                                class="w-full bg-primary text-white py-2 px-4 font-medium hover:bg-primary-hover transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }));

    // Related Products Component
    Alpine.data('relatedProducts', (config = {}) => ({
        products: [],
        title: config.title || 'Related Products',
        maxProducts: config.maxProducts || 4,
        productId: config.productId || null,

        init() {
            this.loadRelatedProducts();
        },

        loadRelatedProducts() {
            if (typeof PRODUCTS === 'undefined' || !this.productId) {
                this.products = [];
                return;
            }

            const currentProduct = PRODUCTS.find(p => p.id === this.productId);
            if (!currentProduct) {
                this.products = [];
                return;
            }

            // Try to get products from the same categories
            let related = [];

            if (currentProduct.categories && currentProduct.categories.length > 0) {
                related = PRODUCTS.filter(p =>
                    p.id !== this.productId &&
                    p.categories &&
                    p.categories.some(cat => currentProduct.categories.includes(cat))
                );
            }

            // If not enough related products, add other products
            if (related.length < this.maxProducts) {
                const otherProducts = PRODUCTS.filter(p =>
                    p.id !== this.productId &&
                    !related.find(rp => rp.id === p.id)
                );
                related = [...related, ...otherProducts];
            }

            // Shuffle and limit
            this.products = this.shuffleArray(related).slice(0, this.maxProducts);
        },

        shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
    }));

    // Page Transition Effects
    Alpine.data('pageTransition', () => ({
        isTransitioning: false,

        init() {
            // Watch for route changes
            this.$watch('$store.router.currentRoute', () => {
                this.handleRouteTransition();
            });
        },

        handleRouteTransition() {
            this.isTransitioning = true;

            // Scroll to top on route change
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reset transition state after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 300);
        }
    }));

    // Search Functionality (for future implementation)
    Alpine.data('searchFunction', () => ({
        isOpen: false,
        query: '',
        results: [],
        isSearching: false,

        toggle() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.$nextTick(() => {
                    this.$refs.searchInput?.focus();
                });
            } else {
                this.query = '';
                this.results = [];
            }
        },

        search() {
            if (!this.query.trim() || typeof PRODUCTS === 'undefined') {
                this.results = [];
                return;
            }

            this.isSearching = true;

            // Simulate search delay
            setTimeout(() => {
                const query = this.query.toLowerCase();
                this.results = PRODUCTS.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    (product.description && product.description.toLowerCase().includes(query)) ||
                    (product.brand && product.brand.toLowerCase().includes(query))
                ).slice(0, 5);

                this.isSearching = false;
            }, 300);
        },

        selectResult(product) {
            Alpine.store('router').navigateToProduct(product.slug);
            this.toggle();
        }
    }));

    // Global Error Handler
    Alpine.data('errorHandler', () => ({
        errors: [],

        init() {
            window.addEventListener('error', (event) => {
                this.handleError(event.error);
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.handleError(event.reason);
            });
        },

        handleError(error) {
            console.error('Application Error:', error);

            // Add to error list
            this.errors.push({
                message: error.message || 'An unexpected error occurred',
                timestamp: new Date().toISOString(),
                id: Date.now()
            });

            // Remove old errors (keep only last 5)
            if (this.errors.length > 5) {
                this.errors = this.errors.slice(-5);
            }

            // Auto-remove error after 5 seconds
            setTimeout(() => {
                this.errors = this.errors.filter(e => e.id !== this.errors[this.errors.length - 1]?.id);
            }, 5000);
        },

        dismissError(id) {
            this.errors = this.errors.filter(e => e.id !== id);
        }
    }));

    // Performance Monitor (development helper)
    Alpine.data('performanceMonitor', () => ({
        metrics: {
            loadTime: 0,
            routeChangeTime: 0,
            lastRouteChange: null
        },

        init() {
            // Measure initial load time
            if (performance.timing) {
                this.metrics.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            }

            // Monitor route changes
            this.$watch('$store.router.currentRoute', () => {
                const now = performance.now();
                if (this.metrics.lastRouteChange) {
                    this.metrics.routeChangeTime = now - this.metrics.lastRouteChange;
                }
                this.metrics.lastRouteChange = now;
            });
        },

        getMetrics() {
            return {
                ...this.metrics,
                memory: performance.memory ? {
                    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
                } : null
            };
        }
    }));

    // Global keyboard shortcuts
    Alpine.data('keyboardShortcuts', () => ({
        init() {
            window.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + K for search
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    // Trigger search if implemented
                    const searchElement = document.querySelector('[x-data*="searchFunction"]');
                    if (searchElement) {
                        Alpine.$data(searchElement).toggle();
                    }
                }

                // Escape to close modals/overlays
                if (e.key === 'Escape') {
                    // Close mobile menu
                    Alpine.store('ui').closeMenu();

                    // Close search if open
                    const searchElement = document.querySelector('[x-data*="searchFunction"]');
                    if (searchElement && Alpine.$data(searchElement).isOpen) {
                        Alpine.$data(searchElement).toggle();
                    }
                }
            });
        }
    }));
}));
