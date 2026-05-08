const productList =
document.getElementById("product-list");

const storeList =
document.getElementById("store-list");

const modal =
document.getElementById("productModal");

const paymentList =
document.getElementById("paymentList");

let selectedProduct = null;

/* =========================
   RENDER PAYMENT METHODS
========================= */

function renderPayments(){

  paymentList.innerHTML = "";

  payments.forEach(method => {

    paymentList.innerHTML += `

      <label class="payment-item">

        <input
          type="radio"
          name="payment"
          value="${method.name}"
        >

        <div class="payment-info">

          <div class="payment-top">

            <i class="${method.icon}"></i>

            <span>
              ${method.name}
            </span>

          </div>

          ${
            method.image ?

            `

            <img
              src="${method.image}"
              alt="${method.name}"
              class="qris-image"
            >

            `

            :

            `

            <div class="payment-detail">

              <div class="payment-number">
                ${method.number}
              </div>

              <small>
                A/N ${method.owner}
              </small>

            </div>

            `
          }

        </div>

      </label>

    `;

  });

}

/* =========================
   CREATE PRODUCT CARD
========================= */

function createCard(product, target){

  target.innerHTML += `

    <div class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">

        <div class="badge">
          ${product.badge}
        </div>

        <div class="product-title">
          ${product.name}
        </div>

        <div class="product-desc">
          ${product.desc}
        </div>

        <div class="product-price">
          ${product.price}
        </div>

        <button
          class="detail-btn"
          onclick='openModal(${JSON.stringify(product)})'
        >
          Lihat Detail
        </button>

      </div>

    </div>

  `;

}

/* =========================
   RENDER PRODUCTS
========================= */

digitalProducts.forEach(product => {

  createCard(
    product,
    productList
  );

});

storeProducts.forEach(product => {

  createCard(
    product,
    storeList
  );

});

/* =========================
   OPEN MODAL
========================= */

function openModal(product){

  selectedProduct = product;

  modal.classList.remove("hidden");

  document.body.style.overflow =
  "hidden";

  document.getElementById("modalImage").src =
  product.image;

  document.getElementById("modalTitle").innerText =
  product.name;

  document.getElementById("modalDesc").innerText =
  product.desc;

  document.getElementById("modalPrice").innerText =
  product.price;

  // render payment
  renderPayments();

}

/* =========================
   CLOSE MODAL
========================= */

function closeModal(){

  modal.classList.add("hidden");

  document.body.style.overflow =
  "auto";

}

/* =========================
   BUY PRODUCT
========================= */

function buyNow(){

  const payment =
  document.querySelector(
    'input[name="payment"]:checked'
  );

  if(!payment){

    alert(
      "Pilih metode pembayaran terlebih dahulu"
    );

    return;
  }

  const selectedMethod =
  payments.find(
    item => item.name === payment.value
  );

  let paymentInfo = "";

  if(selectedMethod.image){

    paymentInfo =
    `Scan QRIS yang tersedia`;

  }else{

    paymentInfo =
`${selectedMethod.number}
A/N ${selectedMethod.owner}`;

  }

  const message =
`Halo admin 👋

Saya ingin membeli produk berikut:

━━━━━━━━━━━━━━━
🛒 Produk : ${selectedProduct.name}
💰 Harga : ${selectedProduct.price}
💳 Payment : ${payment.value}

📌 Tujuan Pembayaran:
${paymentInfo}
━━━━━━━━━━━━━━━

Mohon diproses ya admin 🙌`;

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

}

/* =========================
   CLOSE MODAL OUTSIDE CLICK
========================= */

window.onclick = function(event){

  if(event.target == modal){

    closeModal();

  }

}

/* =========================
   SCROLL TO PRODUCTS
========================= */

function scrollToProducts(){

  document
  .getElementById("products")
  .scrollIntoView({
    behavior:"smooth"
  });

}

/* =========================
   ESC CLOSE MODAL
========================= */

document.addEventListener(
  "keydown",
  function(event){

    if(event.key === "Escape"){

      closeModal();

    }

  }
);
