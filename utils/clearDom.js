const clearDom = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#book-store').innerHTML = '';
  document.querySelector('#search-store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#results').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#view').innerHTML = '';
};

export default clearDom;
