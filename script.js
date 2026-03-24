const WA_NUMBER = "6281234567890";

function createProductCard(product) {
  const waMessage = encodeURIComponent(
    `Halo, saya tertarik dengan ${product.name} ${product.year}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return `
    <div class="product-card">
      <div class="product-img">
        <img src="${product.image}"/>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <h4>${product.name} ${product.year}</h4>
        <div class="product-meta">  
          <span>${product.km} km</span>
          <span>•</span>
          <span>${product.transmission}</span>
        </div>
        <div class="product-footer">
          <span class="product-price">Rp ${product.price} jt</span>
          <a href="${waLink}" target="_blank" class="btn-wa">Tanya WA</a>
        </div>
      </div>
    </div>
  `;
}

function renderProducts() {
  const grid = document.querySelector(".product-grid");

  if (!grid) return;

  grid.innerHTML = products.map(createProductCard).join("");
}

document.addEventListener("DOMContentLoaded", renderProducts);
