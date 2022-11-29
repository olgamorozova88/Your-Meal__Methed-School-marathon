const productsList = document.querySelector('.catalog__list');
const productModal = document.querySelector('.modal_product');
const productTitle = productModal.querySelector('.modal-product__title');
const productImage = productModal.querySelector('.modal-product__image');
const productDescription = productModal.querySelector('.modal-product__description');
const productIngredients = productModal.querySelector('.ingredients__list');
const productNutritionValue = productModal.querySelector('.ingredients__calories');
const productPrice = productModal.querySelector('.modal-product__price-count');

console.log(productTitle)

const product = {
  name: 'Самый вкусный бургер',
  description: 'Самый вкусный бургер, который вы когда-либо пробовали. Сочная мясная котлета сыр, овощи и соус на пшеничной булочке',
  ingredients: [
    'Пшеничная булочка',
    'Котлета из мраморной говядины',
    'Сыр "Чеддер"',
    'Помидоры',
    'Маринованный огурец',
    'Лук',
    'Листья салата',
    'Фирменный соус'
  ],
  weight: 550,
  price: 650,
  calories: 600,
  image: 'img/burger1.jpg',
}

const renderIngredients = () => {
  productIngredients.textContent = '';
  const ingredients = product.ingredients.map((ingredient) => {
    const item = document.createElement('li');
    item.classList.add('ingredients__item');
    item.textContent = ingredient;
    return item;
  })
  productIngredients.append(...ingredients);
}

const renderProductDetails = () => {
  productTitle.textContent = product.name;
  productImage.src = product.image;
  productDescription.textContent = product.description;
  productNutritionValue.textContent = `${product.weight}г, ${product.calories}Ккал`;
  productPrice.textContent = product.price;
  renderIngredients();
}

const onClickProductModalClose = (evt) => {
  const target = evt.target;
  if (target.closest('.modal__close') || target === productModal) {
  productModal.classList.remove('modal_open');
  }
}

const onEscKeyPress = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    productModal.classList.remove('modal_open');
  }
}

const showProductDetails = (evt) => {
  const target = evt.target;
  if (target.closest('.product__detail') || target.closest('.product__image')) {
    productModal.classList.add('modal_open');
    renderProductDetails();
    productModal.addEventListener('click', onClickProductModalClose, {once: true});
    document.addEventListener('keydown', onEscKeyPress, {once: true});
  }
}

productsList.addEventListener('click', showProductDetails);