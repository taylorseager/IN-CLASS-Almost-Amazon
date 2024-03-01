import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => { // creates a new Promise that will be user specific for that users created books
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, { // uses the database url(endpoint) pulls all books based on user id
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
  // response.json() = invoking function
    .then((response) => response.json(uid)) // converting the data that we are fetching to json, user specific
    .then((data) => { // receieves parsed JSON data
      if (data) { // checking to see if there is data complete line 18
        resolve(Object.values(data)); // object.values converts keys to an array
      } else { // if no data
        resolve([]); // return an empty array
      }
    })
    .catch(reject); // catches errors
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => { // creates a new Promise that will be based on the firebaseKeythat that deletes books
  fetch(`${endpoint}/books/${firebaseKey}.json`, { // uses database to select specific book based on firebaseKey
    method: 'DELETE', // deletes entry from database
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // converts response to JSON
    .then((data) => resolve(data)) // takes data from line 34, if able will reslove the promise
    .catch(reject); // catches if there are errors
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => { // gets a single book based on firebaseKey
  fetch(`${endpoint}/books/${firebaseKey}.json`, { // specific api call to locate book based on firebaseKey
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json()) // converts response to JSON
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject); // catches if there are errors
});

// TODO: CREATE BOOK
const createBook = (payload) => new Promise((resolve, reject) => { // creates a new Promise that will be based on the payload that creates books; payload refers to the object cotaining necessary info about book being created; formEvents line 13
  fetch(`${endpoint}/books.json`, { // api call for all books
    method: 'POST', // creates a new database entry
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
    body: JSON.stringify(payload), // JSON.stringify converts payload object into a string in JSON format
  })
    .then((response) => response.json()) // converts response to JSON
    .then((data) => resolve(data)) // takes data from line 61 and if able will resolve the promise
    .catch(reject); // catches if there are errors
});

// TODO: UPDATE BOOK
const updateBook = (payload) => new Promise((resolve, reject) => { // creates a new Promise that will be based on the payload that updates a book; payload refers to the object cotaining necessary info about book being updated; formEvents line 13
  fetch(`${endpoint}/books/${payload.firebaseKey}.json`, { // api call for all books based on the payload and firebaseKey
    method: 'PATCH', // ammends a database entry
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
    body: JSON.stringify(payload), // JSON.stringify converts payload object into a string in JSON format
  })
    .then((response) => response.json()) // converts response to JSON
    .then(resolve) // shorthand for line 62
    .catch(reject); // catches if there are errors
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => { // new promise based on user specifics
  fetch(`${endpoint}/books.json?orderBy="sale"&equalTo=true`, { // api call for books based on sale value if truthy
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json(uid)) // converts response to JSON by uid
    .then((data) => resolve(Object.values(data))) //  variable where the filtered objects are stored
    .catch(reject); // cathces if there are errors
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
};
