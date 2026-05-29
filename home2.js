/* ════════════════════════════════
   PRODUCT DATA
════════════════════════════════ */
const products = [
    { id: 1, img: 'lehenga1.webp', title: 'Mahalaxmi', price: 3899, tags: ['lehenga'] },
    { id: 2, img: 'lehenga2.webp', title: 'Pink Embroidered Net Lehenga Choli', price: 3499, tags: ['lehenga'] },
    { id: 3, img: 'lehenga3', title: "Girl's Pearl Embroidery Lehenga Choli Set", price: 5999, tags: ['kids', 'lehenga'] },
    { id: 4, img: 'lehenga4', title: "Girl's Floral Printed Readymade Lehenga with Choli Set", price: 2899, tags: ['kids'] },
    { id: 5, img: 'lehenga5', title: "Girl's Floral Printed Readymade Lehenga with Choli Set", price: 3499, tags: ['kids'] },
    { id: 6, img: 'lehenga6', title: 'Bitiya by Bhama Girls Lime Green & Pink', price: 4799, tags: ['kids', 'party'] },
    { id: 7, img: 'lehenga7', title: 'Blue Faux Georgette Embroidered Kids Lehenga for Party', price: 3999, tags: ['kids', 'party'] },
    { id: 8, img: 'lehenga8', title: 'South Indian Style Kids Lehenga Choli', price: 4999, tags: ['kids', 'party'] },
    { id: 9, img: 'lehenga9', title: 'Ynf Soft Cotton Kids Lehenga', price: 2999, tags: ['kids'] },
    { id: 10, img: 'lehenga10', title: 'Designer Ikkat Kids Lehenga', price: 4599, tags: ['kids', 'lehenga'] },
];

let wishlistItems = []; // array of product ids

function productCardHTML(p) {
    const liked = wishlistItems.includes(p.id);
    return `
        <div class="product-box" data-id="${p.id}" data-tags="${p.tags.join(',')}">
            <i class="ri-heart-${liked ? 'fill' : 'line'} heart-btn ${liked ? 'liked' : ''}" onclick="toggleWishlist(${p.id})"></i>
            <div class="img-box"><img src="${p.img}" alt="${p.title}" height="350" width="300"></div>
            <h2 class="product-title">${p.title}</h2>
            <div class="price-cart">
                <span class="price">$${p.price.toLocaleString()}</span>
                <i class="ri-shopping-cart-2-line" onclick="addToCartById(${p.id})"></i>
            </div>
        </div>`;
}

function renderProducts(containerId, list) {
    document.getElementById(containerId).innerHTML = list.map(productCardHTML).join('');
}

renderProducts('home-products', products);
renderProducts('shop-products', products);

/* ════════════════════════════════
   PAGE ROUTING
════════════════════════════════ */
function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === name);
    });
    window.scrollTo(0, 0);
}

