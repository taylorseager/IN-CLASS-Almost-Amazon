// for merged promises

import { deleteBook, getBooks, getSingleBook } from './bookData';
import {
  deleteSingleAuthor, getAuthorBooks, getSingleAuthor, getAuthors
} from './authorData';

// TODO: Get data for viewBook
const getBookDetails = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

// GET AUTHOR
// Create an object that has book data and an object named authorObject

const getAuthorDetails = async (uid, authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(uid, authorFirebaseKey);
  const authorsBooks = await getAuthorBooks(uid, authorFirebaseKey);

  return { ...authorObject, books: authorsBooks };
};

const deleteAuthorAndAuthorBooks = async (authorFirebaseKey) => {
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  console.warn(authorBooks, 'author books');
  const deleteBookPromises = await authorBooks.map((abObj) => deleteBook(abObj.firebaseKey));

  await Promise.all(deleteBookPromises).then(() => deleteSingleAuthor(authorFirebaseKey));
};

// TODO: STRETCH...SEARCH BOOKS
const searchBooks = async (uid, searchValue) => {
  const allBooks = await getBooks(uid);
  const allAuthors = await getAuthors(uid);
  const filteredBooks = allBooks.filter((book) => (
    book.title.toLowerCase().includes(searchValue)
|| book.description.toLowerCase().includes(searchValue)
  ));

  const filteredAuthors = await allAuthors.filter((author) => (
    author.first_name.toLowerCase().includes(searchValue)
  || author.last_name.toLowerCase().includes(searchValue)
  || author.email.toLowerCase().includes(searchValue)
  ));

  return { filteredBooks, filteredAuthors };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorAndAuthorBooks,
  searchBooks,
  deleteAuthorBooksRelationship
};
