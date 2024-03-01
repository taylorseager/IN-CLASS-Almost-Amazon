// for merged promises

import { deleteBook, getBooks, getSingleBook } from './bookData';
import {
  deleteSingleAuthor, getAuthorBooks, getSingleAuthor, getAuthors
} from './authorData';

// TODO: Get data for viewBook
const getBookDetails = async (bookFirebaseKey) => { // async is a cleaner way to write multiple promises, that will return a new promise, based on a books firebaseKey
  const bookObject = await getSingleBook(bookFirebaseKey); // checks the getSingleBook function based on the books firebaseKey
  const authorObject = await getSingleAuthor(bookObject.author_id); // checks the getSingleAuthor function based on the author id associated with that book

  return { ...bookObject, authorObject }; // spread operator expands array into an object; avoids directly modififying the original object
};

// GET AUTHOR
const getAuthorDetails = async (uid, authorFirebaseKey) => { // async is a cleaner way to write multiple promises; based on user specific details and a books firebaseKey
  const authorObject = await getSingleAuthor(uid, authorFirebaseKey); // same as line 11 but also user specific
  const authorsBooks = await getAuthorBooks(uid, authorFirebaseKey); // same as line 18, but is for all of a specific authors books
  return { ...authorObject, books: authorsBooks }; // spread operator line 13; new property of books is added to authorBooks?
};

const deleteAuthorAndAuthorBooks = async (authorFirebaseKey) => {
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  const deleteBookPromises = await authorBooks.map((abObj) => deleteBook(abObj.firebaseKey)); // .map loops through authorBooks based on the authorBookObject, and then deletes said book based on the firebaseKey

  await Promise.all(deleteBookPromises).then(() => deleteSingleAuthor(authorFirebaseKey)); // promise.all takes mutliple promises and returns a single promise, waits for all promises to be resolved/rejected before executing function
};

// TODO: STRETCH...SEARCH BOOKS
const searchBooks = async (uid, searchValue) => { // uid is first, since it's user specific
  const allBooks = await getBooks(uid); // gets books based on uid
  const allAuthors = await getAuthors(uid); // gets authors based on uid
  const filteredBooks = allBooks.filter((book) => ( // .filter creates a new array with the specific conditions (below)
    book.title.toLowerCase().includes(searchValue) // takes book title and puts it to all lowercase, and checks if it is included in the search value input by the user
|| book.description.toLowerCase().includes(searchValue) // takes book description, puts it to lowercase, checks if it is included in the search value input by user
  ));

  const filteredAuthors = await allAuthors.filter((author) => ( // same as above but for author; and the author specific details
    author.first_name.toLowerCase().includes(searchValue)
  || author.last_name.toLowerCase().includes(searchValue)
  || author.email.toLowerCase().includes(searchValue)
  ));

  return { filteredBooks, filteredAuthors };
};

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorAndAuthorBooks,
  searchBooks,
};
