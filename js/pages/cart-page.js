// pages/cart-page.js - Shopping Cart Page Component for GreenLion SPA
document.addEventListener('alpine:init', () => {
    Alpine.data('cartPage', () => ({
        isLoading: false,
        showCheckoutModal: false,
        checkoutStep: 1, // 1: Details, 2: Confirmation
        shippingMethod: 'standard',
        paymentMethod: 'whatsapp',

        // Customer details
        customerDetails: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            notes: ''
        },

        // Shipping options
        shippingOptions: [
            {
                id: 'standard',
                name: 'Standard Delivery',
                description: '3-5 business days',
                price: 10,
                estimatedDays: '3-5'
            },
            {
                id: 'express',
                name: 'Express Delivery',
                description: '1-2 business days',
                price: 20,
                estimatedDays: '1-2'
            },
            {
                id: 'pickup',
                name: 'Store Pickup',
                description: 'Pickup from our store',
                price: 0,
                estimatedDays: '0'
            }
        ],

        // Payment options
        paymentOptions: [
            {
                id: 'whatsapp',
                name: 'WhatsApp Order',
                description: 'Complete your order via WhatsApp',
                icon: 'icon-whatsapp'
            },
            {
                id: 'cod',
                name: 'Cash on Delivery',
                description: 'Pay when you receive your order',
                icon: 'icon-truck'
            }
        ],

        init() {
            // Track cart view for analytics
            this.$store.cart.trackCartView();
        },

        // Cart item actions
        updateQuantity(itemId, newQuantity) {
            this.$store.cart.updateQuantity(itemId, newQuantity);
        },

        removeItem(itemId) {
            this.$store.cart.removeItem(itemId);
        },

        clearCart() {
            if (confirm('Are you sure you want to clear your cart?')) {
                this.$store.cart.clearCart();
            }
        },

        // Checkout process
        startCheckout() {
            if (this.$store.cart.isEmpty()) {
                this.$store.ui.showNotification('Your cart is empty', 'warning');
                return;
            }
            this.showCheckoutModal = true;
            this.checkoutStep = 1;
            document.body.style.overflow = 'hidden';
        },

        closeCheckout() {
            this.showCheckoutModal = false;
            this.checkoutStep = 1;
            document.body.style.overflow = 'auto';
        },

        nextStep() {
            if (this.validateStep()) {
                this.checkoutStep++;
            }
        },

        prevStep() {
            this.checkoutStep--;
        },

        validateStep() {
            if (this.checkoutStep === 1) {
                const required = ['firstName', 'lastName', 'phone', 'address', 'city'];
                const missing = required.filter(field => !this.customerDetails[field].trim());

                if (missing.length > 0) {
                    this.$store.ui.showNotification('Please fill in all required fields', 'error');
                    return false;
                }

                // Validate phone number (basic validation)
                const phoneRegex = /^(\+961|961|0)?[0-9]{8}$/;
                if (!phoneRegex.test(this.customerDetails.phone.replace(/\s/g, ''))) {
                    this.$store.ui.showNotification('Please enter a valid Lebanese phone number', 'error');
                    return false;
                }

                // Validate email if provided
                if (this.customerDetails.email && !/\S+@\S+\.\S+/.test(this.customerDetails.email)) {
                    this.$store.ui.showNotification('Please enter a valid email address', 'error');
                    return false;
                }
            }
            return true;
        },

        // Calculate totals
        get selectedShipping() {
            return this.shippingOptions.find(option => option.id === this.shippingMethod);
        },

        get cartSummary() {
            const cart = this.$store.cart.getCartSummary();
            const shippingCost = this.selectedShipping ? this.selectedShipping.price : 0;

            return {
                ...cart,
                shipping: shippingCost,
                total: cart.subtotal + cart.tax + shippingCost
            };
        },

        // Complete order
        completeOrder() {
            this.isLoading = true;

            // Simulate processing delay
            setTimeout(() => {
                if (this.paymentMethod === 'whatsapp') {
                    this.processWhatsAppOrder();
                } else {
                    this.processCODOrder();
                }
                this.isLoading = false;
            }, 1000);
        },

        processWhatsAppOrder() {
            const summary = this.cartSummary;
            const shipping = this.selectedShipping;

            let message = "🛒 *New Order from GreenLion*\n\n";

            // Customer Details
            message += "👤 *Customer Information:*\n";
            message += `Name: ${this.customerDetails.firstName} ${this.customerDetails.lastName}\n`;
            message += `Phone: ${this.customerDetails.phone}\n`;
            if (this.customerDetails.email) {
                message += `Email: ${this.customerDetails.email}\n`;
            }
            message += `Address: ${this.customerDetails.address}, ${this.customerDetails.city}\n`;
            if (this.customerDetails.postalCode) {
                message += `Postal Code: ${this.customerDetails.postalCode}\n`;
            }
            message += "\n";

            // Order Items
            message += "📦 *Order Items:*\n";
            summary.items.forEach((item, index) => {
                message += `${index + 1}. *${item.product.name}*\n`;
                message += `   Quantity: ${item.quantity}\n`;
                message += `   Unit Price: ${this.$store.ui.formatPrice(item.price)}\n`;
                message += `   Total: ${this.$store.ui.formatPrice(item.price * item.quantity)}\n`;

                if (Object.keys(item.selectedOptions).length > 0) {
                    message += `   Options: ${Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')}\n`;
                }
                message += "\n";
            });

            // Shipping Information
            message += "🚚 *Shipping:*\n";
            message += `Method: ${shipping.name}\n`;
            message += `Cost: ${this.$store.ui.formatPrice(shipping.price)}\n`;
            message += `Estimated Delivery: ${shipping.estimatedDays} business days\n\n`;

            // Order Summary
            message += "💰 *Order Summary:*\n";
            message += `Subtotal: ${this.$store.ui.formatPrice(summary.subtotal)}\n`;
            message += `Tax (11%): ${this.$store.ui.formatPrice(summary.tax)}\n`;
            message += `Shipping: ${this.$store.ui.formatPrice(summary.shipping)}\n`;
            message += `*Total: ${this.$store.ui.formatPrice(summary.total)}*\n\n`;

            // Payment Method
            message += "💳 *Payment Method:* WhatsApp Order\n\n";

            // Notes
            if (this.customerDetails.notes) {
                message += `📝 *Notes:* ${this.customerDetails.notes}\n\n`;
            }

            message += "Thank you for your order! We'll confirm details and arrange delivery.";

            // Send WhatsApp message
            this.$store.ui.openWhatsApp(message);

            // Clear cart and close modal
            this.orderComplete();
        },

        processCODOrder() {
            // For COD, we would typically send this to a backend API
            // For now, we'll show a success message and clear the cart
            this.$store.ui.showNotification('Order placed successfully! We will contact you soon.', 'success');
            this.orderComplete();
        },

        orderComplete() {
            // Clear cart
            this.$store.cart.clearCart();

            // Close modal
            this.closeCheckout();

            // Show success message
            this.$store.ui.showNotification('Thank you for your order!', 'success', 5000);

            // Navigate to home
            setTimeout(() => {
                this.$store.router.navigate('home');
            }, 2000);
        },

        // Utility functions
        formatPrice(price) {
            return this.$store.ui.formatPrice(price);
        },

        continueShopping() {
            this.$store.router.navigate('products');
        },

        template: `
            <div class="min-h-screen bg-gray-50">
                <!-- Breadcrumb -->
                <div class="bg-white border-b border-gray-200">
                    <div class="max-w-7xl mx-auto px-6 py-4">
                        <div x-data="breadcrumbNav" x-html="template"></div>
                    </div>
                </div>
                
                <div class="max-w-7xl mx-auto px-6 py-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                    
                    <!-- Empty Cart State -->
                    <div x-show="$store.cart.isEmpty()" class="text-center py-16">
                        <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <use xlink:href="#icon-shopping-bag"></use>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                        <p class="text-gray-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet. 
                            Browse our products and discover amazing electronics!
                        </p>
                        <button @click="continueShopping()"
                                class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105">
                            Start Shopping
                        </button>
                    </div>
                    
                    <!-- Cart Content -->
                    <div x-show="!$store.cart.isEmpty()" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <!-- Cart Items -->
                        <div class="lg:col-span-2 space-y-4">
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div class="p-6 border-b border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-xl font-semibold text-gray-900">
                                            Cart Items (<span x-text="$store.cart.getTotalItems()"></span>)
                                        </h2>
                                        <button @click="clearCart()"
                                                class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="divide-y divide-gray-200">
                                    <template x-for="item in $store.cart.items" :key="item.id">
                                        <div class="p-6 hover:bg-gray-50 transition-colors">
                                            <div class="flex items-start space-x-4">
                                                <!-- Product Image -->
                                                <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                                    <img :src="item.product.image" 
                                                         :alt="item.product.name"
                                                         class="w-full h-full object-cover">
                                                </div>
                                                
                                                <!-- Product Details -->
                                                <div class="flex-1 min-w-0">
                                                    <div class="flex items-start justify-between">
                                                        <div class="flex-1">
                                                            <h3 @click="$store.router.navigate('product', { slug: item.product.slug })"
                                                                class="text-lg font-medium text-gray-900 hover:text-green-600 cursor-pointer transition-colors line-clamp-2" 
                                                                x-text="item.product.name"></h3>
                                                            <p class="text-sm text-gray-600 mt-1" x-text="item.product.category"></p>
                                                            
                                                            <!-- Selected Options -->
                                                            <div x-show="Object.keys(item.selectedOptions).length > 0" class="mt-2">
                                                                <template x-for="[key, value] in Object.entries(item.selectedOptions)" :key="key">
                                                                    <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
                                                                        <span class="capitalize" x-text="key"></span>: <span x-text="value"></span>
                                                                    </span>
                                                                </template>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- Remove Button -->
                                                        <button @click="removeItem(item.id)"
                                                                class="ml-4 text-red-600 hover:text-red-700 p-1 transition-colors">
                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <use xlink:href="#icon-trash"></use>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    
                                                    <!-- Quantity and Price -->
                                                    <div class="flex items-center justify-between mt-4">
                                                        <!-- Quantity Controls -->
                                                        <div class="flex items-center space-x-2">
                                                            <button @click="updateQuantity(item.id, item.quantity - 1)"
                                                                    :disabled="item.quantity <= 1"
                                                                    class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <use xlink:href="#icon-minus"></use>
                                                                </svg>
                                                            </button>
                                                            <span class="text-lg font-medium text-gray-900 w-8 text-center" x-text="item.quantity"></span>
                                                            <button @click="updateQuantity(item.id, item.quantity + 1)"
                                                                    :disabled="item.quantity >= 10"
                                                                    class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <use xlink:href="#icon-plus"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        
                                                        <!-- Price -->
                                                        <div class="text-right">
                                                            <div class="text-lg font-bold text-gray-900" x-text="formatPrice(item.price * item.quantity)"></div>
                                                            <div x-show="item.quantity > 1" class="text-sm text-gray-500">
                                                                <span x-text="formatPrice(item.price)"></span> each
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            
                            <!-- Continue Shopping -->
                            <div class="flex justify-center">
                                <button @click="continueShopping()"
                                        class="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-arrow-left"></use>
                                    </svg>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                        
                        <!-- Order Summary -->
                        <div class="lg:col-span-1">
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                                <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div class="space-y-4">
                                    <!-- Subtotal -->
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Subtotal (<span x-text="$store.cart.getTotalItems()"></span> items)</span>
                                        <span class="font-medium text-gray-900" x-text="formatPrice($store.cart.getSubtotal())"></span>
                                    </div>
                                    
                                    <!-- Tax -->
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Tax (11% VAT)</span>
                                        <span class="font-medium text-gray-900" x-text="formatPrice($store.cart.getTax())"></span>
                                    </div>
                                    
                                    <!-- Shipping -->
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Shipping</span>
                                        <span class="font-medium text-gray-900" x-text="formatPrice($store.cart.getShippingCost())"></span>
                                    </div>
                                    
                                    <div x-show="$store.cart.getShippingCost() === 0" class="text-sm text-green-600 font-medium">
                                        🎉 Free shipping on orders over $100!
                                    </div>
                                    
                                    <hr class="border-gray-200">
                                    
                                    <!-- Total -->
                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-semibold text-gray-900">Total</span>
                                        <span class="text-2xl font-bold text-gray-900" x-text="formatPrice($store.cart.getFinalTotal())"></span>
                                    </div>
                                </div>
                                
                                <!-- Checkout Button -->
                                <button @click="startCheckout()"
                                        class="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg text-lg font-semibold mt-6 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                                    Proceed to Checkout
                                </button>
                                
                                <!-- Quick Contact -->
                                <button @click="$store.ui.openWhatsApp('Hello! I have questions about my cart items.')"
                                        class="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 px-6 rounded-lg font-medium mt-3 transition-colors flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-whatsapp"></use>
                                    </svg>
                                    <span>Ask Questions</span>
                                </button>
                                
                                <!-- Security Badge -->
                                <div class="mt-6 pt-6 border-t border-gray-200">
                                    <div class="text-center text-sm text-gray-500">
                                        <div class="flex items-center justify-center space-x-2 mb-2">
                                            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                            </svg>
                                            <span class="font-medium">Secure Checkout</span>
                                        </div>
                                        <p>Your information is protected and secure</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Checkout Modal -->
                <div x-show="showCheckoutModal"
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0"
                     x-transition:enter-end="opacity-100"
                     x-transition:leave="transition ease-in duration-200"
                     x-transition:leave-start="opacity-100"
                     x-transition:leave-end="opacity-0"
                     class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
                     @click.self="closeCheckout()">
                    
                    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                         @click.stop>
                        
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 class="text-2xl font-bold text-gray-900">
                                <span x-show="checkoutStep === 1">Checkout Details</span>
                                <span x-show="checkoutStep === 2">Order Confirmation</span>
                            </h2>
                            <button @click="closeCheckout()" class="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-x"></use>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Step 1: Customer Details -->
                        <div x-show="checkoutStep === 1" class="p-6 space-y-6">
                            <!-- Customer Information -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input type="text" x-model="customerDetails.firstName" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input type="text" x-model="customerDetails.lastName" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                        <input type="tel" x-model="customerDetails.phone" placeholder="+961 71 234 567"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" x-model="customerDetails.email" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Shipping Address -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                        <input type="text" x-model="customerDetails.address" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                            <input type="text" x-model="customerDetails.city" 
                                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                            <input type="text" x-model="customerDetails.postalCode" 
                                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Shipping Method -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                                <div class="space-y-3">
                                    <template x-for="option in shippingOptions" :key="option.id">
                                        <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                               :class="shippingMethod === option.id ? 'border-green-500 bg-green-50' : ''">
                                            <input type="radio" :value="option.id" x-model="shippingMethod" class="sr-only">
                                            <div class="flex-1">
                                                <div class="flex items-center justify-between">
                                                    <div>
                                                        <div class="font-medium text-gray-900" x-text="option.name"></div>
                                                        <div class="text-sm text-gray-600" x-text="option.description"></div>
                                                    </div>
                                                    <div class="text-right">
                                                        <div class="font-medium text-gray-900" x-text="option.price === 0 ? 'Free' : formatPrice(option.price)"></div>
                                                        <div x-show="option.estimatedDays !== '0'" class="text-sm text-gray-600" x-text="option.estimatedDays + ' days'"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml-4">
                                                <div class="w-4 h-4 border-2 rounded-full flex items-center justify-center"
                                                     :class="shippingMethod === option.id ? 'border-green-500' : 'border-gray-300'">
                                                    <div x-show="shippingMethod === option.id" 
                                                         class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </label>
                                    </template>
                                </div>
                            </div>
                            
                            <!-- Payment Method -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                                <div class="space-y-3">
                                    <template x-for="option in paymentOptions" :key="option.id">
                                        <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                               :class="paymentMethod === option.id ? 'border-green-500 bg-green-50' : ''">
                                            <input type="radio" :value="option.id" x-model="paymentMethod" class="sr-only">
                                            <div class="flex-1 flex items-center">
                                                <svg class="w-6 h-6 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <use :xlink:href="'#' + option.icon"></use>
                                                </svg>
                                                <div>
                                                    <div class="font-medium text-gray-900" x-text="option.name"></div>
                                                    <div class="text-sm text-gray-600" x-text="option.description"></div>
                                                </div>
                                            </div>
                                            <div class="ml-4">
                                                <div class="w-4 h-4 border-2 rounded-full flex items-center justify-center"
                                                     :class="paymentMethod === option.id ? 'border-green-500' : 'border-gray-300'">
                                                    <div x-show="paymentMethod === option.id" 
                                                         class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </label>
                                    </template>
                                </div>
                            </div>
                            
                            <!-- Order Notes -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                                <textarea x-model="customerDetails.notes" rows="3" 
                                          placeholder="Any special instructions or requests..."
                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
                            </div>
                        </div>
                        
                        <!-- Step 2: Order Confirmation -->
                        <div x-show="checkoutStep === 2" class="p-6 space-y-6">
                            <!-- Order Summary -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <template x-for="item in $store.cart.items" :key="item.id">
                                        <div class="flex items-center justify-between">
                                            <div class="flex-1">
                                                <div class="font-medium text-gray-900" x-text="item.product.name"></div>
                                                <div class="text-sm text-gray-600">Qty: <span x-text="item.quantity"></span></div>
                                            </div>
                                            <div class="font-medium text-gray-900" x-text="formatPrice(item.price * item.quantity)"></div>
                                        </div>
                                    </template>
                                    
                                    <hr class="border-gray-200">
                                    
                                    <div class="space-y-2">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Subtotal</span>
                                            <span x-text="formatPrice(cartSummary.subtotal)"></span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Tax</span>
                                            <span x-text="formatPrice(cartSummary.tax)"></span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Shipping</span>
                                            <span x-text="formatPrice(cartSummary.shipping)"></span>
                                        </div>
                                        <div class="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                                            <span>Total</span>
                                            <span x-text="formatPrice(cartSummary.total)"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Customer Details Confirmation -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                                <div class="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div><strong>Name:</strong> <span x-text="customerDetails.firstName + ' ' + customerDetails.lastName"></span></div>
                                    <div><strong>Phone:</strong> <span x-text="customerDetails.phone"></span></div>
                                    <div x-show="customerDetails.email"><strong>Email:</strong> <span x-text="customerDetails.email"></span></div>
                                    <div><strong>Address:</strong> <span x-text="customerDetails.address + ', ' + customerDetails.city"></span></div>
                                    <div><strong>Shipping:</strong> <span x-text="selectedShipping?.name"></span></div>
                                    <div><strong>Payment:</strong> <span x-text="paymentOptions.find(p => p.id === paymentMethod)?.name"></span></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Modal Footer -->
                        <div class="flex items-center justify-between p-6 border-t border-gray-200">
                            <button x-show="checkoutStep === 2" 
                                    @click="prevStep()" 
                                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Back
                            </button>
                            <div x-show="checkoutStep === 1"></div>
                            
                            <div class="space-x-3">
                                <button @click="closeCheckout()" 
                                        class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button x-show="checkoutStep === 1" 
                                        @click="nextStep()" 
                                        class="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                    Continue
                                </button>
                                <button x-show="checkoutStep === 2" 
                                        @click="completeOrder()" 
                                        :disabled="isLoading"
                                        class="px-8 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors">
                                    <span x-show="!isLoading">Place Order</span>
                                    <span x-show="isLoading" class="flex items-center">
                                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }));
});
