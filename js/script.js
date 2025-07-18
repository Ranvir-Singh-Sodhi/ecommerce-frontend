function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "electronics";
}

function renderProducts(filtered = products) {
    const category = getCategoryFromURL();
    const container = document.getElementById("product-grid");
    container.innerHTML = "";

    const categoryProducts = filtered.filter(p => p.category === category);

    if (categoryProducts.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    categoryProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
  <img src="${product.image}" alt="${product.name}" />
  <h3>${product.name}</h3>
  <p>₹${product.price}</p>
  <button onclick="addToCart(${product.id})">Add to Cart</button>
`;

        container.appendChild(card);
    });
}

function filterProducts() {
    const selected = document.getElementById("priceRange").value;
    let filtered = products;

    if (selected !== "all") {
        const [min, max] = selected.split("-").map(Number);
        filtered = products.filter(p => p.price >= min && p.price <= max);
    }

    renderProducts(filtered);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}


window.onload = () => {
    renderProducts();
};
