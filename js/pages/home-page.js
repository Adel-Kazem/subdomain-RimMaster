// pages/home-page.js - Home Page Component for GreenLion SPA
document.addEventListener('alpine:init', () => {
    Alpine.data('homePage', () => ({
        featuredProducts: [],
        categories: [],
        testimonials: [
            {
                id: 1,
                name: "Sarah Martinez",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 5,
                comment: "Amazing quality products! My GreenLion wireless charger works perfectly and the build quality is exceptional.",
                location: "Beirut, Lebanon"
            },
            {
                id: 2,
                name: "Ahmad Hassan",
                avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 5,
                comment: "Fast delivery and excellent customer service. The power bank I ordered exceeded my expectations!",
                location: "Tripoli, Lebanon"
            },
            {
                id: 3,
                name: "Maya Khalil",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 5,
                comment: "Love the smart home devices from GreenLion. They've made my daily routine so much easier!",
                location: "Sidon, Lebanon"
            }
        ],
        stats: [
            { label: "Happy Customers", value: "10,000+", icon: "icon-heart" },
            { label: "Products Sold", value: "25,000+", icon: "icon-shopping-bag" },
            { label: "5-Star Reviews", value: "95%", icon: "icon-star" },
            { label: "Countries Served", value: "5+", icon: "icon-location" }
        ],

        init() {
            this.loadFeaturedProducts();
            this.loadCategories();
        },

        loadFeaturedProducts() {
            // Get featured products (first 8 products for demo)
            if (typeof PRODUCTS !== 'undefined') {
                this.featuredProducts = PRODUCTS.slice(0, 8);
            }
        },

        loadCategories() {
            // Load categories for the categories section
            if (typeof CATEGORIES !== 'undefined') {
                this.categories = CATEGORIES.slice(0, 6); // Show first 6 categories
            }
        },

        scrollToSection(sectionId) {
            Alpine.store('ui').scrollToElement(sectionId, 80);
        },

        template: `
            <div class="min-h-screen">
                <!-- Hero Section -->
                <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <!-- Background Elements -->
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                    
                    <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <div class="max-w-4xl mx-auto">
                            <!-- Main Heading -->
                            <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                Premium 
                                <span class="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    Electronics
                                </span>
                                <br class="hidden md:block">
                                for Modern Life
                            </h1>
                            
                            <!-- Subtitle -->
                            <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                                Discover cutting-edge technology and smart gadgets that enhance your digital lifestyle. 
                                From wireless chargers to smart home devices, we bring innovation to Lebanon.
                            </p>
                            
                            <!-- CTA Buttons -->
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <button @click="$store.router.navigate('products')"
                                        class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    Shop Now
                                </button>
                                <button @click="scrollToSection('featured-products')"
                                        class="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                    View Products
                                </button>
                            </div>
                            
                            <!-- Features -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                                    <p class="text-gray-600">Carefully curated electronics from trusted global brands</p>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                                    <p class="text-gray-600">Quick delivery across Lebanon with secure packaging</p>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
                                    <p class="text-gray-600">Professional customer service and technical assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Scroll Indicator -->
                    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                    </div>
                </section>
                
                <!-- Featured Products Section -->
                <section id="featured-products" class="py-20 bg-white">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Featured 
                                <span class="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    Products
                                </span>
                            </h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                                Discover our most popular electronics and smart gadgets, 
                                carefully selected for quality, innovation, and customer satisfaction.
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <template x-for="product in featuredProducts" :key="product.id">
                                <div class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                    <div class="relative overflow-hidden rounded-t-2xl">
                                        <img :src="product.image" 
                                             :alt="product.name"
                                             class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                                        
                                        <!-- Product Badge -->
                                        <div x-show="product.badge" 
                                             class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                                             x-text="product.badge">
                                        </div>
                                        
                                        <!-- Quick Actions -->
                                        <div class="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button @click="$store.wishlist.toggleItem(product)"
                                                    :class="$store.wishlist.isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
                                                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <use :xlink:href="$store.wishlist.isInWishlist(product.id) ? '#icon-heart-filled' : '#icon-heart'"></use>
                                                </svg>
                                            </button>
                                            <button @click="$store.ui.shareProduct(product)"
                                                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-400 hover:text-green-500 transition-colors">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-share"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="p-6">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="text-sm text-green-600 font-medium" x-text="product.category"></span>
                                            <div class="flex items-center space-x-1">
                                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-star-filled"></use>
                                                </svg>
                                                <span class="text-sm text-gray-600" x-text="product.rating || '4.5'"></span>
                                            </div>
                                        </div>
                                        
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2" x-text="product.name"></h3>
                                        <p class="text-gray-600 text-sm mb-4 line-clamp-2" x-text="product.description"></p>
                                        
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-2">
                                                <span class="text-2xl font-bold text-gray-900" x-text="$store.ui.formatPrice(product.price)"></span>
                                                <span x-show="product.originalPrice" 
                                                      class="text-sm text-gray-500 line-through" 
                                                      x-text="$store.ui.formatPrice(product.originalPrice)"></span>
                                            </div>
                                        </div>
                                        
                                        <div class="mt-4 flex space-x-2">
                                            <button @click="$store.router.navigate('product', { slug: product.slug })"
                                                    class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                                                View Details
                                            </button>
                                            <button @click="$store.cart.addItem(product)"
                                                    class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        
                        <div class="text-center mt-12">
                            <button @click="$store.router.navigate('products')"
                                    class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
                                View All Products
                            </button>
                        </div>
                    </div>
                </section>
                
                <!-- Categories Section -->
                <section class="py-20 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Shop by 
                                <span class="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    Category
                                </span>
                            </h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                                Explore our comprehensive range of electronics organized by category 
                                to find exactly what you need for your digital lifestyle.
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <template x-for="category in categories" :key="category.id">
                                <div @click="$store.router.navigate('products', { category: category.slug })"
                                     class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
                                    <div class="relative h-48 overflow-hidden">
                                        <img :src="category.image" 
                                             :alt="category.name"
                                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div class="absolute bottom-4 left-4 text-white">
                                            <h3 class="text-xl font-bold mb-1" x-text="category.name"></h3>
                                            <p class="text-sm opacity-90" x-text="category.productCount + ' Products'"></p>
                                        </div>
                                    </div>
                                    <div class="p-6">
                                        <p class="text-gray-600 mb-4" x-text="category.description"></p>
                                        <div class="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                                            <span class="mr-2">Explore Category</span>
                                            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <use xlink:href="#icon-arrow-right"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </section>
                
                <!-- Stats Section -->
                <section class="py-20 bg-green-600">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                                Trusted by Thousands
                            </h2>
                            <p class="text-xl text-green-100 max-w-3xl mx-auto">
                                Join our growing community of satisfied customers across Lebanon 
                                who trust GreenLion for their electronics needs.
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <template x-for="stat in stats" :key="stat.label">
                                <div class="text-center">
                                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use :xlink:href="'#' + stat.icon"></use>
                                        </svg>
                                    </div>
                                    <div class="text-3xl md:text-4xl font-bold text-white mb-2" x-text="stat.value"></div>
                                    <div class="text-green-100 font-medium" x-text="stat.label"></div>
                                </div>
                            </template>
                        </div>
                    </div>
                </section>
                
                <!-- Testimonials Section -->
                <section class="py-20 bg-white">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                What Our 
                                <span class="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    Customers
                                </span>
                                Say
                            </h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                                Real reviews from real customers who love shopping with GreenLion 
                                for their electronics and tech gadgets.
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <template x-for="testimonial in testimonials" :key="testimonial.id">
                                <div class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                    <div class="flex items-center mb-4">
                                        <img :src="testimonial.avatar" 
                                             :alt="testimonial.name"
                                             class="w-12 h-12 rounded-full object-cover mr-4">
                                        <div>
                                            <h4 class="font-semibold text-gray-900" x-text="testimonial.name"></h4>
                                            <p class="text-sm text-gray-600" x-text="testimonial.location"></p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center mb-4">
                                        <template x-for="i in testimonial.rating" :key="i">
                                            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                <use xlink:href="#icon-star-filled"></use>
                                            </svg>
                                        </template>
                                    </div>
                                    
                                    <p class="text-gray-700 leading-relaxed" x-text="testimonial.comment"></p>
                                </div>
                            </template>
                        </div>
                    </div>
                </section>
                
                <!-- CTA Section -->
                <section class="py-20 bg-gradient-to-r from-green-600 to-green-700">
                    <div class="max-w-4xl mx-auto px-6 text-center">
                        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Upgrade Your Tech?
                        </h2>
                        <p class="text-xl text-green-100 mb-8 leading-relaxed">
                            Explore our complete collection of premium electronics and smart gadgets. 
                            Find the perfect device to enhance your digital lifestyle today.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button @click="$store.router.navigate('products')"
                                    class="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                Browse Products
                            </button>
                            <button @click="$store.ui.openWhatsApp('Hello GreenLion! I want to learn more about your electronics products.')"
                                    class="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `
    }));
});
