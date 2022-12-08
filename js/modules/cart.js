import { modalAddToCartBtn, modalCountAmount } from './modal-product.js';
import { productsList } from './cards.js';
import { API_URL, getDataByIds } from './api.js';
import { orderController } from './order-submit.js';

const orderCount = document.querySelector('.order__count');
const orderList = document.querySelector('.order__list');
const orderTotalSum = document.querySelector('.order__total-amount');
const orderBtn = document.querySelector('.order__submit');
const order = document.querySelector('.order');
const orderTitle = order.querySelector('.order__wrap-title');
const modalDelivery = document.querySelector('.modal_delivery');

const getCart = () => {
  const cartList = localStorage.getItem('cart-list');
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
}

const renderCartDetails = (data) => {
  const cartList = getCart();
  const productCount = cartList.reduce((acc, item) => {
    return acc + item.count;
  }, 0);
  orderCount.textContent = productCount;
  const cartItems = data.map((item) => {
    const li = document.createElement('li');
    li.classList.add('order__item');
    li.dataset.productId = item.id;
    const product = cartList.find((cartItem) => {
      return cartItem.id === item.id;
    });
    li.innerHTML = `
      <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image" data-id-product>
      <div class="order__product">
        <h3 class="order__product-title">${item.title}</h3>
        <p class="order__product-weight">${item.weight}г</p>
        <p class="order__product-price">${item.price}₽</p>
      </div>
      <div class="order__product-count count">
        <button class="count__minus" data-id-product=${product.id}>-</button>
        <p class="count__amount">${product.count}</p>
        <button class="count__plus" data-id-product=${product.id}>+</button>
      </div>`;
      return li;
  });
  orderList.textContent = '';
  orderList.append(...cartItems);
  const totalSum = data.reduce((acc, item) => {
    const product = cartList.find((cartItem) => {
      return cartItem.id === item.id;
    });
    return acc + (item.price * product.count);
  }, 0);
  orderTotalSum.textContent = totalSum;
}

orderList.addEventListener('click', (evt) => {
  const targetPlus = evt.target.closest('.count__plus');
  const targetMinus = evt.target.closest('.count__minus');
  if (targetMinus) {
    removeFromCart(targetMinus.dataset.idProduct);
  }
  if (targetPlus) {
    addToCart(targetPlus.dataset.idProduct)
  }
})

const renderCart = () => {
  const cartList = getCart();
  const allProductIds = cartList.map((item) => {
    return item.id;
  });
  orderBtn.disabled = !cartList.length;
  if (cartList.length) {
    getDataByIds(allProductIds, renderCartDetails);
  } else {
    orderList.textContent = '';
    orderTotalSum.textContent = 0;
    orderCount.textContent = 0;
  }
}

const updateCart = (cartList) => {
  localStorage.setItem('cart-list', JSON.stringify(cartList));
  renderCart();
}

const addToCart = (id, count = 1) => {
  const cartList = getCart();
  const product = cartList.find((item) => {
    return item.id === id;
  });
  if (product) {
    product.count += count;
  } else {
    cartList.push({id, count})
  }
  updateCart(cartList);
}

const removeFromCart = (id) => {
  const cartList = getCart();
  const productIndex = cartList.findIndex((item) => {
    return item.id === id;
  });
  cartList[productIndex].count -= 1;
  if (cartList[productIndex].count === 0) {
    cartList.splice(productIndex, 1);
  } 
  updateCart(cartList);
}

const clearCart = () => {
  localStorage.removeItem('cart-list');
  renderCart();
}

const onClickProductModalClose = (evt) => {
  const target = evt.target;
  if (target.closest('.modal__close') || target === modalDelivery) {
    modalDelivery.classList.remove('modal_open');
    modalDelivery.removeEventListener('click', onClickProductModalClose);
    document.removeEventListener('keydown', onEscKeyPress);
  }
}

const onEscKeyPress = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    modalDelivery.classList.remove('modal_open');
    modalDelivery.removeEventListener('click', onClickProductModalClose);
    document.removeEventListener('keydown', onEscKeyPress);
  }
}

const cartController = () => {
  productsList.addEventListener('click', (evt) => {
    const target = evt.target;
    const productId = target.closest('.product').id;
    if (target.closest('.product__add')) {
      addToCart(productId);
    }
  });

  modalAddToCartBtn.addEventListener('click', (evt) => {
    const productId = evt.currentTarget.dataset.productId;
    const productAmount = parseInt(modalCountAmount.textContent);
    addToCart(productId, productAmount);
  })

  orderTitle.addEventListener('click', () => {
    order.classList.toggle('order_open');
  })

  orderBtn.addEventListener('click', () => {
    modalDelivery.classList.add('modal_open');
    modalDelivery.addEventListener('click', onClickProductModalClose);
    document.addEventListener('keydown', onEscKeyPress);
    orderController();
  })
}

export { renderCart, cartController, modalCountAmount,getCart, clearCart }