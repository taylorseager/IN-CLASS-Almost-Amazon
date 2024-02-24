import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
// import viewBook from './viewBook';

const viewAuthor = (obj) => {
  clearDom();
  console.warn(obj);
  const domString = `
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
    <hr>
      <p class="card-text>${obj.favorite ? '<span class="badge badge-info fave-badge"><i class="fa fa-heart" aria-hidden="true"></span></i> ' : ''}</p>
      <i class="btn btn-success" id="view-author-btn--${obj.firebaseKey}"><span class="fas fa-eye"></span></i>
      <i class="btn btn-info" id="update-author--${obj.firebaseKey}"><span class="fas fa-edit"></span></i>
      <i class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
      </div>
      </div>
      </div>
      <img src=${obj.books[0].image} alt=${obj.books[0].title} style="width: 300px;">
      `;

  renderToDOM('#view', domString);
};

export default viewAuthor;

// loop through obj.books
// for book of obj.books
// book.sale
// book.image
// book.price

// <img class="card-img-top" src=${obj.image} alt=${obj.title} style="height: 400px;">
