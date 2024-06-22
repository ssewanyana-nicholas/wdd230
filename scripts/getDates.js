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
