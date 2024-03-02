import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addAuthorForm = (obj = {}) => { // setting the default value to empty object; (obj = {}) as a parameter
  clearDom();
  const domString = ` 
    <form id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="mb-4">
      <div class="form-group">
        <label for="image">First Name</label>
        <input type="text" class="form-control" id="first_name" placeholder="First Name" value="${obj.first_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="image">Last Name</label>
        <input type="text" class="form-control" id="last_name" placeholder="Last Name" value="${obj.last_name || ''}"required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="Email" placeholder="Enter Email" value="${obj.email || ''}"required>
      </div>
      <div class="form-check">
      <input type="checkbox" class="form-check-input" id="favorite" ${obj.favorite ? 'checked' : ''}>
      <label class="form-check-label" for="favorite">Favorite?</label>
    </div>
      <button type="submit" class="btn btn-primary mt-3">${obj.firebaseKey ? 'Update Author' : 'Submit Author'}</button>
    </form>`;
  // this is the form to add an author, obj.word pulls dynamically from the api call to add an author to the database
  // ternary on line 7 & 24 changes button text pending if there is a firebasekey associated with the api call
  // ternary on line 21 checks if the "favorite" checkbox is selected or not
  renderToDOM('#form-container', domString); // renders above to the DOM based on the div id and what to push HTML wise
};

export default addAuthorForm;
