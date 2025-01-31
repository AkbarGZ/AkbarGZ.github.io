document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const modal = document.getElementById('product-modal');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');

    
  function generateRipple(button, e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
      
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
      
      
        // Trigger reflow to re-run the animation
      void button.offsetWidth;
    }

    function createProductButton(product) {
        const button = document.createElement('button');
        button.classList.add('product-button');
      
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.produk;
      
        const name = document.createElement('span');
        name.textContent = product.produk.toUpperCase();
      
        button.appendChild(img);
        button.appendChild(name);
        button.addEventListener('click', (e) => {
           
            generateRipple(button, e)
            showProductDetails(product);
        });
        return button;
    }

    function showProductDetails(product) {
        modalDetails.innerHTML = `
             <img src="${product.image}" alt="${product.produk}">
            <h2>${product.produk.toUpperCase()}</h2>
            <p>Deskripsi: <br>${product.deskripsi}</p>
            <ul>
                ${Object.entries(product.kategori).map(([key, value]) => `<li>${key} : ${value}</li>`).join('')}
            </ul>
            <div class="button-container">
                <a href="https://wa.me/6281906903200?text=Halo Min Saya Mau Order ${encodeURIComponent(product.produk)}" class="buy-button">BUY</a>
                <a href="https://wa.me/6281906903200?text=Halo Min Saya Ingin Meminta Via Pembayaran" class="payment-button">PAYMENT</a>
            </div>
        `;
         modal.style.display = "flex";
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
          const productButton = createProductButton(product);
          productsContainer.appendChild(productButton);
        });
    })
    .catch(error => console.error("Gagal memuat data produk:", error));

});