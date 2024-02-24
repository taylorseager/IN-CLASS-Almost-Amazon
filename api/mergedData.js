// for merged promises

import { getSingleBook } from './bookData';
import { getAuthorBooks, getSingleAuthor } from './authorData';

// TODO: Get data for viewBook
const getBookDetails = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

// GET AUTHOR
// Create an object that has book data and an object named authorObject
const getAuthorDetails = async (authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(authorFirebaseKey);
  const authorsBooks = await getAuthorBooks(authorFirebaseKey);
  console.warn(authorsBooks);
  console.warn(authorObject, authorsBooks);
  return { ...authorObject, books: authorsBooks };
};

export { getBookDetails, getAuthorDetails };
