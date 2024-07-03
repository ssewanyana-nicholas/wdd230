let slideIndex3 = 0;
showAutoSlides();

function showAutoSlides() {
    let q;
    let slides3 = document.getElementsByClassName("mySlides3");
    let dots3 = document.getElementsByClassName("dot3");
    for (q = 0; q < slides3.length; q++) {
        slides3[q].style.display = "none";
    }
    slideIndex3++;
    if (slideIndex3 > slides3.length) { slideIndex3 = 1 }
    for (q = 0; q < dots3.length; q++) {
        dots3[q].className = dots3[q].className.replace(" active", "");
    }
    slides3[slideIndex3 - 1].style.display = "grid";
    dots3[slideIndex3 - 1].className += " active";
    setTimeout(showAutoSlides, 2000); // Change image every 5 seconds
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Set the current year in the first paragraph
    document.getElementById('copyright').innerHTML = `&copy; ${currentYear} Nicholas Ssewanyana, Uganda- kampala`;

    // Get the last modified date
    const lastModifiedDate = document.lastModified;
    // Set the last modified date in the second paragraph
    document.getElementById('lastModified').innerHTML = `Last Modification: ${lastModifiedDate}`;
});

const harmburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
const myBttn = document.querySelector('#darkButton');
const main = document.querySelector('main');

harmburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    harmburgerElement.classList.toggle('open');
});

myBttn.addEventListener('click', () => {
    main.classList.toggle('dark');
});

// 1️⃣ Initialize display element variable
const visitsDisplay = document.querySelector(".visits");

// 2️⃣ Get the stored VALUE for the numVisits-ls KEY in localStorage if it exists. If the numVisits KEY is missing, then assign 0 to the numVisits variable.
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

// 3️⃣ Determine if this is the first visit or display the number of visits. We wrote this example backwards in order for you to think deeply about the logic.
if (numVisits !== 0) {
    visitsDisplay.textContent = numVisits;
} else {
    visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
}

// 4️⃣ increment the number of visits by one.
numVisits++;

// 5️⃣ store the new visit total into localStorage, key=numVisits-ls
localStorage.setItem("numVisits-ls", numVisits);

// 💡A client can view the localStorage data using the Applications panel in the browsers's DevTools - check it out on any major site.
