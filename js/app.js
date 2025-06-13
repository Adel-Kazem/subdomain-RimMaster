// app.js - Main Application Store for GreenLion Electronics SPA
document.addEventListener('alpine:init', () => {

    // Initialize router first
    Alpine.store('router').init();

    // UI Store - Handles global UI state
    Alpine.store('ui', {
        searchOpen: false,
        searchQuery: '',
        mobileMenuOpen: false,
        loadingStates: {},
        notifications: [],

        // Search functionality
        toggleSearch() {
            this.searchOpen = !this.searchOpen;
            if (this.searchOpen) {
                // Focus search input after a small delay
                setTimeout(() => {
                    const searchInput = document.querySelector('input[x-model="$store.ui.searchQuery"]');
                    if (searchInput) searchInput.focus();
                }, 100);
            }
        },

        clearSearch() {
            this.searchQuery = '';
            this.searchOpen = false;
        },

        // Mobile menu
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },

        closeMobileMenu() {
            this.mobileMenuOpen = false;
        },

        // Loading states for different components
        setLoading(key, state) {
            this.loadingStates[key] = state;
        },

        isLoading(key) {
            return this.loadingStates[key] || false;
        },

        // Notifications system
        showNotification(message, type = 'info', duration = 3000) {
            const id = Date.now();
            const notification = {
                id,
                message,
                type, // 'success', 'error', 'warning', 'info'
                timestamp: new Date()
            };

            this.notifications.push(notification);

            // Auto remove after duration
            if (duration > 0) {
                setTimeout(() => {
                    this.removeNotification(id);
                }, duration);
            }

            return id;
        },

        removeNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        },

        // WhatsApp integration
        openWhatsApp(message = '') {
            const phoneNumber = '+96171234567'; // Replace with actual WhatsApp number
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        },

        // Share functionality
        shareProduct(product) {
            if (navigator.share) {
                navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.origin + Alpine.store('router').generateProductUrl(product)
                }).catch(console.error);
            } else {
                // Fallback: copy to clipboard
                const url = window.location.origin + Alpine.store('router').generateProductUrl(product);
                this.copyToClipboard(url);
                this.showNotification('Product link copied to clipboard!', 'success');
            }
        },

        // Utility functions
        copyToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).catch(console.error);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        },

        // Format currency
        formatPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(price);
        },

        // Format date
        formatDate(date) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(date));
        },

        // Scroll to element
        scrollToElement(elementId, offset = 100) {
            const element = document.getElementById(elementId);
            if (element) {
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Cart Store - Handles shopping cart functionality
    Alpine.store('cart', {
        items: [],
        isOpen: false,

        init() {
            // Load cart from localStorage on initialization
            this.loadFromStorage();
        },

        // Add item to cart
        addItem(product, quantity = 1, selectedOptions = {}) {
            const existingItemIndex = this.findExistingItem(product, selectedOptions);

            if (existingItemIndex !== -1) {
                // Update quantity of existing item
                this.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                const cartItem = {
                    id: this.generateCartItemId(),
                    product: { ...product },
                    quantity: quantity,
                    selectedOptions: { ...selectedOptions },
                    addedAt: new Date().toISOString(),
                    price: this.calculateItemPrice(product, selectedOptions)
                };
                this.items.push(cartItem);
            }

            this.saveToStorage();
            Alpine.store('ui').showNotification(`${product.name} added to cart!`, 'success');

            // Analytics tracking
            this.trackAddToCart(product, quantity);
        },

        // Remove item from cart
        removeItem(itemId) {
            const item = this.items.find(item => item.id === itemId);
            if (item) {
                this.items = this.items.filter(item => item.id !== itemId);
                this.saveToStorage();
                Alpine.store('ui').showNotification(`${item.product.name} removed from cart`, 'info');
            }
        },

        // Update item quantity
        updateQuantity(itemId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(itemId);
                return;
            }

            const item = this.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                this.saveToStorage();
            }
        },

        // Clear entire cart
        clearCart() {
            this.items = [];
            this.saveToStorage();
            Alpine.store('ui').showNotification('Cart cleared', 'info');
        },

        // Find existing item in cart
        findExistingItem(product, selectedOptions) {
            return this.items.findIndex(item =>
                item.product.id === product.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );
        },

        // Calculate item price with options
        calculateItemPrice(product, selectedOptions) {
            let basePrice = parseFloat(product.price) || 0;

            // Add option prices if any
            if (product.options && selectedOptions) {
                Object.keys(selectedOptions).forEach(optionName => {
                    const selectedValue = selectedOptions[optionName];
                    const option = product.options[optionName];
                    if (option && Array.isArray(option)) {
                        const optionObj = option.find(opt =>
                            (typeof opt === 'object' && opt.value === selectedValue) ||
                            (typeof opt === 'string' && opt === selectedValue)
                        );
                        if (optionObj && optionObj.priceModifier) {
                            basePrice += parseFloat(optionObj.priceModifier);
                        }
                    }
                });
            }

            return basePrice;
        },

        // Generate unique cart item ID
        generateCartItemId() {
            return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Get total number of items
        getTotalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        },

        // Get total price
        getTotalPrice() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        // Get subtotal (before tax/shipping)
        getSubtotal() {
            return this.getTotalPrice();
        },

        // Calculate tax (example: 11% VAT for Lebanon)
        getTax(rate = 0.11) {
            return this.getSubtotal() * rate;
        },

        // Calculate shipping cost
        getShippingCost() {
            const subtotal = this.getSubtotal();
            if (subtotal >= 100) return 0; // Free shipping over $100
            return 10; // Fixed shipping cost
        },

        // Get final total including tax and shipping
        getFinalTotal() {
            return this.getSubtotal() + this.getTax() + this.getShippingCost();
        },

        // Check if cart is empty
        isEmpty() {
            return this.items.length === 0;
        },

        // Get cart summary for checkout
        getCartSummary() {
            return {
                items: this.items,
                itemCount: this.getTotalItems(),
                subtotal: this.getSubtotal(),
                tax: this.getTax(),
                shipping: this.getShippingCost(),
                total: this.getFinalTotal()
            };
        },

        // Save cart to localStorage
        saveToStorage() {
            try {
                localStorage.setItem('greenlion_cart', JSON.stringify(this.items));
            } catch (error) {
                console.error('Failed to save cart to localStorage:', error);
            }
        },

        // Load cart from localStorage
        loadFromStorage() {
            try {
                const savedCart = localStorage.getItem('greenlion_cart');
                if (savedCart) {
                    this.items = JSON.parse(savedCart);
                }
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error);
                this.items = [];
            }
        },

        // Export cart for sharing or backup
        exportCart() {
            return {
                items: this.items,
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
        },

        // Import cart from backup
        importCart(cartData) {
            if (cartData && cartData.items && Array.isArray(cartData.items)) {
                this.items = cartData.items;
                this.saveToStorage();
                Alpine.store('ui').showNotification('Cart imported successfully!', 'success');
            }
        },

        // Analytics tracking
        trackAddToCart(product, quantity) {
            // Implement analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: 'USD',
                    value: parseFloat(product.price) * quantity,
                    items: [{
                        item_id: product.id,
                        item_name: product.name,
                        category: product.category,
                        quantity: quantity,
                        price: parseFloat(product.price)
                    }]
                });
            }
        },

        // Track cart view
        trackCartView() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_cart', {
                    currency: 'USD',
                    value: this.getTotalPrice(),
                    items: this.items.map(item => ({
                        item_id: item.product.id,
                        item_name: item.product.name,
                        category: item.product.category,
                        quantity: item.quantity,
                        price: item.price
                    }))
                });
            }
        },

        // Checkout via WhatsApp
        checkoutViaWhatsApp() {
            const summary = this.getCartSummary();
            let message = "🛒 *GreenLion Order Request*\n\n";

            summary.items.forEach((item, index) => {
                message += `${index + 1}. *${item.product.name}*\n`;
                message += `   Quantity: ${item.quantity}\n`;
                message += `   Price: ${Alpine.store('ui').formatPrice(item.price)}\n`;

                if (Object.keys(item.selectedOptions).length > 0) {
                    message += `   Options: ${Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')}\n`;
                }
                message += "\n";
            });

            message += `📊 *Order Summary:*\n`;
            message += `Subtotal: ${Alpine.store('ui').formatPrice(summary.subtotal)}\n`;
            message += `Tax: ${Alpine.store('ui').formatPrice(summary.tax)}\n`;
            message += `Shipping: ${Alpine.store('ui').formatPrice(summary.shipping)}\n`;
            message += `*Total: ${Alpine.store('ui').formatPrice(summary.total)}*\n\n`;
            message += "Please confirm this order and provide delivery details.";

            Alpine.store('ui').openWhatsApp(message);

            // Track checkout initiation
            this.trackCheckoutBegin();
        },

        // Track checkout begin
        trackCheckoutBegin() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'begin_checkout', {
                    currency: 'USD',
                    value: this.getTotalPrice(),
                    items: this.items.map(item => ({
                        item_id: item.product.id,
                        item_name: item.product.name,
                        category: item.product.category,
                        quantity: item.quantity,
                        price: item.price
                    }))
                });
            }
        }
    });

    // Wishlist Store - Handles product wishlist
    Alpine.store('wishlist', {
        items: [],

        init() {
            this.loadFromStorage();
        },

        addItem(product) {
            if (!this.isInWishlist(product.id)) {
                this.items.push({
                    id: product.id,
                    product: { ...product },
                    addedAt: new Date().toISOString()
                });
                this.saveToStorage();
                Alpine.store('ui').showNotification(`${product.name} added to wishlist!`, 'success');
            }
        },

        removeItem(productId) {
            const item = this.items.find(item => item.product.id === productId);
            if (item) {
                this.items = this.items.filter(item => item.product.id !== productId);
                this.saveToStorage();
                Alpine.store('ui').showNotification(`${item.product.name} removed from wishlist`, 'info');
            }
        },

        toggleItem(product) {
            if (this.isInWishlist(product.id)) {
                this.removeItem(product.id);
            } else {
                this.addItem(product);
            }
        },

        isInWishlist(productId) {
            return this.items.some(item => item.product.id === productId);
        },

        getItems() {
            return this.items;
        },

        getCount() {
            return this.items.length;
        },

        clearWishlist() {
            this.items = [];
            this.saveToStorage();
            Alpine.store('ui').showNotification('Wishlist cleared', 'info');
        },

        saveToStorage() {
            try {
                localStorage.setItem('greenlion_wishlist', JSON.stringify(this.items));
            } catch (error) {
                console.error('Failed to save wishlist to localStorage:', error);
            }
        },

        loadFromStorage() {
            try {
                const savedWishlist = localStorage.getItem('greenlion_wishlist');
                if (savedWishlist) {
                    this.items = JSON.parse(savedWishlist);
                }
            } catch (error) {
                console.error('Failed to load wishlist from localStorage:', error);
                this.items = [];
            }
        }
    });

    // Initialize stores
    Alpine.store('cart').init();
    Alpine.store('wishlist').init();
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can add error reporting here
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You can add error reporting here
});

// Performance monitoring
window.addEventListener('load', () => {
    // Track page load performance
    if (typeof gtag !== 'undefined') {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        gtag('event', 'timing_complete', {
            name: 'load',
            value: loadTime
        });
    }
});

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
