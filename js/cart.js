"use strict";

// Alerta exitosa
function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

// Alerta error
function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

// Tabla
const TABLE = document.getElementById("table");

// Boton premium
const PREMIUM = document.getElementById("premium");

// Boton express
const EXPRESS = document.getElementById("express");

// Boton standard
const STANDARD = document.getElementById("standard");

// Texto subtotal
const SUBTOTAL_TEXT = document.getElementById("subtotal");

// Texto envio
const SHIPPING_TEXT = document.getElementById("shipping");

// Texto total
const TOTAL_TEXT = document.getElementById("total");

// Metodo que consigue el array de compras de la local storage
const getLocalBuy = () => {
  return JSON.parse(localStorage.getItem("buys"));
};

let cartItems = getLocalBuy();

let subtotal = 0;

let shippingPercentage = 0.15;

let shippingCost = 0;

let total = 0;



// Funcion que muestra los costos
const showCosts = () => {
  SUBTOTAL_TEXT.innerHTML = subtotal;
  SHIPPING_TEXT.innerHTML = shippingCost;
  TOTAL_TEXT.innerHTML = total;
};

// Boton premium on click
PREMIUM.onclick = () => {
  shippingPercentage = 0.15;
  calculateCosts();
};

// Boton express on click
EXPRESS.onclick = () => {
  shippingPercentage = 0.07;
  calculateCosts();
};

// Boton standard on click
STANDARD.onclick = () => {
  shippingPercentage = 0.05;
  calculateCosts();
};

// Funcion que calcula los costos segun corresponda
const calculateCosts = () => {
  subtotal = 0;

  cartItems.forEach((item) => {
    if (item.currency === "UYU") {
      subtotal += item.count * (item.unitCost / 40);
    } else {
      subtotal += item.count * item.unitCost;
    }

    shippingCost = Math.round(shippingPercentage * subtotal);

    total = subtotal + shippingCost;
    showCosts();
  });
};

// Funcion que calcula los costes de los items en la tabla
const setCosts = (id) => {
  cartItems.forEach((article) => {
    const INPUT = document.getElementById("inputCount" + article.id);
    if (article.id === id) {
      article.count = INPUT.value;
      localStorage.setItem("buys", JSON.stringify(cartItems));
    }

    calculateCosts();
  });
  window.location.reload();
};

calculateCosts();

// Funcion que remueve el producto del carrito de compras
const removeProduct = (id) => {
  cartItems = cartItems.filter((product) => product.id != id);

  localStorage.setItem("buys", JSON.stringify(cartItems));

  window.location.reload();
  showBuysList();
};

// Funcion que muestra la lista de compras
const showBuysList = () => {
  cartItems.forEach((element) => {
    TABLE.innerHTML += `
    
    <th scope="row" id="image"><img style="width: 80px"; src="${
      element.image
    }" alt=""></th>

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
    onchange="setCosts(${element.id})"
    id="inputCount${element.id}"
    style="width: 5rem"
    min="1"
    value="${element.count}"
    />
    </td>

    <td >
    <div class="d-flex fw-bold" >
    <p class="me-2">${element.currency}</p>
    <p id="subtotal${element.id}">$${element.unitCost * element.count}</p>
    </div>
    </td>

    <td>
      <button class="btn btn-outline-danger" onclick="removeProduct(${
        element.id
      })"><i class="bi bi-trash-fill">eliminar</i></button>
    </td>

    `;
  });
};

showBuysList();

//  MODAL 

//Chekbox tarjeta de credito
const CARD_CHECK = document.getElementById("card-check");

// Input de texto numero de tarjeta
const CARD_INPUT = document.getElementById("card-input");

// Input de texto codigo de seguridad
const CODE_INPUT = document.getElementById("code-input");

// Input de texto fecha de vencimiento
const EXPIRATION_INPUT = document.getElementById("expiration-input");

// Checkbox transferencia bancaria
const BANK_CHECK = document.getElementById("bank-check");

// Input de texto numero de cuenta
const BANK_INPUT = document.getElementById("bank-input");



// Eventos que habilitan y desabilitan los campos al hacer click en opciones de tarjeta de credito o transferencia bancaria
CARD_CHECK.onclick = () => {
  BANK_INPUT.setAttribute("disabled", "");
  EXPIRATION_INPUT.removeAttribute("disabled", "");
  CARD_INPUT.removeAttribute("disabled", "");
  CODE_INPUT.removeAttribute("disabled", "");
};

BANK_CHECK.onclick = () => {
  EXPIRATION_INPUT.setAttribute("disabled", "");
  CARD_INPUT.setAttribute("disabled", "");
  CODE_INPUT.setAttribute("disabled", "");
  BANK_INPUT.removeAttribute("disabled", "");
};

