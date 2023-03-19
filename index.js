const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGI0MmY4MWI0MjAwMTM5YjI3YjciLCJpYXQiOjE2NzkwMzYzNzAsImV4cCI6MTY4MDI0NTk3MH0.Bx73lB6yVNt7AUJEjfLxcitd5wgiPHhLCqZLryFCN5M";
fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((resp) => resp.json())

  .then((data) => {
    const prodotti = data;
    const row = document.getElementById("row");
    row.innerHTML = "";
    for (const prodotto of prodotti) {
      const col = document.createElement("div");
      col.className = "col";
      col.innerHTML = ` <div class="card mt-4" style="height: 500px;">
      <img
        style="object-fit: cover"
        src= ${prodotto.imageUrl} 
        class="card-img-top img-fluid"
        alt="card-pic"
      />
      <div class="card-body d-flex flex-column justify-content-around">
        <h5 class="card-title text-truncate" >${prodotto.name}</h5>
        <p class="card-text">${prodotto.brand}</p>
        <p class="card-text">${prodotto.price} €</p>
        <div class="container d-flex  flex-md-wrap flex-lg-wrap flex-xxl-nowrap gap-2">
          <a href="details.html?id=${prodotto._id}" class="btn btn-secondary"
            >Scopri di più</a
          >
          <a href="backoffice.html?id=${prodotto._id}" class="btn btn-light text-secondary border border-secondary"
            >Modifica</a
          >
        </div>`;

      row.appendChild(col);
    }
  });
