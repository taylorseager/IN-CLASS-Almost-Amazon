import { signOut } from '../utils/auth';
import { getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, showBooksOnSale, showFaveAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { searchBooks } from '../api/mergedData';
import renderToDOM from '../utils/renderToDom';
import { showResults } from '../pages/searchResults';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    showBooksOnSale(uid).then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });

  document.querySelector('#logo').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });
  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then(showAuthors);
  });

  // TODO: Filter Fave authors
  document.querySelector('#fav-authors').addEventListener('click', () => {
    showFaveAuthors(uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      searchBooks(uid, searchValue).then(({ filteredBooks, filteredAuthors }) => {
        if (filteredBooks.length > 0 || filteredAuthors.length > 0) {
          showResults(filteredAuthors, filteredBooks);
        } else {
          const domString = '<h1>No Results For You!</h1>';
          renderToDOM('#store', domString);
        }
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
