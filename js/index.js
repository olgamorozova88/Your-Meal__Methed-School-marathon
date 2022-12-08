import { getDataByCategory } from './modules/api.js';
import { renderCards } from './modules/cards.js'
import { switchCategory } from './modules/switch-category.js';
import { cartController, renderCart } from './modules/cart.js';


getDataByCategory(renderCards);
switchCategory();
cartController();
renderCart();