import { getCart, clearCart } from './cart.js';

const modalDelivery = document.querySelector('.modal_delivery');
const orderForm = modalDelivery.querySelector('.modal-delivery__form');

const onDeliveryFormatChange = () => {
  if (orderForm.format.value === 'pickup') {
    orderForm['delivery-address'].classList.add('modal-delivery__fieldset-input_hidden');
  } else {
    orderForm['delivery-address'].classList.remove('modal-delivery__fieldset-input_hidden');
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(orderForm);
  const deliveryFormat = formData.get('format');
  if ( deliveryFormat === 'pickup') {
    formData.delete('street');
    formData.delete('floor');
    formData.delete('intercom');
  }
  const deliveryDetails = Object.fromEntries(formData)
  deliveryDetails.order = getCart();
  fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(deliveryDetails),
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    orderForm.reset();
    onDeliveryFormatChange();
    clearCart();
    closeModalDelivery();
  });
}

const closeModalDelivery = () => {
  modalDelivery.classList.remove('modal_open');
  orderForm.removeEventListener('submit', onFormSubmit);
  orderForm.removeEventListener('change', onDeliveryFormatChange);
}

const orderController = () => {
  orderForm.addEventListener('submit', onFormSubmit);
  orderForm.addEventListener('change', onDeliveryFormatChange);
}



export { orderController };