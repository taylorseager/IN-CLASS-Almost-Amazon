import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
// import { getAuthors } from '../api/authorData';
// import { showAuthors } from '../pages/authors';

const startApp = (uid) => {
  domBuilder(); // BUILD THE DOM
  domEvents(uid); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(uid); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // TODO: Put all books on the DOM on App load
  getBooks(uid).then(showBooks);
  // dont show arthurs when app loads
  // getAuthors().then(showAuthors);
};

export default startApp;
