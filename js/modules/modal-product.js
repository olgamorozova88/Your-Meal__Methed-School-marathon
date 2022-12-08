import { API_URL, getDataByID } from './api.js';

const productModal = document.querySelector('.modal_product');
const modalAddToCartBtn = productModal.querySelector('.modal-product__btn');
const productTitle = productModal.querySelector('.modal-product__title');
const productImage = productModal.querySelector('.modal-product__image');
const productDescription = productModal.querySelector('.modal-product__description');
const productIngredients = productModal.querySelector('.ingredients__list');
const productNutritionValue = productModal.querySelector('.ingredients__calories');
const productPrice = productModal.querySelector('.modal-product__price-count');
const modalCountAmount = productModal.querySelector('.count__amount');

const renderIngredients = (product) => {
  productIngredients.textContent = '';
  const ingredients = product.ingredients.map((ingredient) => {
    const item = document.createElement('li');
    item.classList.add('ingredients__item');
    item.textContent = ingredient;
    return item;
  })
  productIngredients.append(...ingredients);
}

const renderProductDetails = (product) => {
  productTitle.textContent = product.title;
  productImage.src = `${API_URL}/${product.image}`;
  productDescription.textContent = product.description;
  productNutritionValue.textContent = `${product.weight}г, ${product.calories}Ккал`;
  productPrice.textContent = product.price;
  renderIngredients(product);
}

const changeProductCount = (evt) => {
  const target = evt.target;
  if (target.closest('.count__minus')) {
    if (modalCountAmount.textContent === '1') {
      return;
    }
    modalCountAmount.textContent--;
  }
  if (target.closest('.count__plus')) {
    modalCountAmount.textContent++;
  }
}

const onClickProductModalClose = (evt) => {
  const target = evt.target;
  if (target.closest('.modal__close') || target === productModal) {
    productModal.classList.remove('modal_open');
    productModal.removeEventListener('click', onClickProductModalClose);
    productModal.removeEventListener('click', changeProductCount);
    document.removeEventListener('keydown', onEscKeyPress);
  }
}

const onEscKeyPress = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    productModal.classList.remove('modal_open');
    productModal.removeEventListener('click', onClickProductModalClose);
    productModal.removeEventListener('click', changeProductCount);
    document.removeEventListener('keydown', onEscKeyPress);
  }
}

const showProductDetails = (evt) => {
  const target = evt.target;
  if (target.closest('.product__detail') || target.closest('.product__image')) {
    const id = target.closest('.product').id;
    getDataByID(id, renderProductDetails);
    modalAddToCartBtn.dataset.productId = id;
    productModal.addEventListener('click', onClickProductModalClose);
    productModal.addEventListener('click', changeProductCount);
    document.addEventListener('keydown', onEscKeyPress);
    productModal.classList.add('modal_open');
  }
}

export { showProductDetails, productModal, modalAddToCartBtn, modalCountAmount };