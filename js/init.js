// OBTENGO EL ID DE LA CATEGORÍA
const getId = () => {
  const id = localStorage.getItem("catID");
  return id;
};

// Metodo que obtiene la id de el producto selecionado
const getProductId = () => {
  const id = localStorage.getItem("productID");
  return id;
};

// URL A LA CUAL QUEREMOS INGRESAR
const PRODUCTS_URL =
  "https://japceibal.github.io/emercado-api/cats_products/" + getId() + ".json";




const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";


// URL que varia segun el producto selecionado
const PRODUCT_INFO_URL =
"https://japceibal.github.io/emercado-api/products/" +
getProductId() +
".json";


// URL que muestra los comentarios del producto selecionado
const PRODUCT_INFO_COMMENTS_URL =
"https://japceibal.github.io/emercado-api/products_comments/" +
getProductId() +
".json";


const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
