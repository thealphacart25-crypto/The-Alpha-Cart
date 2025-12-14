let cart = [];
let cartCount = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    updateCartUI();
}

function updateCartUI() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total;
}

function openCart() {
    document.getElementById("cart-popup").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

// Make functions global for onclick
window.addToCart = addToCart;
window.updateCartUI = updateCartUI;
window.openCart = openCart;
window.closeCart = closeCart;

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const suggestions = document.querySelector('.suggestions');
    const trending = ['Intelligent book'];

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        let matches = [];

        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                product.style.display = 'block';
                matches.push(product.querySelector('h3').textContent);
            } else {
                product.style.display = 'none';
            }
        });

        // Add trending if typing 'i'
        if (query === 'i') {
            matches = [...new Set([...matches, ...trending])];
        }

        // Show suggestions
        suggestions.innerHTML = '';
        if (query && matches.length > 0) {
            matches.forEach(match => {
                const div = document.createElement('div');
                div.textContent = match;
                div.addEventListener('click', () => {
                    searchInput.value = match;
                    suggestions.style.display = 'none';
                    // Filter to only this
                    products.forEach(p => {
                        if (p.querySelector('h3').textContent === match) {
                            p.style.display = 'block';
                        } else {
                            p.style.display = 'none';
                        }
                    });
                });
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    });

    // Hide suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.parentElement.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnPJxuaS3qYrlaE4S0CkXW41jFyzM8yL8",
  authDomain: "login-73e5d.firebaseapp.com",
  projectId: "login-73e5d",
  storageBucket: "login-73e5d.firebasestorage.app",
  messagingSenderId: "618183196302",
  appId: "1:618183196302:web:99724de0ab173e9f26d3df",
  measurementId: "G-WX4ZYTH3DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  'recaptcha-container',
  { size: 'normal' }
);
