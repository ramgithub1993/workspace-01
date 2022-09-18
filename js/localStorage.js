"use strict";

// LOCAL STORAGE 

// Guarda el email
const setEmail = () => {
  localStorage.setItem("email", emailInput.value);
};

// Obtiene el email de la local storage-
const getEmail = () => {
  const email = localStorage.getItem("email");
  return email;
};

// * ---------- CONDICION ----------

if (document.getElementById("submit")) {
  const btn = document.getElementById("submit");

  btn.onclick = () => {
    setEmail();
  };
} else {
  const profile_link = document.getElementById("profile");

  const addToHTML = () => {
    profile_link.innerHTML = getEmail();
  };

  addToHTML();
}
