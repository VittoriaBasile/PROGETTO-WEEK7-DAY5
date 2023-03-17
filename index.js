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
      col.innerHTML = ` <div class="card" style="width: 18rem">
      <img
        style="object-fit: cover"
        src= ${img.src.medium} 
        class="card-img-top img-fluid"
        alt="card-pic"
      />
      <div class="card-body">
        <h5 class="card-title">${prodotto.name}</h5>
        <p class="card-text">${prodotto.brend}</p>
        <p class="card-text">${prodotto.price}</p>
        <div class="d-flex justify-content-center gap-2">
          <a href="details.html?id=${id}" class="btn btn-primary"
            >Scopri di più</a
          >
          <a href="backoffice.html?id=${id}" class="btn btn-warning"
            >Modifica</a
          >
        </div>`;

      row.appendChild(col);
    }
  });
