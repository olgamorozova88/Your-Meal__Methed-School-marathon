const API_URL = 'https://classic-harsh-spider.glitch.me'
const PRODUCT_PREFIX = '/api/product'

const getDataByCategory = (success, category="burger") => {
  fetch(`${API_URL}${PRODUCT_PREFIX}?category=${category}`)
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(data => success(data))
  .catch(error => alert(error.message));
}

const getDataByID = (id, success) => {
  fetch(`${API_URL}${PRODUCT_PREFIX}/${id}`)
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(data => success(data))
  .catch(error => alert(error.message));
}

const getDataByIds = (ids, success) => {
  fetch(`${API_URL}${PRODUCT_PREFIX}/?list=${ids}`)
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(data => success(data))
  .catch(error => alert(error.message));
}

export { API_URL, PRODUCT_PREFIX, getDataByCategory, getDataByID, getDataByIds };