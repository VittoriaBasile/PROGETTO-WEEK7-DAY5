const token =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGI0MmY4MWI0MjAwMTM5YjI3YjciLCJpYXQiOjE2NzkwMzYzNzAsImV4cCI6MTY4MDI0NTk3MH0.Bx73lB6yVNt7AUJEjfLxcitd5wgiPHhLCqZLryFCN5M";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? url + selectedId : url;
const method = selectedId ? "PUT" : "POST";

window.onload = () => {
  if (selectedId) {
    document.getElementById("title").innerText = "Edit Product";
    document.getElementById("edit").classList.remove("d-none");
    document.getElementById("delete").classList.remove("d-none");
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

const submit = (event) => {
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
  }).catch((error) => console.log(error));
};

const cancella = () => {
  const hasAccepted = confirm("Do you really want to delete this product?");
  if (hasAccepted) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
};