/* ════════════════════════════════
   HAMBURGER
════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
}

/* ════════════════════════════════
   SEARCH
════════════════════════════════ */
document.getElementById('search-input').addEventListener('input', filterSearch);
document.getElementById('mobile-search-input').addEventListener('input', (e) => {
    document.getElementById('search-input').value = e.target.value;
    filterSearch();
});
function filterSearch() {
    const q = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('.product-box').forEach(box => {
        box.style.display = box.querySelector('.product-title').textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

/* ════════════════════════════════
   SHOP PAGE FILTERS & SORT
════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyShopFilters();
    });
});
document.getElementById('sort-select').addEventListener('change', applyShopFilters);

function applyShopFilters() {
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const sort = document.getElementById('sort-select').value;
    let list = filter === 'all' ? [...products] : products.filter(p => p.tags.includes(filter));
    if (sort === 'low-high') list.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') list.sort((a, b) => b.price - a.price);
    renderProducts('shop-products', list);
    syncHeartIcons();
}

/* ════════════════════════════════
   CART
════════════════════════════════ */
const cartSidebar = document.querySelector('.cart-items');
const cartcontent = document.querySelector('.cart-content');
const cartCount = document.querySelector('.cart-item-count');

document.getElementById('cart-icon').addEventListener('click', () => cartSidebar.classList.add('active'));
document.querySelector('.close-cart').addEventListener('click', () => cartSidebar.classList.remove('active'));

function addToCartById(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    for (let box of cartcontent.querySelectorAll('.cart-box')) {
        if (box.dataset.id == id) {
            const qEl = box.querySelector('.number');
            qEl.textContent = parseInt(qEl.textContent) + 1;
            updateTotalPrice(); updateCartCount(); return;
        }
    }
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.dataset.id = id;
    cartBox.innerHTML = `
        <img src="${p.img}" alt="">
        <div class="cart-details">
            <h2 class="cart-product-title">${p.title}</h2>
            <span class="cart-price">$${p.price.toLocaleString()}</span>
            <div class="cart-quantity">
                <button class="decrement">−</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>`;
    cartcontent.append(cartBox);
    cartBox.querySelector('.cart-remove').addEventListener('click', () => {
        cartBox.style.opacity = '0'; cartBox.style.transition = 'opacity .3s';
        setTimeout(() => { cartBox.remove(); updateTotalPrice(); updateCartCount(); }, 300);
    });
    cartBox.querySelector('.cart-quantity').addEventListener('click', (e) => {
        const nEl = cartBox.querySelector('.number');
        let q = parseInt(nEl.textContent);
        if (e.target.classList.contains('decrement') && q > 1) q--;
        else if (e.target.classList.contains('increment')) q++;
        nEl.textContent = q;
        updateTotalPrice(); updateCartCount();
    });
    updateTotalPrice(); updateCartCount();
}

function updateTotalPrice() {
    let total = 0;
    cartcontent.querySelectorAll('.cart-box').forEach(box => {
        const price = parseFloat(box.querySelector('.cart-price').textContent.replace(/[$,]/g, ''));
        total += price * parseInt(box.querySelector('.number').textContent);
    });
    document.querySelector('.total-price').textContent = '$' + total.toFixed(2);
}

function updateCartCount() {
    let count = 0;
    cartcontent.querySelectorAll('.cart-box').forEach(box => {
        count += parseInt(box.querySelector('.number').textContent);
    });
    cartCount.textContent = count;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
}

/* ════════════════════════════════
   WISHLIST
════════════════════════════════ */
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const wishlistContent = document.getElementById('wishlist-content');
const wishlistCountEl = document.querySelector('.wishlist-count');

document.getElementById('wishlist-icon').addEventListener('click', () => wishlistSidebar.classList.add('active'));
document.getElementById('close-wishlist').addEventListener('click', () => wishlistSidebar.classList.remove('active'));

function toggleWishlist(id) {
    const idx = wishlistItems.indexOf(id);
    if (idx === -1) {
        wishlistItems.push(id);
    } else {
        wishlistItems.splice(idx, 1);
    }
    // Re-render all product grids so heart icons always reflect current state
    syncHeartIcons();
    renderWishlist();
}

function syncHeartIcons() {
    document.querySelectorAll('.product-box[data-id]').forEach(box => {
        const id = parseInt(box.dataset.id);
        const btn = box.querySelector('.heart-btn');
        if (!btn) return;
        const liked = wishlistItems.includes(id);
        btn.classList.toggle('liked', liked);
        btn.classList.remove('ri-heart-line', 'ri-heart-fill');
        btn.classList.add(liked ? 'ri-heart-fill' : 'ri-heart-line');
    });
}

function renderWishlist() {
    wishlistCountEl.textContent = wishlistItems.length;
    if (wishlistItems.length === 0) {
        wishlistContent.innerHTML = `<div class="wishlist-empty"><i class="ri-heart-line"></i><p>Your wishlist is empty.<br>Tap the heart on any product!</p></div>`;
        return;
    }
    wishlistContent.innerHTML = wishlistItems.map(id => {
        const p = products.find(x => x.id === id);
        return `
        <div class="wishlist-box" id="wbox-${id}">
            <img src="${p.img}" alt="${p.title}">
            <div class="wishlist-details">
                <h2 class="wishlist-product-title">${p.title}</h2>
                <span class="wishlist-price">$${p.price.toLocaleString()}</span>
                <div class="wishlist-actions">
                    <button class="btn-move-cart" onclick="moveToCart(${id})">Add to Cart</button>
                </div>
            </div>
            <i class="ri-delete-bin-line wishlist-remove" onclick="removeWishlist(${id})"></i>
        </div>`;
    }).join('');
}

function removeWishlist(id) {
    wishlistItems = wishlistItems.filter(x => x !== id);
    syncHeartIcons();
    wishlistCountEl.textContent = wishlistItems.length;
    renderWishlist();
}

function moveToCart(id) {
    addToCartById(id);
    removeWishlist(id);
    wishlistSidebar.classList.remove('active');
    cartSidebar.classList.add('active');
}

/* ════════════════════════════════
   CHECKOUT
════════════════════════════════ */
const modal = document.querySelector('.checkout-modal');
const billDetails = document.querySelector('.bill-details');

document.querySelector('.btn-buy').addEventListener('click', () => {
    const boxes = cartcontent.querySelectorAll('.cart-box');
    if (!boxes.length) { alert('Your cart is empty!'); return; }
    let total = 0, html = '';
    boxes.forEach(box => {
        const t = box.querySelector('.cart-product-title').textContent;
        const p = parseFloat(box.querySelector('.cart-price').textContent.replace(/[$,]/g, ''));
        const q = parseInt(box.querySelector('.number').textContent);
        const sub = p * q;
        total += sub;
        html += `<p><span>${t} ×${q}</span><span>$${sub.toFixed(2)}</span></p>`;
    });
    html += `<hr style="margin:10px 0"><p><strong>Total</strong><strong>$${total.toFixed(2)}</strong></p>`;
    billDetails.innerHTML = html;
    new QRious({ element: document.getElementById('qr-code'), value: 'PAY $' + total.toFixed(2), size: 200 });
    modal.classList.add('active');
});
document.querySelector('.close-checkout').addEventListener('click', () => modal.classList.remove('active'));

/* ════════════════════════════════
   CONTACT FORM
════════════════════════════════ */
function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const femail = document.getElementById('femail').value.trim();
    const fmessage = document.getElementById('fmessage').value.trim();
    if (!fname || !femail || !fmessage) { alert('Please fill in Name, Email and Message.'); return; }
    document.getElementById('form-success').style.display = 'block';
    ['fname', 'lname', 'femail', 'fphone', 'fmessage'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fsubject').value = '';
    setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
}

