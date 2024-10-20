document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
});

const hamburger = document.querySelector(".menu");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

hamburger.addEventListener("click", function () {
  this.classList.toggle("opened");
  this.setAttribute("aria-expanded", this.classList.contains("opened"));

  if (this.classList.contains("opened")) {
    navMenu.classList.add("show");
  } else {
    navMenu.classList.remove("show");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("show");
    hamburger.classList.remove("opened");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

let currentPage = 1;
let itemsPerPage = 6;
let allItems = document.querySelectorAll(".feature-item");
let filteredItems = [...allItems];

function showPage(page, items) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  allItems.forEach((item) => {
    item.style.display = "none";
  });

  items.forEach((item, index) => {
    if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
      item.style.display = "block";
    }
  });

  document.getElementById(
    "pageNumber"
  ).textContent = `Halaman ${page} dari ${totalPages}`;

  document.querySelector(".prev").disabled = page === 1;
  document.querySelector(".next").disabled = page === totalPages;
}

function nextPage() {
  currentPage++;
  showPage(currentPage, filteredItems);
}

function prevPage() {
  currentPage--;
  showPage(currentPage, filteredItems);
}

function filterCategory(category) {
  currentPage = 1;

  if (category === "semua") {
    filteredItems = [...allItems];
  } else {
    filteredItems = Array.from(allItems).filter((item) =>
      item.classList.contains(category)
    );
  }

  showPage(currentPage, filteredItems);
}

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    filterCategory(category);
  });
});

showPage(currentPage, filteredItems);

let calcScrollValue = () => {
  let scrollProgress = document.querySelector(".progress");
  let progressValue = document.querySelector(".progress-value");
  let pos = document.documentElement.scrollTop;
  // console.log(pos)
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  // console.log(calcHeight)
  let scrollValue = Math.round((pos * 100) / calcHeight);
  // console.log(scrollValue);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
    scrollProgress.classList.add("visible");
  } 
  else {
    scrollProgress.classList.remove("visible");
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#1ab92da5 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//form
function handleGetFormData() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    zipCode: document.getElementById("zip-code").value,
    status: document.getElementById("status").checked,
  };
}

function isNumber(str) {
  return !isNaN(str);
}

function checkboxIsChecked() {
  return document.getElementById("status").checked;
}

function validateFormData(formData) {
  return formData !== null && isNumber(formData.zipCode) && checkboxIsChecked();
}

function submit() {
  const data = handleGetFormData();
  const checkValid = validateFormData(data);
  console.log("check", checkValid);
  const errEl = document.getElementById("warning");

  if (!checkValid) {
    errEl.innerHTML = "Periksa form anda sekali lagi";
    errEl.style.opacity = "1";
    console.log(data);
    alert("Periksa kembali form anda!");
  } else {
    errEl.innerHTML = "";
    console.log(data);
    alert("Anda berhasil bergabung!");
    location.reload();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function logSubmit(event) {
    event.preventDefault();
    submit();
  }

  const form = document.getElementById("form");
  form.addEventListener("submit", logSubmit);
});
