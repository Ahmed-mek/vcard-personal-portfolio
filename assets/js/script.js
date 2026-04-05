'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    const categories = filterItems[i].dataset.category.split(',').map(c => c.trim().toLowerCase());

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (categories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// project details fetch routing
const projectDetailsArticle = document.querySelector("[data-page='project-details']");
const projectItems = document.querySelectorAll("[data-filter-item]");
const markdownContainer = document.querySelector("[data-markdown-container]");
const projectDetailsBackBtn = document.querySelector("[data-project-details-back]");
const projectPageTitle = document.querySelector("[data-project-page-title]");

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", async function (e) {
    e.preventDefault();
    
    const fileName = this.dataset.projectFile;
    const projectTitle = this.querySelector(".project-title").innerText;
    
    if (!fileName) {
      alert("Project details not available yet.");
      return;
    }

    // Set title and loading text
    projectPageTitle.innerText = projectTitle;
    markdownContainer.innerHTML = "<p>Loading project details...</p>";

    // Hide all other pages
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
      navigationLinks[j]?.classList.remove("active");
    }

    // Show project details page
    projectDetailsArticle.classList.add("active");
    window.scrollTo(0, 0);

    // Fetch and parse markdown
    try {
      const response = await fetch(`./projects-md/${fileName}.md`);
      if (!response.ok) throw new Error("File not found");
      const text = await response.text();
      markdownContainer.innerHTML = marked.parse(text);
    } catch (error) {
      markdownContainer.innerHTML = `<p>Error loading project details: ${error.message}. Please try again later.</p>`;
    }
  });
}

// Back button functionality
projectDetailsBackBtn?.addEventListener("click", function () {
  projectDetailsArticle.classList.remove("active");
  
  // Reactivate portfolio page
  for (let j = 0; j < pages.length; j++) {
    if (pages[j].dataset.page === "portfolio") {
      pages[j].classList.add("active");
      for (let k = 0; k < navigationLinks.length; k++) {
        if (navigationLinks[k].innerHTML.toLowerCase() === "portfolio") {
           navigationLinks[k].classList.add("active");
        }
      }
    }
  }
  window.scrollTo(0, 0);
});