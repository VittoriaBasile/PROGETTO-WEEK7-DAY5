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
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      const row = document.getElementById("row");
      row.innerHTML = "";

      const col = document.createElement("div");
      col.className = "col-6";
      col.innerHTML = ` <div class="container ">
                                <img
                                    style="object-fit: cover; height:600px; width:"200"
                                    src= ${prodotto.imageUrl} 
                                    class="card-img-top img-fluid d-block"
                                    alt="card-pic"
                                />
                                
                        </div>`;

      const col2 = document.createElement("div");
      col2.className = "col-6 align-self-center";
      col2.innerHTML = `<div class="container lh-lg">

                          <div class="col">
                            <h5 class="fs-2">${prodotto.name}</h5>
                            <p class="fs-3 fw-light">${prodotto.brand}</p>
                            <p class="fs-3">${prodotto.price}€</p>
                            <p class="d-flex flex-wrap" >${prodotto.description}</p>
                          </div>
                        </div>`;

      row.appendChild(col);
      row.appendChild(col2);
    });
};
