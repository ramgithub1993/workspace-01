"use strict";

// * DECLARACIONES

// Campo primer nombre
const FIRST_NAME = document.getElementById("first-name");

// Campo segundo nombre
const SECOND_NAME = document.getElementById("second-name");

//Campo primer apellido
const SURNAME = document.getElementById("surname");

// Campo segundo apellido
const SECOND_SURNAME = document.getElementById("second-surname");

// Campo email
const EMAIL = document.getElementById("email");

// Campo telefono
const PHONE = document.getElementById("phone");

// Input de imagen
const IMAGE_INPUT = document.getElementById("image");

// Canvas donde se muestra la imagen
const IMAGE_CANVAS = document.getElementById("image-canvas");

// Bonton guardar cambios
const SUBMIT_BTN = document.getElementById("submit-btn");

// * EVENTS

//Evento que trae el email de localstorage
const getUserEmail = () => {
  return localStorage.getItem("email");
};

// Evento on click boton guardar cambios que guarda la info al localstorage
SUBMIT_BTN.onclick = () => {
  let userInfo = {
    firstName: FIRST_NAME.value,
    secondName: SECOND_NAME.value,
    surname: SURNAME.value,
    secondSurname: SECOND_SURNAME.value,
    phone: PHONE.value,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

// Evento que trae la info del usuario de la localstorage
const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};

// Se muestra el email ingresado en el login o registro
EMAIL.value = getUserEmail();

// Funcion que muestra la info en una variable y la mostramos segun corresponda
const showUserInfo = () => {
  if (getUserInfo()) {
    let info = getUserInfo();
    FIRST_NAME.value = info.firstName;
    SECOND_NAME.value = info.secondName;
    SURNAME.value = info.surname;
    SECOND_SURNAME.value = info.secondSurname;
    PHONE.value = info.phone;
  }
};
showUserInfo();

// Funcion que guarda la imagen en la local storage
IMAGE_INPUT.onchange = () => {
  const file = new FileReader();

  file.readAsDataURL(IMAGE_INPUT.files[0]);

  file.onload = () => {
    const URL = file.result;

    localStorage.setItem("profileImg", URL);

    window.location.reload();
  };
};

// Metodo que trae la imagen de perfil de la local storage
const getProfileImg = () => {
  return localStorage.getItem("profileImg");
};

// Funcion que muestra la imagen
const showImg = () => {
  if (getProfileImg()) {
    IMAGE_CANVAS.src = getProfileImg();
  }
};
showImg();