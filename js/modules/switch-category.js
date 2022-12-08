import { getDataByCategory } from './api.js';
import { renderCards } from './cards.js';

const navigationList = document.querySelector('.navigation__list');
const navigationListItems = navigationList.querySelectorAll('.navigation__button');
const currentCategory = document.querySelector('.catalog__title');

const setActiveClass = (evt) => {
  const target = evt.target.closest('.navigation__button');
  if (!target) {
    return;
  }
  navigationListItems.forEach((item) => {
    if (item === target) {
      item.classList.add('navigation__button_active');
      currentCategory.textContent = item.textContent;
      const category = item.dataset.category;
      getDataByCategory(renderCards, category);
    } else {
      item.classList.remove('navigation__button_active');
    }
  })
}

const switchCategory = () => {
  navigationList.addEventListener('click', setActiveClass);
}

export { switchCategory };