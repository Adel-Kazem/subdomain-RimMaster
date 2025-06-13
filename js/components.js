// components.js - Reusable Alpine.js Components for GreenLion SPA
document.addEventListener('alpine:init', () => {

    // SVG Sprite Component
    Alpine.data('svgSprites', () => ({
        template: `
            <svg style="display: none;">
                <defs>
                    <!-- Menu Icon -->
                    <g id="icon-menu">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </g>
                    
                    <!-- Close Icon -->
                    <g id="icon-close">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </g>
                    
                    <!-- Search Icon -->
                    <g id="icon-search">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </g>
                    
                    <!-- Shopping Bag Icon -->
                    <g id="icon-shopping-bag">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </g>
                    
                    <!-- Heart Icon -->
                    <g id="icon-heart">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </g>
                    
                    <!-- Heart Filled Icon -->
                    <g id="icon-heart-filled">
                        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </g>
                    
                    <!-- Star Icon -->
                    <g id="icon-star">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </g>
                    
                    <!-- Star Filled Icon -->
                    <g id="icon-star-filled">
                        <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </g>
                    
                    <!-- Plus Icon -->
                    <g id="icon-plus">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </g>
                    
                    <!-- Minus Icon -->
                    <g id="icon-minus">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </g>
                    
                    <!-- Trash Icon -->
                    <g id="icon-trash">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </g>
                    
                    <!-- Arrow Right Icon -->
                    <g id="icon-arrow-right">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </g>
                    
                    <!-- Arrow Left Icon -->
                    <g id="icon-arrow-left">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </g>
                    
                    <!-- External Link Icon -->
                    <g id="icon-external-link">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </g>
                    
                    <!-- Share Icon -->
                    <g id="icon-share">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </g>
                    
                    <!-- WhatsApp Icon -->
                    <g id="icon-whatsapp">
                        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                    </g>
                    
                    <!-- Phone Icon -->
                    <g id="icon-phone">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </g>
                    
                    <!-- Email Icon -->
                    <g id="icon-email">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </g>
                    
                    <!-- Location Icon -->
                    <g id="icon-location">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </g>
                    
                    <!-- Filter Icon -->
                    <g id="icon-filter">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                    </g>
                    
                    <!-- Grid Icon -->
                    <g id="icon-grid">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </g>
                    
                    <!-- List Icon -->
                    <g id="icon-list">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </g>
                    
                    <!-- Check Icon -->
                    <g id="icon-check">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </g>
                    
                    <!-- X Icon -->
                    <g id="icon-x">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </g>
                    
                    <!-- Info Icon -->
                    <g id="icon-info">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </g>
                    
                    <!-- Warning Icon -->
                    <g id="icon-warning">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </g>
                    
                    <!-- Loading Spinner -->
                    <g id="icon-spinner">
                        <path fill="none" d="M12 6V4m0 2a6 6 0 100 12m0-12a6 6 0 000 12m0-12v2m0 12v-2m6-6h2m-2 0a6 6 0 01-12 0m12 0a6 6 0 00-12 0m12 0h-2m-12 0H2m10 0a6 6 0 010-12m0 12a6 6 0 000-12"/>
                    </g>
                </defs>
            </svg>
        `
    }));

    // Site Footer Component
    Alpine.data('siteFooter', () => ({
        currentYear: new Date().getFullYear(),
        template: `
            <footer class="bg-gray-900 text-white">
                <div class="max-w-7xl mx-auto px-6 py-16">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Company Info -->
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-xl flex items-center justify-center rounded-lg">
                                    GL
                                </div>
                                <div class="text-2xl font-bold text-white">GreenLion</div>
                            </div>
                            <p class="text-gray-400 leading-relaxed">
                                Premium consumer electronics and smart gadgets in Lebanon. 
                                Discover cutting-edge technology at competitive prices with exceptional customer service.
                            </p>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.036 6.24c-3.315 0-6 2.685-6 6s2.685 6 6 6 6-2.685 6-6-2.685-6-6-6zm0 9.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6zm7.2-9.84c0 .78-.63 1.41-1.41 1.41s-1.41-.63-1.41-1.41.63-1.41 1.41-1.41 1.41.63 1.41 1.41zM12.036 2.16c-3.24 0-10.08 0-10.08 10.08s0 10.08 10.08 10.08 10.08 0 10.08-10.08 0-10.08-10.08-10.08zm0 18.12c-4.41 0-8.04-3.63-8.04-8.04s3.63-8.04 8.04-8.04 8.04 3.63 8.04 8.04-3.63 8.04-8.04 8.04z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Quick Links -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-white">Quick Links</h3>
                            <ul class="space-y-2">
                                <li><a href="#home" @click="$store.router.navigate('home')" class="text-gray-400 hover:text-green-500 transition-colors">Home</a></li>
                                <li><a href="#products" @click="$store.router.navigate('products')" class="text-gray-400 hover:text-green-500 transition-colors">All Products</a></li>
                                <li><a href="#products/category/mobile-accessories" @click="$store.router.navigate('products', {category: 'mobile-accessories'})" class="text-gray-400 hover:text-green-500 transition-colors">Mobile Accessories</a></li>
                                <li><a href="#products/category/audio" @click="$store.router.navigate('products', {category: 'audio'})" class="text-gray-400 hover:text-green-500 transition-colors">Audio Devices</a></li>
                                <li><a href="#products/category/smart-home" @click="$store.router.navigate('products', {category: 'smart-home'})" class="text-gray-400 hover:text-green-500 transition-colors">Smart Home</a></li>
                                <li><a href="#cart" @click="$store.router.navigate('cart')" class="text-gray-400 hover:text-green-500 transition-colors">Shopping Cart</a></li>
                            </ul>
                        </div>
                        
                        <!-- Categories -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-white">Categories</h3>
                            <ul class="space-y-2">
                                <li><a href="#products/category/charging" @click="$store.router.navigate('products', {category: 'charging'})" class="text-gray-400 hover:text-green-500 transition-colors">Charging Solutions</a></li>
                                <li><a href="#products/category/cables" @click="$store.router.navigate('products', {category: 'cables'})" class="text-gray-400 hover:text-green-500 transition-colors">Cables & Adapters</a></li>
                                <li><a href="#products/category/power-banks" @click="$store.router.navigate('products', {category: 'power-banks'})" class="text-gray-400 hover:text-green-500 transition-colors">Power Banks</a></li>
                                <li><a href="#products/category/stands" @click="$store.router.navigate('products', {category: 'stands'})" class="text-gray-400 hover:text-green-500 transition-colors">Stands & Holders</a></li>
                                <li><a href="#products/category/protection" @click="$store.router.navigate('products', {category: 'protection'})" class="text-gray-400 hover:text-green-500 transition-colors">Protection</a></li>
                            </ul>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-white">Contact Us</h3>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-location"></use>
                                    </svg>
                                    <span class="text-gray-400 text-sm">Beirut, Lebanon</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-phone"></use>
                                    </svg>
                                    <span class="text-gray-400 text-sm">+961 71 234 567</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-email"></use>
                                    </svg>
                                    <span class="text-gray-400 text-sm">info@greenlion.com</span>
                                </div>
                                <button @click="$store.ui.openWhatsApp('Hello GreenLion! I would like to get more information about your products.')"
                                        class="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <use xlink:href="#icon-whatsapp"></use>
                                    </svg>
                                    <span>WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Newsletter Signup -->
                    <div class="border-t border-gray-800 mt-12 pt-8" x-data="{ email: '', subscribed: false }">
                        <div class="text-center">
                            <h3 class="text-xl font-semibold text-white mb-4">Stay Updated</h3>
                            <p class="text-gray-400 mb-6 max-w-md mx-auto">
                                Subscribe to our newsletter for the latest products, deals, and tech news.
                            </p>
                            <div class="max-w-md mx-auto flex gap-4" x-show="!subscribed">
                                <input type="email" 
                                       x-model="email"
                                       placeholder="Enter your email" 
                                       class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                <button @click="subscribed = true; $store.ui.showNotification('Thank you for subscribing!', 'success')"
                                        :disabled="!email"
                                        class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-300 font-medium">
                                    Subscribe
                                </button>
                            </div>
                            <div x-show="subscribed" class="text-green-500 font-medium">
                                ✓ Thank you for subscribing to our newsletter!
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Bar -->
                    <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div class="text-gray-400 text-sm mb-4 md:mb-0">
                            © ${this.currentYear} GreenLion Electronics. All rights reserved.
                        </div>
                        <div class="flex space-x-6 text-sm">
                            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">Privacy Policy</a>
                            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">Terms of Service</a>
                            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">Return Policy</a>
                            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">Shipping Info</a>
                        </div>
                    </div>
                </div>
            </footer>
        `
    }));

    // Floating Action Buttons Component
    Alpine.data('floatingButtons', () => ({
        showScrollTop: false,

        init() {
            window.addEventListener('scroll', () => {
                this.showScrollTop = window.scrollY > 300;
            });
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        template: `
            <div class="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
                <!-- Scroll to Top Button -->
                <button @click="scrollToTop()" 
                        x-show="showScrollTop"
                        x-transition:enter="transition ease-out duration-300"
                        x-transition:enter-start="opacity-0 transform scale-0"
                        x-transition:enter-end="opacity-100 transform scale-100"
                        x-transition:leave="transition ease-in duration-200"
                        x-transition:leave-start="opacity-100 transform scale-100"
                        x-transition:leave-end="opacity-0 transform scale-0"
                        class="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>
                </button>
                
                <!-- WhatsApp Quick Contact -->
                <button @click="$store.ui.openWhatsApp('Hello GreenLion! I need assistance with your products.')"
                        class="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <use xlink:href="#icon-whatsapp"></use>
                    </svg>
                </button>
                
                <!-- Cart Quick Access -->
                <button @click="$store.router.navigate('cart')"
                        :class="$store.cart.getTotalItems() > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'"
                        class="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <use xlink:href="#icon-shopping-bag"></use>
                    </svg>
                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold" 
                          x-text="$store.cart.getTotalItems()" 
                          x-show="$store.cart.getTotalItems() > 0"
                          x-transition:enter="transition ease-out duration-300"
                          x-transition:enter-start="opacity-0 scale-0"
                          x-transition:enter-end="opacity-100 scale-100">
                    </span>
                </button>
            </div>
        `
    }));

    // Notification Toast Component
    Alpine.data('notificationToast', () => ({
        template: `
            <div class="fixed top-20 right-6 z-50 space-y-2" x-data="{ notifications: $store.ui.notifications }">
                <template x-for="notification in notifications" :key="notification.id">
                    <div x-show="true"
                         x-transition:enter="transition ease-out duration-300 transform"
                         x-transition:enter-start="opacity-0 translate-x-full"
                         x-transition:enter-end="opacity-100 translate-x-0"
                         x-transition:leave="transition ease-in duration-200 transform"
                         x-transition:leave-start="opacity-100 translate-x-0"
                         x-transition:leave-end="opacity-0 translate-x-full"
                         :class="{
                             'bg-green-600': notification.type === 'success',
                             'bg-red-600': notification.type === 'error', 
                             'bg-yellow-600': notification.type === 'warning',
                             'bg-blue-600': notification.type === 'info'
                         }"
                         class="max-w-sm p-4 rounded-lg shadow-lg text-white flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div x-show="notification.type === 'success'">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-check"></use>
                                </svg>
                            </div>
                            <div x-show="notification.type === 'error'">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-x"></use>
                                </svg>
                            </div>
                            <div x-show="notification.type === 'warning'">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-warning"></use>
                                </svg>
                            </div>
                            <div x-show="notification.type === 'info'">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-info"></use>
                                </svg>
                            </div>
                            <span class="font-medium" x-text="notification.message"></span>
                        </div>
                        <button @click="$store.ui.removeNotification(notification.id)" 
                                class="ml-4 hover:bg-black hover:bg-opacity-20 rounded p-1 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <use xlink:href="#icon-x"></use>
                            </svg>
                        </button>
                    </div>
                </template>
            </div>
        `
    }));

    // Product Card Component
    Alpine.data('productCard', (product) => ({
        product: product,

        addToCart() {
            Alpine.store('cart').addItem(this.product);
        },

        toggleWishlist() {
            Alpine.store('wishlist').toggleItem(this.product);
        },

        viewProduct() {
            Alpine.store('router').navigate('product', { slug: this.product.slug });
        },

        isInWishlist() {
            return Alpine.store('wishlist').isInWishlist(this.product.id);
        },

        shareProduct() {
            Alpine.store('ui').shareProduct(this.product);
        }
    }));

    // Breadcrumb Component
    Alpine.data('breadcrumbNav', () => ({
        get breadcrumbs() {
            return Alpine.store('router').generateBreadcrumbs();
        },

        template: `
            <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <template x-for="(crumb, index) in breadcrumbs" :key="crumb.url">
                    <div class="flex items-center space-x-2">
                        <a :href="crumb.url" 
                           @click.prevent="$store.router.navigate(crumb.url.replace('#', ''))"
                           :class="index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-green-600'"
                           class="transition-colors"
                           x-text="crumb.name">
                        </a>
                        <svg x-show="index < breadcrumbs.length - 1" 
                             class="w-4 h-4 text-gray-400" 
                             fill="none" 
                             stroke="currentColor" 
                             viewBox="0 0 24 24">
                            <use xlink:href="#icon-arrow-right"></use>
                        </svg>
                    </div>
                </template>
            </nav>
        `
    }));
});

// Add notification toast to body after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const notificationContainer = document.createElement('div');
    notificationContainer.setAttribute('x-data', 'notificationToast');
    notificationContainer.setAttribute('x-html', 'template');
    document.body.appendChild(notificationContainer);
});
