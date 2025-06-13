// router.js - SPA Router for GreenLion Electronics Store
document.addEventListener('alpine:init', () => {
    Alpine.store('router', {
        currentRoute: 'home',
        currentParams: {},
        isLoading: false,
        previousRoute: null,

        init() {
            // Handle initial route on page load
            this.handleInitialRoute();

            // Listen for hash changes
            window.addEventListener('hashchange', () => {
                this.handleRouteChange();
            });

            // Listen for popstate (browser back/forward)
            window.addEventListener('popstate', () => {
                this.handleRouteChange();
            });

            // Prevent default behavior for all internal links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (link && !link.hasAttribute('data-external')) {
                    e.preventDefault();
                }
            });
        },

        handleInitialRoute() {
            const hash = window.location.hash;
            if (hash && hash.length > 1) {
                this.parseAndNavigate(hash);
            } else {
                this.currentRoute = 'home';
                this.currentParams = {};
                this.updateDocumentTitle();
            }
        },

        handleRouteChange() {
            const hash = window.location.hash;
            this.parseAndNavigate(hash);
        },

        parseAndNavigate(hash) {
            // Remove # and split by /
            const path = hash.replace('#', '').split('/').filter(segment => segment.length > 0);
            const route = path[0] || 'home';

            // Store previous route for potential back navigation
            this.previousRoute = this.currentRoute;

            // Show loading state
            this.isLoading = true;

            // Small delay to show loading state
            setTimeout(() => {
                switch (route) {
                    case 'home':
                    case '':
                        this.navigateToHome();
                        break;
                    case 'products':
                        this.navigateToProducts(path);
                        break;
                    case 'product':
                        this.navigateToProduct(path);
                        break;
                    case 'cart':
                        this.navigateToCart();
                        break;
                    case 'checkout':
                        this.navigateToCheckout();
                        break;
                    default:
                        // Unknown route, redirect to home
                        this.navigateToHome();
                        break;
                }

                // Hide loading state
                this.isLoading = false;

                // Scroll to top on route change
                window.scrollTo({ top: 0, behavior: 'smooth' });

            }, 100);
        },

        navigateToHome() {
            this.currentRoute = 'home';
            this.currentParams = {};
            this.updateDocumentTitle('GreenLion - Premium Consumer Electronics & Smart Gadgets in Lebanon');
        },

        navigateToProducts(path) {
            this.currentRoute = 'products';
            this.currentParams = {};

            // Handle category filtering: #products/category/mobile-accessories
            if (path[1] === 'category' && path[2]) {
                this.currentParams.category = this.decodeSlug(path[2]);
                const categoryName = this.getCategoryNameFromSlug(path[2]);
                this.updateDocumentTitle(`${categoryName} - Products | GreenLion`);
            }
            // Handle search: #products/search/keyword
            else if (path[1] === 'search' && path[2]) {
                this.currentParams.search = decodeURIComponent(path[2]);
                this.updateDocumentTitle(`Search: "${this.currentParams.search}" - Products | GreenLion`);
            }
            // Handle brand filtering: #products/brand/greenlion
            else if (path[1] === 'brand' && path[2]) {
                this.currentParams.brand = this.decodeSlug(path[2]);
                this.updateDocumentTitle(`${this.currentParams.brand} Products | GreenLion`);
            }
            // Handle price range: #products/price/0-50
            else if (path[1] === 'price' && path[2]) {
                this.currentParams.priceRange = path[2];
                this.updateDocumentTitle(`Products $${path[2].replace('-', ' - $')} | GreenLion`);
            }
            else {
                this.updateDocumentTitle('All Products | GreenLion Electronics');
            }
        },

        navigateToProduct(path) {
            this.currentRoute = 'product';
            this.currentParams = {};

            // Handle product slug: #product/green-lion-40w-dual-pd-wall-charger
            if (path[1]) {
                const slug = path[1];
                this.currentParams.slug = slug;

                // Find product by slug
                const product = this.findProductBySlug(slug);
                if (product) {
                    this.currentParams.product = product;
                    this.updateDocumentTitle(`${product.name} | GreenLion Electronics`);

                    // Update meta description for SEO
                    this.updateMetaDescription(product.description || `${product.name} - Premium electronics at GreenLion Lebanon`);
                } else {
                    // Product not found, redirect to products with error message
                    console.warn(`Product with slug "${slug}" not found`);
                    this.navigate('products');
                    return;
                }
            } else {
                // No slug provided, redirect to products
                this.navigate('products');
                return;
            }
        },

        navigateToCart() {
            this.currentRoute = 'cart';
            this.currentParams = {};
            this.updateDocumentTitle('Shopping Cart | GreenLion');
        },

        navigateToCheckout() {
            this.currentRoute = 'checkout';
            this.currentParams = {};
            this.updateDocumentTitle('Checkout | GreenLion');
        },

        // Public navigation method
        navigate(route, params = {}) {
            let hash = '#' + route;

            switch (route) {
                case 'home':
                    hash = '#home';
                    break;

                case 'products':
                    if (params.category) {
                        hash += '/category/' + this.encodeSlug(params.category);
                    } else if (params.search) {
                        hash += '/search/' + encodeURIComponent(params.search);
                    } else if (params.brand) {
                        hash += '/brand/' + this.encodeSlug(params.brand);
                    } else if (params.priceRange) {
                        hash += '/price/' + params.priceRange;
                    }
                    break;

                case 'product':
                    if (params.slug) {
                        hash += '/' + params.slug;
                    } else if (params.id) {
                        // Find product by ID and use slug
                        const product = this.findProductById(params.id);
                        if (product && product.slug) {
                            hash += '/' + product.slug;
                        } else {
                            // Fallback to products page
                            hash = '#products';
                        }
                    } else if (params.product && params.product.slug) {
                        hash += '/' + params.product.slug;
                    }
                    break;

                case 'cart':
                    hash = '#cart';
                    break;

                case 'checkout':
                    hash = '#checkout';
                    break;
            }

            // Update URL
            if (window.location.hash !== hash) {
                window.location.hash = hash;
            } else {
                // If hash is the same, manually trigger navigation
                this.parseAndNavigate(hash);
            }
        },

        // Helper methods for components
        isCurrentRoute(route) {
            return this.currentRoute === route;
        },

        getParam(key) {
            return this.currentParams[key];
        },

        getCurrentRoute() {
            return this.currentRoute;
        },

        getCurrentParams() {
            return this.currentParams;
        },

        // Go back to previous route
        goBack() {
            if (this.previousRoute && this.previousRoute !== this.currentRoute) {
                this.navigate(this.previousRoute);
            } else {
                // Fallback to home
                this.navigate('home');
            }
        },

        // Utility methods
        findProductBySlug(slug) {
            if (typeof PRODUCTS !== 'undefined') {
                return PRODUCTS.find(product => product.slug === slug);
            }
            return null;
        },

        findProductById(id) {
            if (typeof PRODUCTS !== 'undefined') {
                return PRODUCTS.find(product => product.id === id);
            }
            return null;
        },

        getCategoryNameFromSlug(slug) {
            if (typeof CATEGORIES !== 'undefined') {
                const category = CATEGORIES.find(cat => this.encodeSlug(cat.name) === slug);
                return category ? category.name : this.decodeSlug(slug);
            }
            return this.decodeSlug(slug);
        },

        encodeSlug(text) {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        },

        decodeSlug(slug) {
            return slug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },

        updateDocumentTitle(title) {
            document.title = title;
        },

        updateMetaDescription(description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                metaDescription.content = description;
                document.getElementsByTagName('head')[0].appendChild(metaDescription);
            }
        },

        // Generate canonical URLs for SEO
        getCanonicalUrl() {
            const baseUrl = window.location.origin + window.location.pathname;
            const hash = window.location.hash;
            return baseUrl + hash;
        },

        // Share functionality
        generateShareUrl(route = null, params = {}) {
            const baseUrl = window.location.origin + window.location.pathname;
            if (route) {
                let hash = '#' + route;
                // Add params logic here similar to navigate method
                return baseUrl + hash;
            }
            return baseUrl + window.location.hash;
        },

        // Analytics tracking (placeholder for future implementation)
        trackPageView() {
            // Implement analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: this.getCanonicalUrl()
                });
            }
        },

        // Route validation
        isValidRoute(route) {
            const validRoutes = ['home', 'products', 'product', 'cart', 'checkout'];
            return validRoutes.includes(route);
        },

        // URL generation helpers
        generateProductUrl(product) {
            if (product && product.slug) {
                return `#product/${product.slug}`;
            }
            return '#products';
        },

        generateCategoryUrl(category) {
            if (category) {
                const slug = typeof category === 'string' ? category : category.name;
                return `#products/category/${this.encodeSlug(slug)}`;
            }
            return '#products';
        },

        generateSearchUrl(query) {
            if (query && query.trim()) {
                return `#products/search/${encodeURIComponent(query.trim())}`;
            }
            return '#products';
        },

        // Breadcrumb generation
        generateBreadcrumbs() {
            const breadcrumbs = [{ name: 'Home', url: '#home' }];

            switch (this.currentRoute) {
                case 'products':
                    breadcrumbs.push({ name: 'Products', url: '#products' });
                    if (this.currentParams.category) {
                        breadcrumbs.push({
                            name: this.decodeSlug(this.currentParams.category),
                            url: this.generateCategoryUrl(this.currentParams.category)
                        });
                    } else if (this.currentParams.search) {
                        breadcrumbs.push({
                            name: `Search: "${this.currentParams.search}"`,
                            url: this.generateSearchUrl(this.currentParams.search)
                        });
                    }
                    break;

                case 'product':
                    breadcrumbs.push({ name: 'Products', url: '#products' });
                    if (this.currentParams.product) {
                        breadcrumbs.push({
                            name: this.currentParams.product.name,
                            url: this.generateProductUrl(this.currentParams.product)
                        });
                    }
                    break;

                case 'cart':
                    breadcrumbs.push({ name: 'Shopping Cart', url: '#cart' });
                    break;

                case 'checkout':
                    breadcrumbs.push({ name: 'Shopping Cart', url: '#cart' });
                    breadcrumbs.push({ name: 'Checkout', url: '#checkout' });
                    break;
            }

            return breadcrumbs;
        }
    });
});
