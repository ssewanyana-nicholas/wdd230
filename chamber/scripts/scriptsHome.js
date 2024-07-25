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

const membersUrl = 'https://ssewanyana-nicholas.github.io/wdd230/chamber/data/members.json';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=0.31&lon=32.59&units=imperial&appid=99990204cea55bff7337537fe3fbbcc4';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=0.31&lon=32.59&units=imperial&appid=99990204cea55bff7337537fe3fbbcc4';

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchMemberData();
    setupBanner();
    checkLinks();
});

let slideIndex = 0;

function fetchWeatherData() {
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-temp').textContent = `${data.main.temp}°F`;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherIcon.alt = data.weather[0].description;
            document.getElementById('weather-description').textContent = data.weather[0].description;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastList = document.getElementById('forecast-list');
            forecastList.innerHTML = '';

            const forecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // Get daily forecasts
            forecasts.forEach(forecast => {
                const li = document.createElement('li');
                li.textContent = `Day ${new Date(forecast.dt_txt).toLocaleDateString()}: ${forecast.main.temp}°F, ${forecast.weather[0].description}`;
                forecastList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

function fetchMemberData() {
    fetch(membersUrl)
        .then(response => response.json())
        .then(members => {
            const spotlightContainer = document.getElementById('spotlight-container');
            const eligibleMembers = members.filter(member => member.membershiplevel === 'Gold Membership' || member.membershiplevel === 'Silver Membership');

            function loadSpotlights() {
                spotlightContainer.innerHTML = ''; // Clear previous spotlights
                const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
                shuffledMembers.forEach(member => {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = 'slide';

                    const img = document.createElement('img');
                    img.src = member.imageurl;
                    img.alt = member.businessname;
                    slideDiv.appendChild(img);

                    const businessName = document.createElement('h3');
                    businessName.textContent = member.businessname;
                    slideDiv.appendChild(businessName);

                    const address = document.createElement('p');
                    address.textContent = member.address;
                    slideDiv.appendChild(address);

                    const phone = document.createElement('p');
                    phone.textContent = `Phone: ${member.phone}`;
                    slideDiv.appendChild(phone);

                    const website = document.createElement('a');
                    website.href = member.website;
                    website.textContent = member.website;
                    website.target = '_blank';
                    slideDiv.appendChild(website);

                    const otherInfo = document.createElement('p');
                    otherInfo.textContent = member.otherinformation;
                    slideDiv.appendChild(otherInfo);

                    // New element for membership level
                    const membershipLevel = document.createElement('p');
                    membershipLevel.className = 'membership-level';
                    membershipLevel.textContent = `Membership Level: ${member.membershiplevel}`;
                    slideDiv.appendChild(membershipLevel);

                    spotlightContainer.appendChild(slideDiv);
                });

                showSlides(slideIndex);
            }

            loadSpotlights();
            setInterval(loadSpotlights, 2000); // Reload spotlights every 20 seconds
        })
        .catch(error => console.error('Error fetching member data:', error));
}

function setupBanner() {
    const banner = document.getElementById('meet-greet-banner');
    const closeButton = document.getElementById('close-banner');
    const today = new Date().getDay();

    if (today >= 1 && today <= 3) { // Show banner on Monday, Tuesday, and Wednesday
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }

    closeButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

function checkLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        fetch(link.href)
            .then(response => {
                if (!response.ok) {
                    console.error(`Link not working: ${link.href}`);
                }
            })
            .catch(() => console.error(`Link not working: ${link.href}`));
    });
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}
