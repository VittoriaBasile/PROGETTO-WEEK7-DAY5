const token =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGI0MmY4MWI0MjAwMTM5YjI3YjciLCJpYXQiOjE2NzkwMzYzNzAsImV4cCI6MTY4MDI0NTk3MH0.Bx73lB6yVNt7AUJEjfLxcitd5wgiPHhLCqZLryFCN5M";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? url + selectedId : url;
const method = selectedId ? "PUT" : "POST";

const validazione = () => {
  const form = document.querySelector("form");
  form.classList.add("validated");
};

window.onload = () => {
  if (selectedId) {
    document.getElementById("title").innerText = "Modifica Prodotto";
    document.getElementById("edit").classList.remove("d-none");
    document.getElementById("delete").classList.remove("d-none");
    document.getElementById("reset").classList.add("d-none");
    document.getElementById("create").classList.add("d-none");

    fetch(endpoint, {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { name, description, brand, imageUrl, price } = data;
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imgUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((error) => console.log(error));
  }
};

const invio = (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imgUrl").value,
    price: document.getElementById("price").value,
  };
  fetch(endpoint, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: ` Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "index.html";
      }
    })
    .catch((error) => console.log(error));
};

const resetta = () => {
  const hasAccepted = confirm("Sei sicuro di voler eliminare il prodotto?");
  if (hasAccepted) {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("imgUrl").value = "";
    document.getElementById("price").value = "";
    const form = document.querySelector("form");
    form.classList.remove("validated");
  }
};

const cancella = () => {
  const hasAccepted = confirm("Sei sicuro di voler eliminare il prodotto?");
  if (hasAccepted) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "index.html";
        }
      })
      .catch((error) => console.log(error));
  }
};
