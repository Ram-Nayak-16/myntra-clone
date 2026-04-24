document.addEventListener('DOMContentLoaded', () => {
    // Data for Categories (High Fidelity)
    const categories = [
        { name: "T-Shirts", discount: "40-80% OFF", image: "assets/cat_tshirt.png" },
        { name: "Sports Shoes", discount: "40-80% OFF", image: "assets/cat_shoes.png" },
        { name: "Shirts", discount: "40-80% OFF", image: "assets/cat_men.png" },
        { name: "Jeans", discount: "40-80% OFF", image: "assets/cat_jeans.png" },
        { name: "Kurtas & Sets", discount: "50-80% OFF", image: "assets/budget_kurtas.png" },
        { name: "Trousers", discount: "40-80% OFF", image: "assets/budget_trousers.png" },
        { name: "Electronics", discount: "MIN. 40% OFF", image: "assets/budget_watch.png" },
        { name: "Western Wear", discount: "UP TO 70% OFF", image: "assets/cat_women.png" }
    ];

    // Data for Budget Picks
    const budgetPicks = [
        { name: "Tailored Trousers", price: "799", image: "assets/budget_trousers.png" },
        { name: "Trendy Jeans", price: "999", image: "assets/cat_jeans.png" },
        { name: "Dapper Jackets", price: "499", image: "assets/cat_kids.png" }, 
        { name: "Charming Kurtas", price: "699", image: "assets/budget_kurtas.png" },
        { name: "Analog Watches", price: "1299", image: "assets/budget_watch.png" },
        { name: "Casual Sneakers", price: "999", image: "assets/cat_shoes.png" },
        { name: "Classic Shirts", price: "599", image: "assets/deal_shirt.png" },
        { name: "Dashing Kurta Sets", price: "999", image: "assets/cat_men.png" }
    ];

    // Data for Deals
    const deals = [
        { brand: "Roadster", name: "Men Cotton Solid Shirt", price: 599, original: 1299, discount: "54% OFF", image: "assets/deal_shirt.png" },
        { brand: "Fossil", name: "Premium Analog Watch", price: 4499, original: 8999, discount: "50% OFF", image: "assets/deal_watch.png" },
        { brand: "H&M", name: "Relaxed Fit Hoodie", price: 1499, original: 2299, discount: "35% OFF", image: "assets/hero1.png" },
        { brand: "Mast & Harbour", name: "Casual Sneakers", price: 999, original: 2499, discount: "60% OFF", image: "assets/hero2.png" }
    ];

    // Toast Helper
    const toast = document.getElementById('toast');
    const bagCount = document.getElementById('bag-count');
    let count = 0;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Populate Categories
    const categoryGrid = document.getElementById('category-grid');
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}">
            <div class="category-info">
                <h3>${cat.name}</h3>
                <span class="discount-text">${cat.discount}</span>
                <span class="shop-now">Shop Now</span>
            </div>
        `;
        card.addEventListener('click', () => showToast(`Opening ${cat.name} collection...`));
        categoryGrid.appendChild(card);
    });

    // Populate Budget Picks
    const budgetGrid = document.getElementById('budget-grid');
    budgetPicks.forEach(pick => {
        const card = document.createElement('div');
        card.className = 'budget-card';
        card.innerHTML = `
            <img src="${pick.image}" alt="${pick.name}">
            <div class="budget-info">
                <span class="budget-price">UNDER ₹${pick.price}</span>
                <span class="budget-name">${pick.name}</span>
            </div>
        `;
        card.addEventListener('click', () => showToast(`Picks for Under ₹${pick.price}`));
        budgetGrid.appendChild(card);
    });

    // Populate Deals
    const dealsGrid = document.getElementById('deals-grid');
    deals.forEach(deal => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${deal.image}" alt="${deal.name}">
            </div>
            <div class="product-info">
                <div class="brand-name">${deal.brand}</div>
                <div class="product-name">${deal.name}</div>
                <div class="price-container">
                    <span class="discounted-price">Rs. ${deal.price}</span>
                    <span class="original-price">Rs. ${deal.original}</span>
                    <span class="discount-tag">(${deal.discount})</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            count++;
            bagCount.textContent = count;
            showToast(`${deal.brand} product added to bag!`);
        });
        dealsGrid.appendChild(card);
    });

    // Header Interactivity
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => showToast(`Browsing ${item.textContent}...`));
    });

    document.getElementById('profile-btn').addEventListener('click', () => showToast("Opening Profile..."));
    document.getElementById('wishlist-btn').addEventListener('click', () => showToast("Opening Wishlist..."));
    document.getElementById('bag-btn').addEventListener('click', () => showToast(`Shopping Bag: ${count} items`));

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showToast(`Searching for "${searchInput.value}"...`);
            searchInput.value = '';
        }
    });

    // Hero Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentSlide = 0;

    // Initialize images
    document.getElementById('hero-banner-1').src = 'assets/hero1.png';
    document.getElementById('hero-banner-2').src = 'assets/hero2.png';
    document.getElementById('hero-banner-3').src = 'assets/cat_tshirt.png';

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-play
    let slideInterval = setInterval(goToNextSlide, 5000);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(goToNextSlide, 5000);
    }

    // Button Click handlers
    nextBtn.addEventListener('click', () => {
        goToNextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        resetInterval();
    });

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });
});
