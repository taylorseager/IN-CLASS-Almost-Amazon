import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import '@fortawesome/fontawesome-free';
// import filteredBooks from '../api/mergedData';

const emptyBooks = () => {
  const domString = '<h1>No Books For You!</h1>';
  renderToDOM('#search-store', domString);
};

const showBooks = (searchBooks) => {
  console.warn('searchBooks', searchBooks);
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';

  renderToDOM('#add-button', btnString);

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
  renderToDOM('#add-button', btnString);

  let domString = '';
  searchBooks.forEach((item) => {
    console.warn(item);
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
  renderToDOM('#book-store', domString);
};

export { showBooks, emptyBooks };
