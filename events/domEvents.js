import { getAuthors, getSingleAuthor } from '../api/authorData';
import { getBooks, deleteBook, getSingleBook } from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks } from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuthor';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) { // checks if the div in line 12 contains 'delete-book'
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this amazing book?')) { // creates popup to double check if user wants to confirm action
        const [, firebaseKey] = e.target.id.split('--'); // -- is destructuring; only want to focus on firebaseKey in the array, we dont care about what comes before

        deleteBook(firebaseKey).then(() => { // passes firebaseKey into deletebook function
          getBooks(uid).then(showBooks); // calls getBooks based on uid; then renders showBooks
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) { // same as line 12; different param
      addBookForm({}, uid); // calls addBookForm, with empty object, and user specific
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj, uid)); // pulls single book data based on firebaseKey, then updates bookForm based on the objects in the form and uid
    }

    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook); // calls function based on firebasekey, then renders viewBook function
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to get rid of this wonderful author?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorAndAuthorBooks(firebaseKey).then(() => { // calls function based on firebasekey
          getAuthors(uid).then(showAuthors); // calls function by uid and then renders showAuthors
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm(); // calls function to pull up form to add an author
    }

    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj, uid)); // gets single author by firebase key and shows the info in the author object to update
    }

    // TODO: CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
