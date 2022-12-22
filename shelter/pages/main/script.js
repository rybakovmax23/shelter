import pets from "../../pets.js";

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav");
const header = document.querySelector(".header");
const sliderCards = document.querySelector(".cards");
const sliderContent = document.querySelector(".slider-content");
const petsSection = document.querySelector(".pets-section");
const logo = document.querySelector(".logo-nav");
let sortPets = pets;
let arr = [];

const openMenu = (event) => {
  const target = event.target.className;
  if (target.indexOf("hamburger") === 0 || target.indexOf("line") === 0) {
    hamburger.classList.toggle("open");
    menu.classList.toggle("open-menu");

    document.body.style.overflow = hamburger.classList.contains("open")
      ? "hidden"
      : "visible";
  } else if (
    target === "menu-background" ||
    target === "menu-link" ||
    target === "menu-link-main"
  ) {
    document.body.style.overflow = "visible";
    menu.classList.remove("open-menu");
    hamburger.classList.remove("open");
  }
  logo.style.display = hamburger.classList.contains("open") ? "block" : "none";
};

const createCards = (element) => {
  return `<div class="cards-item">
   <img
     src=${element.img}
     alt=${element.name}
     class="cards-img"
   />
   <div class="name-pets">${element.name}</div>
   <button class="but-cards">Learn more</button>
 </div>`;
};

const addCards = () => {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    arr = pets.slice(0, 3);
    arr.forEach((el) =>
      sliderCards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
  if (
    window.matchMedia("(max-width: 1279px)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    arr = pets.slice(0, 2);
    arr.forEach((el) =>
      sliderCards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    arr = pets.slice(0, 1);
    arr.forEach((el) =>
      sliderCards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
};

const addCardsForResize = (count) => {
  sliderCards.innerHTML = "";
  arr = pets.slice(0, count);
  arr.forEach((el) =>
    sliderCards.insertAdjacentHTML("beforeend", createCards(el))
  );
};

const changeWidthScreen = () => {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    addCardsForResize(3);
  }
  if (
    window.matchMedia("(max-width: 1279px)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    document.body.style.overflow = "visible";
    menu.classList.remove("open-menu");
    hamburger.classList.remove("open");
    logo.style.display = hamburger.classList.contains("open")
      ? "block"
      : "none";
    addCardsForResize(2);
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    addCardsForResize(1);
  }
};

const addCardsForSlider = (count, place) => {
  arr = sortPets
    .concat(arr)
    .filter((el, i, array) => array.indexOf(el) === array.lastIndexOf(el))
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  arr.forEach((el) => sliderCards.insertAdjacentHTML(place, createCards(el)));
  sliderContent.removeEventListener("click", slider);
};

const slider = (event) => {
  const target = event.target;

  if (window.matchMedia("(min-width: 1280px)").matches) {
    if (target.classList.contains("but-right")) {
      addCardsForSlider(3, "beforeend");
      sliderCards.style.left = "-1080px";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[0].remove();
        allCards[1].remove();
        allCards[2].remove();
        sliderCards.style.left = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
    if (target.classList.contains("but-left")) {
      addCardsForSlider(3, "afterbegin");
      sliderCards.style.right = "-1080px";
      sliderCards.style.left = "auto";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[3].remove();
        allCards[4].remove();
        allCards[5].remove();
        sliderCards.style.right = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.right = "0";
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
  }
  if (
    window.matchMedia("(max-width: 1279px)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    if (target.classList.contains("but-right")) {
      addCardsForSlider(2, "beforeend");
      sliderCards.style.left = "-604px";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[0].remove();
        allCards[1].remove();
        sliderCards.style.left = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
    if (target.classList.contains("but-left")) {
      addCardsForSlider(2, "afterbegin");
      sliderCards.style.right = "-604px";
      sliderCards.style.left = "auto";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[2].remove();
        allCards[3].remove();
        sliderCards.style.right = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.right = "0";
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    if (target.classList.contains("but-right")) {
      addCardsForSlider(1, "beforeend");
      sliderCards.style.left = "-300px";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[0].remove();
        sliderCards.style.left = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
    if (target.classList.contains("but-left")) {
      addCardsForSlider(1, "afterbegin");
      sliderCards.style.right = "-300px";
      sliderCards.style.left = "auto";
      const allCards = document.querySelectorAll(".cards-item");
      setTimeout(() => {
        allCards[1].remove();
        sliderCards.style.right = "auto";
        sliderContent.addEventListener("click", slider);
        setTimeout(() => {
          sliderCards.style.right = "0";
          sliderCards.style.left = "0";
        }, 200);
      }, 210);
    }
  }
};

const createModalWindow = (
  image,
  name,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites
) => {
  return `<div class="background-window">
  <div class="modal-window">
    <div class="close-button">
      <img src="../../assets/icons/close.svg" alt="close" class="close">
    </div>
    <img src=${image} alt="img" class="img-modal">
    <div class="modal-content">
      <div class="name-modal">${name}</div>
      <div class="type-breed">${type} - ${breed}</div> 
      <div class="description">${description}</div>
      <ul class="other-descriptions">
        <li class="info">Age: <span class="info-noweight">${age}</span></li>
        <li class="info">Inoculations: <span class="info-noweight">${inoculations}</span></li>
        <li class="info">Diseases: <span class="info-noweight">${diseases}</span></li>
        <li class="info">Parasites: <span class="info-noweight">${parasites}</span></li>
      </ul>
    </div>
  </div>
</div>`;
};

const modalWindow = (event) => {
  const target = event.target;
  if (target.classList.contains("cards-item")) {
    pets.forEach((el) => {
      if (target.firstElementChild.alt === el.name) {
        petsSection.insertAdjacentHTML(
          "afterbegin",
          createModalWindow(
            el.img,
            el.name,
            el.type,
            el.breed,
            el.description,
            el.age,
            el.inoculations,
            el.diseases,
            el.parasites
          )
        );
      }
    });
    document.querySelector(".background-window").style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  if (
    target.classList.contains("background-window") ||
    target.classList.contains("close-button")
  ) {
    petsSection.removeChild(document.querySelector(".background-window"));
    document.body.style.overflow = "visible";
  }
};

petsSection.addEventListener("click", modalWindow);
sliderContent.addEventListener("click", slider);
window.addEventListener("resize", changeWidthScreen);
window.addEventListener("load", addCards);
header.addEventListener("click", openMenu);
