"use strict";



// Tabla
const TABLE = document.getElementById("table");

//Array de compras de la local storage
const getLocalBuy = () => {
  return JSON.parse(localStorage.getItem("buys"));
};

// Se llama la info
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let listaCompras = resultObj.data.articles;

      showBuys(listaCompras);
      showBuysList(getLocalBuy());
    }
  });
});

// Fucion que muestra la compra precargada
const showBuys = (array) => {
  array.forEach((element) => {
   

    TABLE.innerHTML += `
    
    <th scope="row" id="image"><img style="width: 80px"; src="${element.image}" alt=""></th>

    <td id="name">${element.name}</td>

    <td id="cost">
    <div class="d-flex" >
    <p class="me-2">${element.currency}</p>
    <p>${element.unitCost}</p>
    </div>
    </td>

    <td>
    <input
    class="form-control"
    type="number"
    placeholder="1"
    id="${element.id}"
    style="width: 5rem"
    />
    </td>

    <td id="subtotal">
    <div class="d-flex fw-bold" >
    <p class="me-2">${element.currency}</p>
    <p id="${element.unitCost}">${element.unitCost}</p>
    </div>
    </td>

    `;

     //Cantidad
    const AMOUNT = document.getElementById(`${element.id}`);

    AMOUNT.onchange = () => {
      document.getElementById(`${element.unitCost}`).innerHTML =
        element.unitCost * AMOUNT.value;
    };
  });
};

// Funcion que muestra la lista de compras
const showBuysList = (array) => {
  array.forEach((element) => {
    console.log(element);

    TABLE.innerHTML += `
    
    <th scope="row" id="image"><img style="width: 80px"; src="${element.images[0]}" alt=""></th>

    <td id="name">${element.name}</td>

    <td id="cost">
    <div class="d-flex" >
    <p class="me-2">${element.currency}</p>
    <p>${element.cost}</p>
    </div>
    </td>

    <td>
    <input
    class="form-control"
    type="number"
    placeholder="1"
    id="${element.id}"
    style="width: 5rem"
    />
    </td>

    <td id="subtotal">
    <div class="d-flex fw-bold" >
    <p class="me-2">${element.currency}</p>
    <p id="${element.cost}">${element.cost}</p>
    </div>
    </td>

    `;

    // Cantidad
    const AMOUNT = document.getElementById(`${element.id}`);

    AMOUNT.onchange = () => {
      document.getElementById(`${element.cost}`).innerHTML =
        element.cost * AMOUNT.value;
    };
  });
};