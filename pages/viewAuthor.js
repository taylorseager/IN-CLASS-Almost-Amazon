import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
    <hr>
      <p class="card-text>${obj.favorite ? `<span class="badge badge-info fave-badge"><i class="fa-solid fa-heart" aria-hidden="true"></i></span> ${obj.favorite}` : `${obj.favorite}`}</p>
      <i class="btn btn-success" id="view-author-btn--${obj.firebaseKey}"><span class="fas fa-eye"></span></i>
      <i class="btn btn-info" id="update-author--${obj.firebaseKey}"><span class="fas fa-edit"></span></i>
      <i class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
  </div>
</div>`;

  renderToDOM('#view', domString);
};

export default viewAuthor;
