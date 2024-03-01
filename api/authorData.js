import client from '../utils/client'; // import used to pull data from another file

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => { // creates a new Promise that will be user specific for that users created authors
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, { // uses the database url(endpoint) pulls all authors based on user id
    method: 'GET', // reads data from database
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // converting the data that we are fetching to json
    .then((data) => resolve(Object.values(data))) // takes the data from line 13 and if able will resolve the promise based on the data; Object.values = built in method that converts keys to an array
    .catch(reject); // catches if there are errors
});

// FIXME: CREATE AUTHOR
const createAuthor = (payload) => new Promise((resolve, reject) => { // same as line 6, payload refers to the object containing necessary info about the author being created; for author: formEvents, line 52
  fetch(`${endpoint}/authors.json`, { // uses database url to pull all authors
    method: 'POST', // creates a new database entry
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
    body: JSON.stringify(payload), // JSON.stringify converts payload object into a string in JSON format; body: = sent to body of HTTP request
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => resolve(data)) // takes the data from line 27 and if able will resolve the promise based on the data;
    .catch(reject); // catches if there are errors
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => { // same as line 6; firebaseKey refers to the specific unique identifier for that database entry in firebase
  fetch(`${endpoint}/authors/${firebaseKey}.json`, { // uses database url to pull a single author based on its firebaseKey
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => resolve(data)) // takes the data from line 40 and if able will resolve the promise based on the data;
    .catch(reject); // catches if there are errors
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => { // same as line 6; firebaseKey refers to the specific unique identifier for that database entry in firebase
  fetch(`${endpoint}/authors/${firebaseKey}.json`, { // uses database url to delete a single author based on its firebaseKey
    method: 'DELETE', // deletes entry from database
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => resolve(data)) // takes the data from line 53 and if able will resolve the promise based on the data;
    .catch(reject); // catches if there are errors
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) => new Promise((resolve, reject) => { // same as line 6; user specific
  fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, { // uses database url to pull a single author based on the payload from formEvents and the firebaseKey
    method: 'PATCH', // ammends a database entry
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
    body: JSON.stringify(payload), // JSON.stringify converts payload object into a string in JSON format; body: = sent to body of HTTP request
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then(resolve) // takes the data from line 67 and if able will resolve the promise; shorthanded option for line 54
    .catch(reject); // catches if there are errors
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => { // same as line 6; firebaseKey refers to the specific unique identifier for that database entry in firebase
  fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, { // uses database url to delete a single author's books based on its firebaseKey
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response// sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => resolve(Object.values(data))) // takes the data from line 13 and if able will resolve the promise based on the data; object.values converts keys to an array
    .catch(reject); // catches if there are errors
});

const showBooksOnSale = (uid) => new Promise((resolve, reject) => { // same as line 6; user specific
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, { // uses the database url(endpoint) pulls all sale books based on user id
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => { // receieves parsed JSON data, object.values converts keys to an array
      const booksOnSale = Object.values(data).filter((obj) => obj.sale); //  variable where the filtered objects are stored
      resolve(booksOnSale); // resolves promise based on sale data in the array from line 94
    })
    .catch(reject); // catches if there are errors
});

// TODO: FAVE AUTHOR
const showFaveAuthors = (uid) => new Promise((resolve, reject) => { // creates a new Promise that will be user specific for that users created authors
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, { // uses the database url(endpoint) pulls all fave authors based on user id
    method: 'GET', // reads data
    headers: { // sets additional info needed for request/response
      'Content-Type': 'application/json', // media type in request is in JSON
    },
  })
    .then((response) => response.json()) // promise resolution; that converts response to JSON (part after the fat arrow)
    .then((data) => { // receieves parsed JSON data, object.values converts keys to an array
      const favoriteAuthors = Object.values(data).filter((obj) => obj.favorite); //  variable where the filtered objects are stored
      resolve(favoriteAuthors); // resolves promise based on favorite data in the array from line 94
    })
    .catch(reject); // catches if there are errors
});

export { // exports functions to be able to use in other files
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  showBooksOnSale,
  showFaveAuthors,
};
