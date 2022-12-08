import { API_URL } from './api.js';
import { showProductDetails } from './modal-product.js';
const productsList = document.querySelector('.catalog__list');

const createCard = (product) => {
  const item = document.createElement('li');
  item.classList.add('catalog__item');
  item.innerHTML = `
    <article class="product" id="${product.id}">
      <img class="product__image" src="${API_URL}/${product.image}" alt="${product.title}">

      <p class="product__price">${product.price}<span class="currency">₽</span></p>

      <h3 class="product__title">
        <button class="product__detail">${product.title}</button>
      </h3>

      <p class="product__weight">${product.weight}</p>

      <button class="product__add">Добавить</button>
  `
  return item;
}

const renderCards = (products) => {
  productsList.textContent = '';
  const cards = products.map((product) => createCard(product));
  productsList.append(...cards);
  productsList.addEventListener('click', showProductDetails);  
}

export { renderCards, productsList }

