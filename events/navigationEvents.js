import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, showFaveAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { searchBooks } from '../api/mergedData';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale().then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks().then(showBooks);
  });

  document.querySelector('#logo').addEventListener('click', () => {
    getBooks().then(showBooks);
  });
  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    console.warn('clicked authors');
    getAuthors().then(showAuthors);
  });

  // TODO: Filter Fave authors
  document.querySelector('#fav-authors').addEventListener('click', () => {
    console.warn('clicked fave authors');
    showFaveAuthors().then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn('const searchValue', searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      searchBooks(searchValue).then(({ filteredBooks, filteredAuthors }) => {
        console.warn('searchValue', searchValue);
        if (filteredAuthors.length > 0 || filteredBooks.length > 0) {
          showBooks(filteredBooks, false);
          showAuthors(filteredAuthors, false);
        } else {
          clearDom();
          const domString = '<h1>No Results For You!</h1>';
          renderToDOM('#store', domString);
        }
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
