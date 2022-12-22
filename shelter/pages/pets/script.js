import pets from "../../pets.js";

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav");
const header = document.querySelector(".header-container");
const cards = document.querySelector(".cards-container");
const logo = document.querySelector(".link-logo-nav");
const pagination = document.querySelector(".pagination");
const page = document.querySelector(".page");
const forwardButtons = document.querySelectorAll(".forward");
const backButtons = document.querySelectorAll(".back");
let arrLarge,
  arrMedium,
  arrSmall = [];

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
  arrLarge = sortArrayForPagination(6, 8);
  arrMedium = sortArrayForPagination(8, 6);
  arrSmall = sortArrayForPagination(16, 3);
  if (window.matchMedia("(min-width: 1280px)").matches) {
    arrLarge[0].forEach((el) =>
      cards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
  if (
    window.matchMedia("(max-width: 1279px)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    arrMedium[0].forEach((el) =>
      cards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    arrSmall[0].forEach((el) =>
      cards.insertAdjacentHTML("beforeend", createCards(el))
    );
  }
};
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
        cards.insertAdjacentHTML(
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
    cards.removeChild(document.querySelector(".background-window"));
    document.body.style.overflow = "visible";
  }
};

const sortArrayForPagination = (amountArr, amountCards) => {
  let sortArr = [];
  let sortPets = pets;
  for (let i = 0; i <= 5; i++) {
    sortArr = [...sortArr, ...sortPets];
  }
  for (let i = 0; i < amountArr; i++) {
    let a = sortArr.splice(0, amountCards).sort(() => Math.random() - 0.5);
    sortArr.push(a);
  }
  sortArr.sort(() => Math.random() - 0.5);
  return sortArr;
};

const clickPagination = () => {
  if (document.body.scrollWidth >= 1280) {
    addCardsForPagination(arrLarge, "6");
  } else if (
    document.body.scrollWidth >= 768 &&
    document.body.scrollWidth < 1280
  ) {
    addCardsForPagination(arrMedium, "8");
  } else {
    addCardsForPagination(arrSmall, "16");
  }
};

const addCardsForPagination = (array, pageNumber) => {
  const target = event.target;
  if (target.classList.contains("forward")) {
    backButtons.forEach((el) => (el.disabled = false));
    backButtons.forEach((el) => el.classList.add("button-hover"));

    page.innerHTML = `${parseInt(page.innerHTML) + 1}`;
    cards.innerHTML = "";
    array[parseInt(page.innerHTML) - 1].forEach((el) =>
      cards.insertAdjacentHTML("beforeend", createCards(el))
    );
    if (target.classList.contains("last-page")) {
      page.innerHTML = pageNumber;
      cards.innerHTML = "";
      array[parseInt(page.innerHTML) - 1].forEach((el) =>
        cards.insertAdjacentHTML("beforeend", createCards(el))
      );
    }
    if (page.innerHTML === pageNumber) {
      forwardButtons.forEach((el) => el.setAttribute("disabled", "true"));
    }
  }
  if (target.classList.contains("back")) {
    forwardButtons.forEach((el) => (el.disabled = false));
    page.innerHTML = `${parseInt(page.innerHTML) - 1}`;
    cards.innerHTML = "";
    array[parseInt(page.innerHTML) - 1].forEach((el) =>
      cards.insertAdjacentHTML("beforeend", createCards(el))
    );
    if (target.classList.contains("first-page")) {
      page.innerHTML = "1";
      cards.innerHTML = "";
      array[parseInt(page.innerHTML) - 1].forEach((el) =>
        cards.insertAdjacentHTML("beforeend", createCards(el))
      );
    }
    if (page.innerHTML === "1") {
      backButtons.forEach((el) => el.setAttribute("disabled", "true"));
      backButtons.forEach((el) => el.classList.remove("button-hover"));
    }
  }
};

const resizeCards = () => {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    if (page.innerHTML < 6) {
      forwardButtons.forEach((el) => (el.disabled = false));
    } else {
      forwardButtons.forEach((el) => (el.disabled = true));
      page.innerHTML = "6";
    }
    addCardsForResize(arrLarge);
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
    if (page.innerHTML < 8) {
      forwardButtons.forEach((el) => (el.disabled = false));
    } else {
      forwardButtons.forEach((el) => (el.disabled = true));
      page.innerHTML = "8";
    }
    addCardsForResize(arrMedium);
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    if (page.innerHTML >= 8 && page.innerHTML < 16) {
      forwardButtons.forEach((el) => (el.disabled = false));
    }
    addCardsForResize(arrSmall);
  }
};
const addCardsForResize = (array) => {
  cards.innerHTML = "";
  array[parseInt(page.innerHTML) - 1].forEach((el) =>
    cards.insertAdjacentHTML("beforeend", createCards(el))
  );
};

pagination.addEventListener("click", clickPagination);
cards.addEventListener("click", modalWindow);
header.addEventListener("click", openMenu);
window.addEventListener("load", addCards);
window.addEventListener("resize", resizeCards);
