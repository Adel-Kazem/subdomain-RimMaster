// pages/product-page.js - Product Detail Page Component for GreenLion SPA
document.addEventListener('alpine:init', () => {
    Alpine.data('productPage', () => ({
        product: null,
        selectedOptions: {},
        quantity: 1,
        selectedImageIndex: 0,
        relatedProducts: [],
        reviews: [],
        showImageModal: false,
        activeTab: 'description', // 'description', 'specifications', 'reviews'
        isLoading: true,
        error: null,

        // Sample reviews data
        sampleReviews: [
            {
                id: 1,
                name: "Ahmad Khalil",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 5,
                comment: "Excellent product! Works exactly as described and the build quality is outstanding.",
                date: "2024-01-15",
                verified: true
            },
            {
                id: 2,
                name: "Sara Mahmoud",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 5,
                comment: "Fast delivery and great customer service. Very satisfied with my purchase!",
                date: "2024-01-10",
                verified: true
            },
            {
                id: 3,
                name: "Omar Hassan",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 4,
                comment: "Good quality product, but shipping took a bit longer than expected.",
                date: "2024-01-05",
                verified: false
            }
        ],

        init() {
            this.loadProduct();
            this.watchRouteParams();
        },

        watchRouteParams() {
            this.$watch('$store.router.currentParams', () => {
                this.loadProduct();
            });
        },

        loadProduct() {
            this.isLoading = true;
            this.error = null;

            // Get product slug from router
            const slug = this.$store.router.getParam('slug');

            if (!slug) {
                this.error = 'Product not found';
                this.isLoading = false;
                return;
            }

            // Find product by slug
            setTimeout(() => {
                if (typeof PRODUCTS !== 'undefined') {
                    this.product = PRODUCTS.find(p => p.slug === slug);

                    if (this.product) {
                        this.initializeOptions();
                        this.loadRelatedProducts();
                        this.loadReviews();
                        this.selectedImageIndex = 0;
                    } else {
                        this.error = 'Product not found';
                    }
                } else {
                    this.error = 'Products data not available';
                }

                this.isLoading = false;
            }, 300);
        },

        initializeOptions() {
            if (this.product && this.product.options) {
                Object.keys(this.product.options).forEach(optionName => {
                    const options = this.product.options[optionName];
                    if (Array.isArray(options) && options.length > 0) {
                        // Set default to first option
                        this.selectedOptions[optionName] = typeof options[0] === 'object' ? options[0].value : options[0];
                    }
                });
            }
        },

        loadRelatedProducts() {
            if (this.product && typeof PRODUCTS !== 'undefined') {
                // Get products from the same category, excluding current product
                this.relatedProducts = PRODUCTS
                    .filter(p => p.category === this.product.category && p.id !== this.product.id)
                    .slice(0, 4);
            }
        },

        loadReviews() {
            // In a real app, this would fetch reviews from an API
            this.reviews = this.sampleReviews;
        },

        // Product image handling
        get productImages() {
            if (!this.product) return [];

            const images = [this.product.image];
            if (this.product.gallery && Array.isArray(this.product.gallery)) {
                images.push(...this.product.gallery);
            }
            return images;
        },

        selectImage(index) {
            this.selectedImageIndex = index;
        },

        nextImage() {
            this.selectedImageIndex = (this.selectedImageIndex + 1) % this.productImages.length;
        },

        prevImage() {
            this.selectedImageIndex = this.selectedImageIndex === 0 ? this.productImages.length - 1 : this.selectedImageIndex - 1;
        },

        openImageModal() {
            this.showImageModal = true;
            document.body.style.overflow = 'hidden';
        },

        closeImageModal() {
            this.showImageModal = false;
            document.body.style.overflow = 'auto';
        },

        // Options handling
        selectOption(optionName, value) {
            this.selectedOptions[optionName] = value;
        },

        getOptionPrice(optionName, value) {
            if (!this.product.options || !this.product.options[optionName]) return 0;

            const option = this.product.options[optionName].find(opt =>
                (typeof opt === 'object' && opt.value === value) ||
                (typeof opt === 'string' && opt === value)
            );

            return option && option.priceModifier ? parseFloat(option.priceModifier) : 0;
        },

        // Price calculation
        get finalPrice() {
            let price = parseFloat(this.product?.price || 0);

            // Add option prices
            Object.keys(this.selectedOptions).forEach(optionName => {
                price += this.getOptionPrice(optionName, this.selectedOptions[optionName]);
            });

            return price;
        },

        get totalPrice() {
            return this.finalPrice * this.quantity;
        },

        // Quantity handling
        incrementQuantity() {
            if (this.quantity < 10) { // Max quantity limit
                this.quantity++;
            }
        },

        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        // Actions
        addToCart() {
            if (!this.product) return;

            this.$store.cart.addItem(
                this.product,
                this.quantity,
                this.selectedOptions
            );
        },

        buyNow() {
            this.addToCart();
            this.$store.router.navigate('cart');
        },

        toggleWishlist() {
            if (!this.product) return;
            this.$store.wishlist.toggleItem(this.product);
        },

        shareProduct() {
            if (!this.product) return;
            this.$store.ui.shareProduct(this.product);
        },

        // Reviews
        get averageRating() {
            if (this.reviews.length === 0) return 0;
            const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
            return (sum / this.reviews.length).toFixed(1);
        },

        get ratingDistribution() {
            const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            this.reviews.forEach(review => {
                distribution[review.rating]++;
            });

            // Convert to percentages
            Object.keys(distribution).forEach(rating => {
                distribution[rating] = this.reviews.length > 0
                    ? Math.round((distribution[rating] / this.reviews.length) * 100)
                    : 0;
            });

            return distribution;
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Contact actions
        contactWhatsApp() {
            const message = `Hello! I'm interested in the ${this.product?.name}. Can you provide more information?`;
            this.$store.ui.openWhatsApp(message);
        },

        template: `
            <div class="min-h-screen bg-gray-50">
                <!-- Breadcrumb -->
                <div class="bg-white border-b border-gray-200">
                    <div class="max-w-7xl mx-auto px-6 py-4">
                        <div x-data="breadcrumbNav" x-html="template"></div>
                    </div>
                </div>
                
                <!-- Loading State -->
                <div x-show="isLoading" class="max-w-7xl mx-auto px-6 py-12">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                        <p class="text-gray-600">Loading product details...</p>
                    </div>
                </div>
                
                <!-- Error State -->
                <div x-show="error && !isLoading" class="max-w-7xl mx-auto px-6 py-12">
                    <div class="text-center">
                        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
                        <p class="text-gray-600 mb-6" x-text="error"></p>
                        <button @click="$store.router.navigate('products')"
                                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Browse Products
                        </button>
                    </div>
                </div>
                
                <!-- Product Content -->
                <div x-show="product && !isLoading && !error" class="max-w-7xl mx-auto px-6 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <!-- Product Images -->
                        <div class="space-y-4">
                            <!-- Main Image -->
                            <div class="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                                <img :src="productImages[selectedImageIndex]" 
                                     :alt="product?.name"
                                     @click="openImageModal()"
                                     class="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300">
                            </div>
                            
                            <!-- Image Thumbnails -->
                            <div x-show="productImages.length > 1" class="flex space-x-3 overflow-x-auto pb-2">
                                <template x-for="(image, index) in productImages" :key="index">
                                    <button @click="selectImage(index)"
                                            :class="selectedImageIndex === index ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'"
                                            class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all">
                                        <img :src="image" 
                                             :alt="product?.name"
                                             class="w-full h-full object-cover">
                                    </button>
                                </template>
                            </div>
                        </div>
                        
                        <!-- Product Info -->
                        <div class="space-y-6">
                            <!-- Category & Brand -->
                            <div class="flex items-center justify-between">
                                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                                      x-text="product?.category"></span>
                                <div class="flex items-center space-x-2">
                                    <button @click="toggleWishlist()"
                                            :class="$store.wishlist.isInWishlist(product?.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
                                            class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <use :xlink:href="$store.wishlist.isInWishlist(product?.id) ? '#icon-heart-filled' : '#icon-heart'"></use>
                                        </svg>
                                    </button>
                                    <button @click="shareProduct()"
                                            class="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-green-500 transition-colors">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-share"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Product Name -->
                            <h1 class="text-3xl md:text-4xl font-bold text-gray-900" x-text="product?.name"></h1>
                            
                            <!-- Rating & Reviews -->
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center space-x-1">
                                    <template x-for="i in 5" :key="i">
                                        <svg :class="i <= Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'" 
                                             class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-star-filled"></use>
                                        </svg>
                                    </template>
                                </div>
                                <span class="text-lg font-medium text-gray-900" x-text="averageRating"></span>
                                <span class="text-gray-600">(<span x-text="reviews.length"></span> reviews)</span>
                            </div>
                            
                            <!-- Price -->
                            <div class="space-y-2">
                                <div class="flex items-baseline space-x-3">
                                    <span class="text-4xl font-bold text-gray-900" x-text="$store.ui.formatPrice(finalPrice)"></span>
                                    <span x-show="product?.originalPrice && product.originalPrice > finalPrice" 
                                          class="text-xl text-gray-500 line-through" 
                                          x-text="$store.ui.formatPrice(product.originalPrice)"></span>
                                    <span x-show="product?.originalPrice && product.originalPrice > finalPrice"
                                          class="inline-block bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded"
                                          x-text="Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100) + '% OFF'"></span>
                                </div>
                                <p class="text-sm text-gray-600">Price includes VAT</p>
                            </div>
                            
                            <!-- Product Options -->
                            <div x-show="product?.options && Object.keys(product.options).length > 0" class="space-y-4">
                                <template x-for="[optionName, optionValues] in Object.entries(product?.options || {})" :key="optionName">
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-900 capitalize" x-text="optionName"></label>
                                        <div class="flex flex-wrap gap-2">
                                            <template x-for="option in optionValues" :key="typeof option === 'object' ? option.value : option">
                                                <button @click="selectOption(optionName, typeof option === 'object' ? option.value : option)"
                                                        :class="selectedOptions[optionName] === (typeof option === 'object' ? option.value : option) 
                                                               ? 'bg-green-600 text-white border-green-600' 
                                                               : 'bg-white text-gray-900 border-gray-200 hover:border-green-300'"
                                                        class="px-4 py-2 border rounded-lg font-medium transition-colors">
                                                    <span x-text="typeof option === 'object' ? option.label || option.value : option"></span>
                                                    <span x-show="typeof option === 'object' && option.priceModifier" 
                                                          class="ml-1 text-sm"
                                                          x-text="(option.priceModifier > 0 ? '+' : '') + $store.ui.formatPrice(option.priceModifier)"></span>
                                                </button>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            
                            <!-- Quantity Selector -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-900">Quantity</label>
                                <div class="flex items-center space-x-3">
                                    <button @click="decrementQuantity()"
                                            :disabled="quantity <= 1"
                                            class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-minus"></use>
                                        </svg>
                                    </button>
                                    <span class="text-xl font-semibold text-gray-900 w-12 text-center" x-text="quantity"></span>
                                    <button @click="incrementQuantity()"
                                            :disabled="quantity >= 10"
                                            class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-plus"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Total Price Display -->
                            <div x-show="quantity > 1" class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center">
                                    <span class="text-lg font-medium text-gray-900">Total:</span>
                                    <span class="text-2xl font-bold text-green-600" x-text="$store.ui.formatPrice(totalPrice)"></span>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="space-y-3">
                                <button @click="addToCart()"
                                        class="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                                    Add to Cart - <span x-text="$store.ui.formatPrice(totalPrice)"></span>
                                </button>
                                <button @click="buyNow()"
                                        class="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                                    Buy Now
                                </button>
                                <button @click="contactWhatsApp()"
                                        class="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-whatsapp"></use>
                                    </svg>
                                    <span>Contact via WhatsApp</span>
                                </button>
                            </div>
                            
                            <!-- Features -->
                            <div class="bg-gray-50 p-6 rounded-lg">
                                <h3 class="font-semibold text-gray-900 mb-3">Why Choose This Product?</h3>
                                <ul class="space-y-2 text-sm text-gray-600">
                                    <li class="flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-check"></use>
                                        </svg>
                                        <span>Free delivery across Lebanon</span>
                                    </li>
                                    <li class="flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-check"></use>
                                        </svg>
                                        <span>1-year warranty included</span>
                                    </li>
                                    <li class="flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-check"></use>
                                        </svg>
                                        <span>30-day return policy</span>
                                    </li>
                                    <li class="flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-check"></use>
                                        </svg>
                                        <span>Expert customer support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Details Tabs -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
                        <!-- Tab Navigation -->
                        <div class="border-b border-gray-200">
                            <nav class="flex">
                                <button @click="activeTab = 'description'"
                                        :class="activeTab === 'description' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                                        class="py-4 px-6 border-b-2 font-medium text-sm transition-colors">
                                    Description
                                </button>
                                <button @click="activeTab = 'specifications'"
                                        :class="activeTab === 'specifications' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                                        class="py-4 px-6 border-b-2 font-medium text-sm transition-colors">
                                    Specifications
                                </button>
                                <button @click="activeTab = 'reviews'"
                                        :class="activeTab === 'reviews' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                                        class="py-4 px-6 border-b-2 font-medium text-sm transition-colors">
                                    Reviews (<span x-text="reviews.length"></span>)
                                </button>
                            </nav>
                        </div>
                        
                        <!-- Tab Content -->
                        <div class="p-8">
                            <!-- Description Tab -->
                            <div x-show="activeTab === 'description'" class="prose max-w-none">
                                <p class="text-gray-700 leading-relaxed text-lg" x-text="product?.description"></p>
                                
                                <!-- Additional Features -->
                                <div x-show="product?.features" class="mt-8">
                                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                                    <ul class="space-y-2">
                                        <template x-for="feature in (product?.features || [])" :key="feature">
                                            <li class="flex items-start space-x-2">
                                                <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-check"></use>
                                                </svg>
                                                <span class="text-gray-700" x-text="feature"></span>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                            
                            <!-- Specifications Tab -->
                            <div x-show="activeTab === 'specifications'">
                                <div x-show="product?.specifications" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <template x-for="[key, value] in Object.entries(product?.specifications || {})" :key="key">
                                        <div class="flex justify-between py-3 border-b border-gray-100">
                                            <span class="font-medium text-gray-900 capitalize" x-text="key.replace(/([A-Z])/g, ' $1').trim()"></span>
                                            <span class="text-gray-700" x-text="value"></span>
                                        </div>
                                    </template>
                                </div>
                                <div x-show="!product?.specifications" class="text-center py-8 text-gray-500">
                                    No specifications available for this product.
                                </div>
                            </div>
                            
                            <!-- Reviews Tab -->
                            <div x-show="activeTab === 'reviews'" class="space-y-8">
                                <!-- Reviews Summary -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <!-- Average Rating -->
                                    <div class="text-center">
                                        <div class="text-6xl font-bold text-gray-900 mb-2" x-text="averageRating"></div>
                                        <div class="flex items-center justify-center space-x-1 mb-2">
                                            <template x-for="i in 5" :key="i">
                                                <svg :class="i <= Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'" 
                                                     class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-star-filled"></use>
                                                </svg>
                                            </template>
                                        </div>
                                        <p class="text-gray-600">Based on <span x-text="reviews.length"></span> reviews</p>
                                    </div>
                                    
                                    <!-- Rating Distribution -->
                                    <div class="space-y-2">
                                        <template x-for="rating in [5, 4, 3, 2, 1]" :key="rating">
                                            <div class="flex items-center space-x-2">
                                                <span class="text-sm text-gray-600 w-8" x-text="rating + ' ★'"></span>
                                                <div class="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div class="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                                                         :style="'width: ' + ratingDistribution[rating] + '%'"></div>
                                                </div>
                                                <span class="text-sm text-gray-600 w-8" x-text="ratingDistribution[rating] + '%'"></span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                
                                <!-- Individual Reviews -->
                                <div class="space-y-6">
                                    <template x-for="review in reviews" :key="review.id">
                                        <div class="border-b border-gray-200 pb-6">
                                            <div class="flex items-start space-x-4">
                                                <img :src="review.avatar" 
                                                     :alt="review.name"
                                                     class="w-12 h-12 rounded-full object-cover">
                                                <div class="flex-1">
                                                    <div class="flex items-center space-x-2 mb-2">
                                                        <h4 class="font-semibold text-gray-900" x-text="review.name"></h4>
                                                        <span x-show="review.verified" class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                            Verified Purchase
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center space-x-2 mb-2">
                                                        <div class="flex space-x-1">
                                                            <template x-for="i in 5" :key="i">
                                                                <svg :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" 
                                                                     class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                    <use xlink:href="#icon-star-filled"></use>
                                                                </svg>
                                                            </template>
                                                        </div>
                                                        <span class="text-sm text-gray-600" x-text="formatDate(review.date)"></span>
                                                    </div>
                                                    <p class="text-gray-700 leading-relaxed" x-text="review.comment"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Related Products -->
                    <div x-show="relatedProducts.length > 0" class="mb-16">
                        <h2 class="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <template x-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
                                <div class="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
                                    <div class="relative aspect-square overflow-hidden">
                                        <img :src="relatedProduct.image" 
                                             :alt="relatedProduct.name"
                                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                                        <button @click="$store.router.navigate('product', { slug: relatedProduct.slug })"
                                                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <span class="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                View Product
                                            </span>
                                        </button>
                                    </div>
                                    <div class="p-4">
                                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2" x-text="relatedProduct.name"></h3>
                                        <div class="flex items-center justify-between">
                                            <span class="text-lg font-bold text-gray-900" x-text="$store.ui.formatPrice(relatedProduct.price)"></span>
                                            <button @click="$store.cart.addItem(relatedProduct)"
                                                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                
                <!-- Image Modal -->
                <div x-show="showImageModal" 
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0"
                     x-transition:enter-end="opacity-100"
                     x-transition:leave="transition ease-in duration-200"
                     x-transition:leave-start="opacity-100"
                     x-transition:leave-end="opacity-0"
                     class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                     @click="closeImageModal()"
                     @keydown.escape.window="closeImageModal()">
                    <div class="relative max-w-4xl max-h-full">
                        <img :src="productImages[selectedImageIndex]" 
                             :alt="product?.name"
                             class="max-w-full max-h-full object-contain">
                        
                        <!-- Navigation -->
                        <button x-show="productImages.length > 1" 
                                @click.stop="prevImage()"
                                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <use xlink:href="#icon-arrow-left"></use>
                            </svg>
                        </button>
                        <button x-show="productImages.length > 1" 
                                @click.stop="nextImage()"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <use xlink:href="#icon-arrow-right"></use>
                            </svg>
                        </button>
                        
                        <!-- Close Button -->
                        <button @click.stop="closeImageModal()"
                                class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <use xlink:href="#icon-x"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `
    }));
});
