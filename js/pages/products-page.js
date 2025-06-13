// pages/products-page.js - Products Page Component for GreenLion SPA
document.addEventListener('alpine:init', () => {
    Alpine.data('productsPage', () => ({
        products: [],
        filteredProducts: [],
        categories: [],
        currentCategory: '',
        currentSearch: '',
        currentBrand: '',
        priceRange: { min: 0, max: 1000 },
        selectedPriceRange: { min: 0, max: 1000 },
        sortBy: 'name',
        sortOrder: 'asc',
        viewMode: 'grid', // 'grid' or 'list'
        currentPage: 1,
        itemsPerPage: 12,
        isLoading: false,
        showFilters: false,

        // Filter options
        brands: [],
        priceRanges: [
            { label: 'Under $25', min: 0, max: 25 },
            { label: '$25 - $50', min: 25, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $200', min: 100, max: 200 },
            { label: 'Over $200', min: 200, max: 1000 }
        ],

        init() {
            this.loadProducts();
            this.loadCategories();
            this.extractBrands();
            this.watchRouteParams();
            this.applyInitialFilters();
        },

        watchRouteParams() {
            this.$watch('$store.router.currentParams', () => {
                this.applyInitialFilters();
            });
        },

        loadProducts() {
            this.isLoading = true;
            // Simulate loading delay
            setTimeout(() => {
                if (typeof PRODUCTS !== 'undefined') {
                    this.products = [...PRODUCTS];
                    this.calculatePriceRange();
                    this.filterProducts();
                }
                this.isLoading = false;
            }, 300);
        },

        loadCategories() {
            if (typeof CATEGORIES !== 'undefined') {
                this.categories = [...CATEGORIES];
            }
        },

        extractBrands() {
            const brandSet = new Set();
            this.products.forEach(product => {
                if (product.brand) {
                    brandSet.add(product.brand);
                }
            });
            this.brands = Array.from(brandSet).sort();
        },

        calculatePriceRange() {
            if (this.products.length > 0) {
                const prices = this.products.map(p => parseFloat(p.price));
                this.priceRange.min = Math.floor(Math.min(...prices));
                this.priceRange.max = Math.ceil(Math.max(...prices));
                this.selectedPriceRange = { ...this.priceRange };
            }
        },

        applyInitialFilters() {
            const params = this.$store.router.getCurrentParams();

            // Apply category filter
            if (params.category) {
                this.currentCategory = params.category;
            } else {
                this.currentCategory = '';
            }

            // Apply search filter
            if (params.search) {
                this.currentSearch = params.search;
            } else {
                this.currentSearch = '';
            }

            // Apply brand filter
            if (params.brand) {
                this.currentBrand = params.brand;
            } else {
                this.currentBrand = '';
            }

            // Apply price range filter
            if (params.priceRange) {
                const [min, max] = params.priceRange.split('-').map(Number);
                this.selectedPriceRange = { min, max };
            }

            this.filterProducts();
        },

        filterProducts() {
            let filtered = [...this.products];

            // Category filter
            if (this.currentCategory) {
                filtered = filtered.filter(product =>
                    product.category.toLowerCase().replace(/\s+/g, '-') === this.currentCategory ||
                    product.category.toLowerCase() === this.currentCategory
                );
            }

            // Search filter
            if (this.currentSearch) {
                const searchTerm = this.currentSearch.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    (product.brand && product.brand.toLowerCase().includes(searchTerm))
                );
            }

            // Brand filter
            if (this.currentBrand) {
                filtered = filtered.filter(product =>
                    product.brand && product.brand.toLowerCase() === this.currentBrand.toLowerCase()
                );
            }

            // Price range filter
            filtered = filtered.filter(product => {
                const price = parseFloat(product.price);
                return price >= this.selectedPriceRange.min && price <= this.selectedPriceRange.max;
            });

            // Sort products
            this.sortProducts(filtered);

            // Reset pagination
            this.currentPage = 1;
        },

        sortProducts(products) {
            products.sort((a, b) => {
                let aValue, bValue;

                switch (this.sortBy) {
                    case 'price':
                        aValue = parseFloat(a.price);
                        bValue = parseFloat(b.price);
                        break;
                    case 'name':
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                        break;
                    case 'rating':
                        aValue = parseFloat(a.rating) || 0;
                        bValue = parseFloat(b.rating) || 0;
                        break;
                    case 'newest':
                        aValue = new Date(a.createdAt || 0);
                        bValue = new Date(b.createdAt || 0);
                        break;
                    default:
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                }

                if (this.sortOrder === 'asc') {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });

            this.filteredProducts = products;
        },

        // Pagination
        get paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredProducts.slice(start, end);
        },

        get totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },

        get hasNextPage() {
            return this.currentPage < this.totalPages;
        },

        get hasPrevPage() {
            return this.currentPage > 1;
        },

        nextPage() {
            if (this.hasNextPage) {
                this.currentPage++;
                this.scrollToTop();
            }
        },

        prevPage() {
            if (this.hasPrevPage) {
                this.currentPage--;
                this.scrollToTop();
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.scrollToTop();
            }
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // Filter actions
        selectCategory(category) {
            this.currentCategory = category;
            this.$store.router.navigate('products', { category: category });
        },

        selectBrand(brand) {
            this.currentBrand = brand;
            this.filterProducts();
        },

        selectPriceRange(range) {
            this.selectedPriceRange = { min: range.min, max: range.max };
            this.filterProducts();
        },

        clearFilters() {
            this.currentCategory = '';
            this.currentSearch = '';
            this.currentBrand = '';
            this.selectedPriceRange = { ...this.priceRange };
            this.$store.router.navigate('products');
        },

        // Search functionality
        performSearch() {
            if (this.currentSearch.trim()) {
                this.$store.router.navigate('products', { search: this.currentSearch });
            } else {
                this.$store.router.navigate('products');
            }
        },

        // Sort functionality
        changeSort(sortBy) {
            if (this.sortBy === sortBy) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = sortBy;
                this.sortOrder = 'asc';
            }
            this.filterProducts();
        },

        // View mode
        setViewMode(mode) {
            this.viewMode = mode;
        },

        // Product actions
        addToCart(product) {
            this.$store.cart.addItem(product);
        },

        toggleWishlist(product) {
            this.$store.wishlist.toggleItem(product);
        },

        viewProduct(product) {
            this.$store.router.navigate('product', { slug: product.slug });
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
                    <!-- Page Header -->
                    <div class="mb-8">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <span x-show="currentCategory" x-text="$store.router.decodeSlug(currentCategory)"></span>
                            <span x-show="currentSearch">Search Results for "<span x-text="currentSearch"></span>"</span>
                            <span x-show="!currentCategory && !currentSearch">All Products</span>
                        </h1>
                        <p class="text-gray-600 text-lg">
                            <span x-text="filteredProducts.length"></span> products found
                        </p>
                    </div>
                    
                    <div class="flex flex-col lg:flex-row gap-8">
                        <!-- Sidebar Filters -->
                        <div class="lg:w-1/4">
                            <!-- Mobile Filter Toggle -->
                            <button @click="showFilters = !showFilters" 
                                    class="lg:hidden w-full bg-white border border-gray-200 px-4 py-3 rounded-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
                                <span>Filters</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <use xlink:href="#icon-filter"></use>
                                </svg>
                            </button>
                            
                            <!-- Filter Panel -->
                            <div class="space-y-6" :class="{ 'hidden lg:block': !showFilters }">
                                <!-- Search Filter -->
                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                    <h3 class="font-semibold text-gray-900 mb-4">Search Products</h3>
                                    <div class="relative">
                                        <input type="text" 
                                               x-model="currentSearch"
                                               @keyup.enter="performSearch()"
                                               placeholder="Search products..."
                                               class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <button @click="performSearch()" 
                                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <use xlink:href="#icon-search"></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Categories Filter -->
                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                    <h3 class="font-semibold text-gray-900 mb-4">Categories</h3>
                                    <div class="space-y-2">
                                        <button @click="selectCategory('')"
                                                :class="currentCategory === '' ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'"
                                                class="block w-full text-left py-1 transition-colors">
                                            All Categories
                                        </button>
                                        <template x-for="category in categories" :key="category.id">
                                            <button @click="selectCategory(category.slug || $store.router.encodeSlug(category.name))"
                                                    :class="currentCategory === (category.slug || $store.router.encodeSlug(category.name)) ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'"
                                                    class="block w-full text-left py-1 transition-colors flex items-center justify-between">
                                                <span x-text="category.name"></span>
                                                <span class="text-sm text-gray-400" x-text="category.productCount || ''"></span>
                                            </button>
                                        </template>
                                    </div>
                                </div>
                                
                                <!-- Brands Filter -->
                                <div x-show="brands.length > 0" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                    <h3 class="font-semibold text-gray-900 mb-4">Brands</h3>
                                    <div class="space-y-2">
                                        <button @click="selectBrand('')"
                                                :class="currentBrand === '' ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'"
                                                class="block w-full text-left py-1 transition-colors">
                                            All Brands
                                        </button>
                                        <template x-for="brand in brands" :key="brand">
                                            <button @click="selectBrand(brand)"
                                                    :class="currentBrand.toLowerCase() === brand.toLowerCase() ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'"
                                                    class="block w-full text-left py-1 transition-colors"
                                                    x-text="brand">
                                            </button>
                                        </template>
                                    </div>
                                </div>
                                
                                <!-- Price Range Filter -->
                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                    <h3 class="font-semibold text-gray-900 mb-4">Price Range</h3>
                                    <div class="space-y-2">
                                        <template x-for="range in priceRanges" :key="range.label">
                                            <button @click="selectPriceRange(range)"
                                                    :class="selectedPriceRange.min === range.min && selectedPriceRange.max === range.max ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'"
                                                    class="block w-full text-left py-1 transition-colors"
                                                    x-text="range.label">
                                            </button>
                                        </template>
                                    </div>
                                    
                                    <!-- Custom Price Range -->
                                    <div class="mt-4 pt-4 border-t border-gray-200">
                                        <div class="grid grid-cols-2 gap-2">
                                            <input type="number" 
                                                   x-model="selectedPriceRange.min"
                                                   @change="filterProducts()"
                                                   placeholder="Min"
                                                   class="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <input type="number" 
                                                   x-model="selectedPriceRange.max"
                                                   @change="filterProducts()"
                                                   placeholder="Max"
                                                   class="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Clear Filters -->
                                <button @click="clearFilters()"
                                        class="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors">
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                        
                        <!-- Main Content -->
                        <div class="lg:w-3/4">
                            <!-- Toolbar -->
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <!-- Results Info -->
                                    <div class="text-sm text-gray-600">
                                        Showing <span x-text="((currentPage - 1) * itemsPerPage) + 1"></span>-<span x-text="Math.min(currentPage * itemsPerPage, filteredProducts.length)"></span> 
                                        of <span x-text="filteredProducts.length"></span> products
                                    </div>
                                    
                                    <!-- Controls -->
                                    <div class="flex items-center gap-4">
                                        <!-- Sort -->
                                        <div class="flex items-center gap-2">
                                            <label class="text-sm text-gray-600">Sort by:</label>
                                            <select x-model="sortBy" @change="filterProducts()" 
                                                    class="px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                                <option value="name">Name</option>
                                                <option value="price">Price</option>
                                                <option value="rating">Rating</option>
                                                <option value="newest">Newest</option>
                                            </select>
                                            <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; filterProducts()"
                                                    class="p-1 text-gray-400 hover:text-gray-600">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                          :d="sortOrder === 'asc' ? 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' : 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'"/>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <!-- View Mode -->
                                        <div class="flex border border-gray-200 rounded overflow-hidden">
                                            <button @click="setViewMode('grid')"
                                                    :class="viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
                                                    class="p-2 transition-colors">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-grid"></use>
                                                </svg>
                                            </button>
                                            <button @click="setViewMode('list')"
                                                    :class="viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
                                                    class="p-2 transition-colors">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <use xlink:href="#icon-list"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Loading State -->
                            <div x-show="isLoading" class="text-center py-12">
                                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                <p class="mt-2 text-gray-600">Loading products...</p>
                            </div>
                            
                            <!-- Products Grid/List -->
                            <div x-show="!isLoading">
                                <!-- Grid View -->
                                <div x-show="viewMode === 'grid'" 
                                     class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <template x-for="product in paginatedProducts" :key="product.id">
                                        <div class="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
                                            <div class="relative aspect-square overflow-hidden">
                                                <img :src="product.image" 
                                                     :alt="product.name"
                                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                                                
                                                <!-- Quick Actions -->
                                                <div class="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button @click="toggleWishlist(product)"
                                                            :class="$store.wishlist.isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
                                                            class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-colors">
                                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <use :xlink:href="$store.wishlist.isInWishlist(product.id) ? '#icon-heart-filled' : '#icon-heart'"></use>
                                                        </svg>
                                                    </button>
                                                    <button @click="$store.ui.shareProduct(product)"
                                                            class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-green-500 transition-colors">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <use xlink:href="#icon-share"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                
                                                <!-- Product Badge -->
                                                <div x-show="product.badge" 
                                                     class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
                                                     x-text="product.badge">
                                                </div>
                                            </div>
                                            
                                            <div class="p-4">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-xs text-green-600 font-medium" x-text="product.category"></span>
                                                    <div class="flex items-center space-x-1">
                                                        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                            <use xlink:href="#icon-star-filled"></use>
                                                        </svg>
                                                        <span class="text-xs text-gray-600" x-text="product.rating || '4.5'"></span>
                                                    </div>
                                                </div>
                                                
                                                <h3 @click="viewProduct(product)" 
                                                    class="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors" 
                                                    x-text="product.name"></h3>
                                                
                                                <div class="flex items-center justify-between mb-3">
                                                    <span class="text-lg font-bold text-gray-900" x-text="$store.ui.formatPrice(product.price)"></span>
                                                    <span x-show="product.originalPrice" 
                                                          class="text-sm text-gray-500 line-through" 
                                                          x-text="$store.ui.formatPrice(product.originalPrice)"></span>
                                                </div>
                                                
                                                <div class="flex space-x-2">
                                                    <button @click="viewProduct(product)"
                                                            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded text-sm font-medium transition-colors">
                                                        View
                                                    </button>
                                                    <button @click="addToCart(product)"
                                                            class="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                
                                <!-- List View -->
                                <div x-show="viewMode === 'list'" class="space-y-4">
                                    <template x-for="product in paginatedProducts" :key="product.id">
                                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                            <div class="flex flex-col md:flex-row gap-6">
                                                <div class="md:w-48 aspect-square overflow-hidden rounded-lg bg-gray-100">
                                                    <img :src="product.image" 
                                                         :alt="product.name"
                                                         class="w-full h-full object-cover">
                                                </div>
                                                
                                                <div class="flex-1">
                                                    <div class="flex items-start justify-between mb-2">
                                                        <div>
                                                            <span class="text-sm text-green-600 font-medium" x-text="product.category"></span>
                                                            <h3 @click="viewProduct(product)" 
                                                                class="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors cursor-pointer" 
                                                                x-text="product.name"></h3>
                                                        </div>
                                                        <div class="flex items-center space-x-2">
                                                            <button @click="toggleWishlist(product)"
                                                                    :class="$store.wishlist.isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
                                                                    class="p-2 transition-colors">
                                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <use :xlink:href="$store.wishlist.isInWishlist(product.id) ? '#icon-heart-filled' : '#icon-heart'"></use>
                                                                </svg>
                                                            </button>
                                                            <button @click="$store.ui.shareProduct(product)"
                                                                    class="p-2 text-gray-400 hover:text-green-500 transition-colors">
                                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <use xlink:href="#icon-share"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <p class="text-gray-600 mb-4 line-clamp-2" x-text="product.description"></p>
                                                    
                                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                        <div class="flex items-center space-x-4">
                                                            <div class="flex items-center space-x-2">
                                                                <span class="text-2xl font-bold text-gray-900" x-text="$store.ui.formatPrice(product.price)"></span>
                                                                <span x-show="product.originalPrice" 
                                                                      class="text-lg text-gray-500 line-through" 
                                                                      x-text="$store.ui.formatPrice(product.originalPrice)"></span>
                                                            </div>
                                                            <div class="flex items-center space-x-1">
                                                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                                    <use xlink:href="#icon-star-filled"></use>
                                                                </svg>
                                                                <span class="text-sm text-gray-600" x-text="product.rating || '4.5'"></span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="flex space-x-3">
                                                            <button @click="viewProduct(product)"
                                                                    class="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors">
                                                                View Details
                                                            </button>
                                                            <button @click="addToCart(product)"
                                                                    class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                
                                <!-- No Products Found -->
                                <div x-show="filteredProducts.length === 0" class="text-center py-12">
                                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.892.764-5.291 2.01M6.211 3.89c.34-.34.815-.89 1.789-.89h8a2 2 0 011.789.89L19 5H5l1.211-1.11z"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                    <p class="text-gray-600 mb-6">Try adjusting your filters or search terms to find what you're looking for.</p>
                                    <button @click="clearFilters()"
                                            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Pagination -->
                            <div x-show="totalPages > 1" class="mt-8 flex justify-center">
                                <nav class="flex items-center space-x-2">
                                    <button @click="prevPage()" 
                                            :disabled="!hasPrevPage"
                                            :class="hasPrevPage ? 'text-gray-700 hover:text-green-600' : 'text-gray-400 cursor-not-allowed'"
                                            class="px-3 py-2 rounded-lg border border-gray-200 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-arrow-left"></use>
                                        </svg>
                                    </button>
                                    
                                    <template x-for="page in Array.from({length: totalPages}, (_, i) => i + 1)" :key="page">
                                        <button @click="goToPage(page)"
                                                :class="page === currentPage ? 'bg-green-600 text-white' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'"
                                                class="px-3 py-2 rounded-lg border border-gray-200 transition-colors"
                                                x-text="page">
                                        </button>
                                    </template>
                                    
                                    <button @click="nextPage()" 
                                            :disabled="!hasNextPage"
                                            :class="hasNextPage ? 'text-gray-700 hover:text-green-600' : 'text-gray-400 cursor-not-allowed'"
                                            class="px-3 py-2 rounded-lg border border-gray-200 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <use xlink:href="#icon-arrow-right"></use>
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }));
});
