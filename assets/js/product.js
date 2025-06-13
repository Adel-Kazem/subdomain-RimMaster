// Product Pages Management
class ProductManager {
    constructor() {
        this.currentProduct = null;
        this.currentCategory = null;
        this.searchQuery = '';
    }

    setCurrentProduct(product) {
        this.currentProduct = product;
    }

    getCurrentProduct() {
        return this.currentProduct;
    }
}

// Initialize product manager
window.productManager = new ProductManager();

// Product List Page Loader
window.loadProductListPage = function() {
    document.getElementById('app').innerHTML = `
        <div class="products-page" x-data="productListPage()">
            <div class="page-header">
                <h1>Our Products</h1>
                <div class="filters-section">
                    <div class="search-box">
                        <input type="text" x-model="searchQuery" @input="filterProducts()" placeholder="Search products..." class="search-input">
                    </div>
                    <div class="category-filters">
                        <button @click="filterByCategory('')" :class="selectedCategory === '' ? 'active' : ''" class="filter-btn">All</button>
                        <template x-for="category in categories" :key="category">
                            <button @click="filterByCategory(category)" :class="selectedCategory === category ? 'active' : ''" class="filter-btn" x-text="category"></button>
                        </template>
                    </div>
                </div>
            </div>
            
            <div x-show="loading" class="loading">Loading products...</div>
            
            <div x-show="!loading && filteredProducts.length === 0" class="no-products">
                <p>No products found matching your criteria.</p>
            </div>
            
            <div x-show="!loading && filteredProducts.length > 0" class="products-grid">
                <template x-for="product in filteredProducts" :key="product.id">
                    <div class="product-card">
                        <div class="product-image-container">
                            <img :src="product.image" :alt="product.name" class="product-image">
                            <div x-show="!product.inStock" class="out-of-stock-badge">Out of Stock</div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-name" x-text="product.name"></h3>
                            <p class="product-category" x-text="product.category"></p>
                            <p class="product-price">$<span x-text="product.price"></span></p>
                            <div class="product-actions">
                                <a :href="'#/products/' + product.slug" class="btn btn-primary">View Details</a>
                                <button @click="addToCart(product.id)" :disabled="!product.inStock" class="btn btn-secondary">
                                    <span x-show="product.inStock">Add to Cart</span>
                                    <span x-show="!product.inStock">Out of Stock</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    `;

    // Re-initialize Alpine.js for the new content
    Alpine.initTree(document.getElementById('app'));
}

// Product Detail Page Loader
window.loadProductDetailPage = function(slug) {
    const product = window.storeManager.getProductBySlug(slug);

    if (!product) {
        document.getElementById('app').innerHTML = `
            <div class="product-not-found">
                <h1>Product Not Found</h1>
                <p>The product you're looking for doesn't exist.</p>
                <a href="#/products" class="btn btn-primary">Back to Products</a>
            </div>
        `;
        return;
    }

    window.productManager.setCurrentProduct(product);

    document.getElementById('app').innerHTML = `
        <div class="product-detail-page" x-data="productDetailPage()">
            <div class="breadcrumb">
                <a href="#/">Home</a> > 
                <a href="#/products">Products</a> > 
                <span x-text="product.name"></span>
            </div>
            
            <div class="product-detail">
                <div class="product-images">
                    <img :src="product.image" :alt="product.name" class="main-image">
                </div>
                
                <div class="product-information">
                    <h1 x-text="product.name" class="product-title"></h1>
                    <p class="product-category">Category: <span x-text="product.category"></span></p>
                    <p class="product-price">$<span x-text="product.price"></span></p>
                    
                    <div class="stock-info">
                        <span x-show="product.inStock" class="in-stock">In Stock (<span x-text="product.stock"></span> available)</span>
                        <span x-show="!product.inStock" class="out-of-stock">Out of Stock</span>
                    </div>
                    
                    <div class="product-description">
                        <h3>Description</h3>
                        <p x-text="product.description"></p>
                    </div>
                    
                    <div class="purchase-section">
                        <div class="quantity-selector">
                            <label for="quantity">Quantity:</label>
                            <div class="quantity-controls">
                                <button @click="decreaseQuantity()" :disabled="quantity <= 1" class="btn btn-sm">-</button>
                                <input type="number" id="quantity" x-model="quantity" min="1" :max="product.stock" class="quantity-input">
                                <button @click="increaseQuantity()" :disabled="quantity >= product.stock" class="btn btn-sm">+</button>
                            </div>
                        </div>
                        
                        <div class="action-buttons">
                            <button @click="addToCart()" :disabled="!product.inStock" class="btn btn-primary btn-large">
                                <span x-show="product.inStock">Add to Cart</span>
                                <span x-show="!product.inStock">Out of Stock</span>
                            </button>
                            <button @click="buyNow()" :disabled="!product.inStock" class="btn btn-secondary btn-large">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="related-products" x-show="relatedProducts.length > 0">
                <h2>Related Products</h2>
                <div class="products-grid">
                    <template x-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
                        <div class="product-card">
                            <img :src="relatedProduct.image" :alt="relatedProduct.name" class="product-image">
                            <h3 x-text="relatedProduct.name"></h3>
                            <p class="price">$<span x-text="relatedProduct.price"></span></p>
                            <a :href="'#/products/' + relatedProduct.slug" class="btn btn-primary">View Details</a>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;

    // Re-initialize Alpine.js for the new content
    Alpine.initTree(document.getElementById('app'));
}

// Alpine.js data for product list page
window.productListPage = function() {
    return {
        loading: true,
        products: [],
        filteredProducts: [],
        categories: [],
        selectedCategory: '',
        searchQuery: '',

        async init() {
            await window.storeManager.init();
            this.products = window.storeManager.getAllProducts();
            this.categories = window.storeManager.getCategories();
            this.filteredProducts = this.products;
            this.loading = false;
        },

        filterProducts() {
            let filtered = this.products;

            // Filter by category
            if (this.selectedCategory) {
                filtered = filtered.filter(p => p.category === this.selectedCategory);
            }

            // Filter by search query
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );
            }

            this.filteredProducts = filtered;
        },

        filterByCategory(category) {
            this.selectedCategory = category;
            this.filterProducts();
        },

        addToCart(productId) {
            const success = window.cartManager.addItem(productId, 1);
            if (success) {
                alert('Product added to cart!');
            }
        }
    }
}

// Alpine.js data for product detail page
window.productDetailPage = function() {
    return {
        product: null,
        quantity: 1,
        relatedProducts: [],

        init() {
            this.product = window.productManager.getCurrentProduct();
            if (this.product) {
                this.loadRelatedProducts();
            }
        },

        loadRelatedProducts() {
            // Get products from same category, excluding current product
            this.relatedProducts = window.storeManager
                .getProductsByCategory(this.product.category)
                .filter(p => p.id !== this.product.id)
                .slice(0, 4);
        },

        increaseQuantity() {
            if (this.quantity < this.product.stock) {
                this.quantity++;
            }
        },

        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        addToCart() {
            const success = window.cartManager.addItem(this.product.id, this.quantity);
            if (success) {
                alert(`${this.quantity} ${this.product.name}(s) added to cart!`);
            }
        },

        buyNow() {
            this.addToCart();
            // Navigate to cart
            window.location.hash = '#/cart';
        }
    }
}
