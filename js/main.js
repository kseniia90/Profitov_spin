"use strict";

// account popup
if (document.querySelector(".account_popup") !== null) {

  window.addEventListener("click", function (e) {

    if ( document.querySelector(".account_popup.active") &&
      !e.target.closest(".popup-content")
    ) {
      document.querySelector(".account_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if(e.target.closest(".account-btn")){
      e.preventDefault();
      document.body.style.overflow = "hidden";
      document.querySelector(".account_popup").classList.add("active");
    }

    if (e.target.closest(".account_popup .close_popup")) {
      e.preventDefault();
      document.querySelector(".account_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

  });
}

// shop popup
if (document.querySelector(".shop_popup") !== null) {

  window.addEventListener("click", function (e) {

    if ( document.querySelector(".shop_popup.active") &&
      !e.target.closest(".popup-content")
    ) {
      document.querySelector(".shop_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if(e.target.closest(".open-shop")){
      e.preventDefault();
      document.body.style.overflow = "hidden";
      document.querySelector(".shop_popup").classList.add("active");
    }

    if (e.target.closest(".shop_popup .close_popup")) {
      e.preventDefault();
      document.querySelector(".shop_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

  });
}

// cart popup

if (document.querySelector(".cart_popup") !== null) {

  window.addEventListener("click", function (e) {

    if ( document.querySelector(".cart_popup.active") &&
      !e.target.closest(".popup-content")
    ) {
      document.querySelector(".cart_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if(e.target.closest(".open-cart")){
      e.preventDefault();
      document.body.style.overflow = "hidden";
      document.querySelector(".cart_popup").classList.add("active");
    }

    if (e.target.closest(".cart_popup .close_popup")) {
      e.preventDefault();
      document.querySelector(".cart_popup").classList.remove("active");
      document.body.style.overflow = "auto";
    }

  });
}

// tab
function openOption(evt, optionName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";
}


$(function () {
  // slider reviews
  var owl = $(".show-carousel").owlCarousel({
    dots: false,
    loop: true,
    items: 3,
    margin: 18,
  });
  $(".show__next-slide").click(function () {
    owl.trigger("next.owl.carousel");
  });
  $(".show__prev-slide").click(function () {
    owl.trigger("prev.owl.carousel");
  });
});













// wheel start

const prizes = [
  {
    text: "1",
    color: "#1c1b1c",
  },
  {
    text: "2",
    color: "#520b9a",
  },
  {
    text: "3",
    color: "#1c1b1c",
  },
  {
    text: "4",
    color: "#520b9a",
  },
  {
    text: "5",
    color: "#1c1b1c",
  },
  {
    text: "6",
    color: "#520b9a",
  },
  {
    text: "7",
    color: "#1c1b1c",
  },
  {
    text: "10",
    color: "#520b9a",
  },
];

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const reaper = wheel.querySelector(".grim-reaper");
const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
  prizes.forEach(({ text, color }, i) => {
    const rotation = prizeSlice * i * -1 - prizeOffset;
    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" style="--rotate: ${rotation}deg"><span class="text">${text}</span></li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient( from -90deg,${prizes
      .map(
        ({ color }, i) =>
          `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`
      )
      .reverse()});`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += 2 * Math.PI;

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  if (currentSlice !== slice) {
    ticker.style.animation = "none";
    setTimeout(() => (ticker.style.animation = null), 10);
    currentSlice = slice;
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  document.getElementById("cupon").innerHTML =
    prizeNodes[selected].querySelector(".text").innerHTML;
  setTimeout(() => {
    document.querySelector(".popup-thanks").classList.add("active");
  }, "2000");
};

trigger.addEventListener("click", () => {
  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "none";
  runTickerAnimation();
});

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
});

const showPopup = () => {};

if (document.querySelector(".popup-thanks") !== null) {
  window.addEventListener("click", function (e) {
    if (e.target.closest(".popup__close-thanks")) {
      e.preventDefault();
      document.querySelector(".popup-thanks").classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if (
      document.querySelector(".popup-thanks.active") &&
      !e.target.closest(".popup-content")
    ) {
      document.querySelector(".popup-thanks").classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

setupWheel();

//wheel end


