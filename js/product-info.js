"use strict";

// Alerta en caso de que el input este vacio

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}



//Container donde se cargara La informacion del producto
const PRODUCT_CONTAINER = document.getElementById("product-info-container");

// Container donde se cargan los productos relacionados
const RELATED_CONTAINER = document.getElementById("related");

// Container donde se cargar los comentarios
const COMMENTS_CONTAINER = document.getElementById("comments-container");

// Contenedor carrusel
const CAROUSEL_CONTAINER = document.getElementById("carousel-inner");

// Boton enviar
const BTN_SEND = document.getElementById("enviar");

//tu opinion
const OPINION = document.getElementById("opinion");

// Elemento tu puntuacion
const STARS = document.getElementById("inputGroupSelect");

// Array que contiene las URLs que vamos a utilizar
const urlArray = [PRODUCT_INFO_URL, PRODUCT_INFO_COMMENTS_URL];

// Funcion que devuelve las imagenes del producto
const getProductImages = (array) => {
  let res = "";
  array.forEach((element) => {
    res += `

    <picture class="d-flex">
      <img src="${element}" class="d-block w-100 img-thumbnail justify-content-between align-items-center m-3 mb-3 ms-0 mt-3 shadow-sm"  
      alt="imagenes de producto">
    </picture>

    `;
  });
  return res;
};

// Funcion que muestra el carrusel con imagenes
const showCarousel = (array) => {
  console.log(array);
  let res = "";

  res += `
  
  <div class="carousel-item active">
    <img src="${array[0]}" class=" d-block w-50" alt="..." />
  </div>
  
  `;

  for (let i = 1; i < array.length; i++) {
    res += `

    <div class="carousel-item">
            <img src="${array[i]}" class=" d-block w-50" alt="..." />
    </div>

    `;
  }
  CAROUSEL_CONTAINER.innerHTML = res;
};

// Funcion que muestra la informacion del producto y sus imagenes
const showProductInfo = (obj) => {
  PRODUCT_CONTAINER.innerHTML += `
  
  <h2> ${obj.name} </h2>
  
  <hr class="mb-5">
  
  <div class="ps-3">

  <span class="fw-bold "> Precio </span>
  <p> ${obj.currency} ${obj.cost}</p>

  <span class="fw-bold"> Descripción </span>
  <p>${obj.description}</p>

  <span class="fw-bold"> Categoría </span>
  <p>${obj.category}</p>

  <span class="fw-bold"> Cantidad de vendidos </span>
  <p>${obj.soldCount}</p>
  
  <span class="fw-bold"> Imagenes ilustrativas </span>
  </div>
  
  <div class="d-flex mt-4 mb-3"> ${getProductImages(obj.images)} </div>

  `;
};

// Funcion que evualua el puntaje
const getStars = (number) => {
  switch (number) {
    case 1:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 2:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 3:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 4:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>`;
    case 5:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>`;
  }
};

// Funcion que muestra los comentarios del producto y las estrellas segun puntaje
const showProductComments = (obj) => {
  

  obj.forEach((comment) => {
    COMMENTS_CONTAINER.innerHTML += `

    <li class="list-group-item bg-light">
      <span class="fw-bold">
      ${comment.user}
      </span>
      ${comment.dateTime} -

      ${getStars(comment.score)}

      <br>
      ${comment.description}
    </li>
    `;
  });
};

// * EVENTS

// iteramos entre cada una de las URLs del array urlArray y utilizamos las funciones que correspondan para mostrar los datos en la pagina.
urlArray.forEach((url) => {
  document.addEventListener("DOMContentLoaded", function () {
    getJSONData(url).then(function (resultObj) {
      if (resultObj.status === "ok" && resultObj.data.id) {
        const product = resultObj.data;
        const related = resultObj.data.relatedProducts;
        const images = resultObj.data.images;

        showProductInfo(product);
        showrelated(related);
        showCarousel(images);

      } else if (resultObj.status === "ok") {
        const comments = resultObj.data;

        showProductComments(comments);
        if (commentID == productID) {
          showProductComments(newComment);
        }
      }
    });
  });
});

// Boton enviar onclick
BTN_SEND.onclick = () => {
  if (OPINION.value == "") {
    showAlertError();
  } else {
    const productID = localStorage.getItem("productID");
    localStorage.setItem("commentID", productID);

    localStorage.setItem("opinion", OPINION.value);
    localStorage.setItem("stars", STARS.value);

    OPINION.value = "";

    window.location.reload();
  }
};

// Modifico el ID del producto al hacer click en un producto relacionado y vuelve a cargar la pagina
const setProductID = (id) => {
  localStorage.setItem("productID", id);

  window.location = "product-info.html";
};

// Funcion que muestra los prductos relacionados
const showrelated = (array) => {
  array.forEach((element) => {
    RELATED_CONTAINER.innerHTML += `

            <div class="col-md-3">

              <div
                class="card mb-3 shadow-sm custom-card cursor-active"
                id="sofa"
                onclick="setProductID(${element.id})"
              >

                <img
                  class="bd-placeholder-img card-img-top p-2 border-bottom"
                  src="${element.image}"
                  alt="Imgagen representativa de producto relacionado"
                />

                <div class="card-body">

                  <h4 class="card-title mb-2">${element.name}</h4>
                  
                </div>

              </div>

            </div>

    `;
  });
};

// *LOCAL STORAGE

//  Metodo que regresa el nombre de usuario para mostrar en el comentario
const userName = () => {
  let user = localStorage.getItem("email");
  let userName = user.split("@")[0];
  return userName;
};

// Guardamos en una variable el ID del comentario que queremos postear
const commentID = localStorage.getItem("commentID");

// Guardamos en una variable el ID del producto
const productID = localStorage.getItem("productID");

// Guardamos en una variable el puntaje del comentario
const points = parseInt(localStorage.getItem("stars"));

// Guardamos en una variable el comentario
const opinion = localStorage.getItem("opinion");

//fecha actual
const date = new Date();

//objeto newComment
const newComment = [
  {
    user: `${userName()}`,

    dateTime: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(
      -2
    )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `,

    score: points,

    description: `${opinion}`,

    id: productID,
  },
];
