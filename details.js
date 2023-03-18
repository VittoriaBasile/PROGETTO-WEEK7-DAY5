const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGI0MmY4MWI0MjAwMTM5YjI3YjciLCJpYXQiOjE2NzkwMzYzNzAsImV4cCI6MTY4MDI0NTk3MH0.Bx73lB6yVNt7AUJEjfLxcitd5wgiPHhLCqZLryFCN5M";

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = url + selectedId;
window.onload = () => {
  fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json())

    .then((prodotto) => {
      const row = document.getElementById("row");
      row.innerHTML = "";

      const col = document.createElement("div");
      col.className = "col";
      col.innerHTML = ` <div class="card" style="width: 18rem">
                                <img
                                    style="object-fit: cover"
                                    src= ${prodotto.imageUrl} 
                                    class="card-img-top img-fluid"
                                    alt="card-pic"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">${prodotto.name}</h5>
                                    <p class="card-text">${prodotto.brand}</p>
                                    <p class="card-text">${prodotto.price}</p>
                                    <p class="card-text" >${prodotto.description}</p>
                                </div>
                        </div>`;

      row.appendChild(col);
    });
};
