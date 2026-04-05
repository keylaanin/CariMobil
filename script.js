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

// Fitur Kirim Email
const contactForm = document.getElementById('contact-form');
const btnSubmit = document.getElementById('btn-submit');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Ubah teks tombol saat loading
    btnSubmit.innerText = 'Mengirim...';
    btnSubmit.disabled = true;

    emailjs.sendForm('service_9l1p7h8', 'template_dmsr96u', this)
      .then(function() {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan berhasil terkirim! Kami akan segera menghubungi Anda.',
          icon: 'success',
          confirmButtonText: 'Oke',
          confirmButtonColor: '#ff6b00' // Sesuaikan dengan warna brand CariMobil
        });

        contactForm.reset();
        btnSubmit.innerText = 'Kirim Pesan';
        btnSubmit.disabled = false;
      }, function(error) {
        Swal.fire({
          title: 'Gagal!',
          text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi'
        });

        console.log('FAILED...', error);
        btnSubmit.innerText = 'Kirim Pesan';
        btnSubmit.disabled = false;
      });
  });
}