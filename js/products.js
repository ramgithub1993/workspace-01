//Esta funcion recibe un array con los datos de los  productos y los muestra en la pagina manipulando DOM
function showCategoriesList(array) {
  let htmlContentToAppend = "";

  array.forEach((element) => {
    htmlContentToAppend +=
      // Con bootstrap podemos construir facilmente la estructura de articulos utilizando las clases correspndientes

      `
    <div class="list-group-item list-group-item-action">
    <div class="row">
    <div class="col-3">
    <img src="` +
      element.image +
      `" alt="product image" class="img-thumbnail">
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
    <h4>` +
      element.name +
      " - " +
      element.currency +
      " " +
      element.cost +
      `</h4> 
    <p> ` +
      element.description +
      `</p> 
    </div>
    <small class="text-muted">` +
      element.soldCount +
      ` vendidos</small> 
    </div>
    
    </div>
    </div>
    </div>
    `;
    document.getElementById("products-list-container").innerHTML =
      htmlContentToAppend;
  });
}

//array donde se cargarán los datos recibidos:
let productsArray = [];

// Al cargar se llama a getJSONData() con la URL deseada y si el estado de esta respuesta es correcta se agregan los productos a productsArray y se llama a showCategoriesList() con el array como parametro.

// Esta funcion declarada mas arriba se encargara de mostrar toda la informacion en la pagina haciendo uso del DOM

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showCategoriesList(productsArray);
    }
  });
});
