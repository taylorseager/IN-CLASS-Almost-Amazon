import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyResults = () => {
  const domString = '<h1>No Results</h1>';
  renderToDOM('#store', domString);
};

const showResults = (authors, books) => {
  clearDom();

  let domString = '';
  authors.forEach((item) => {
    console.warn('author', item);
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
          <p class="card-text>${item.favorite ? '<span class="badge badge-info fave-badge"><i class="fa fa-heart" aria-hidden="true"></span></i> ' : ''} </p>
          <i class="btn btn-success" id="view-author-btn--${item.firebaseKey}"><span class="fas fa-eye"></span></i>
          <i class="btn btn-info" id="update-author--${item.firebaseKey}"><span class="fas fa-edit"></span></i>
          <i class="btn btn-danger" id="delete-author-btn--${item.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
      </div>
    </div>`;
  });
  books.forEach((item) => {
    console.warn('books', item);
    domString += `
        <div class="card">
          <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${item.title}</h5>
              <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
              <hr>
              <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}"><span class="fas fa-eye"></span></i>
              <i id="edit-book-btn--${item.firebaseKey}" class="btn btn-info"><span class="fas fa-edit"></span></i>
              <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger"><span class="fas fa-trash-alt"></span></i>
          </div>
        </div>`;
  });
  renderToDOM('#results', domString);
};

export { showResults, emptyResults };
