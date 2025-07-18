function loadCart() {
  const container = document.getElementById("cart-container");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price} x 
          <input type="number" min="1" value="${item.quantity}" 
                 onchange="updateQuantity(${index}, this.value)">
          = ₹${item.price * item.quantity}
        </p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalDisplay.textContent = `Total: ₹${total}`;
}

function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;


function buyItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Purchase Successful! Thank you for shopping.");
  localStorage.removeItem('cart');
  loadCart(); // refresh the cart UI
}
