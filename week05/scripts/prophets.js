
// URL to fetch the JSON data from
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the container where prophet cards will be displayed
const cards = document.querySelector('#cards');

// Function to fetch data from the JSON URL
async function getProphetData(url) {
    try {
        // Fetch data from the URL
        const response = await fetch(url);

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Convert the response to JSON format
        const data = await response.json();

        // Call the displayProphets function with the prophets data
        displayProphets(data.prophets); // Note: accessing the prophets array from JSON data
    } catch (error) {
        // Handle errors if any occur during fetch or JSON conversion
        console.error('Error fetching data:', error);
    }
}

// Function to display prophet data on the webpage
function displayProphets(prophets) {
    // Iterate through each prophet in the prophets array
    prophets.forEach((prophet) => {
        // Create elements for each prophet card
        let card = document.createElement('section'); // Create a <section> element for the card
        let fullName = document.createElement('h2'); // Create an <h2> element for full name
        let portrait = document.createElement('img'); // Create an <img> element for portrait
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        // Set content and attributes for the fullName <h2> element
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Set attributes for the portrait <img> element
        portrait.src = prophet.imageurl; // Set src attribute to the prophet's image URL
        portrait.alt = `Portrait of ${prophet.name} ${prophet.lastname}`; // Set alt attribute for accessibility
        birthdate.textContent = `Date of birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of birth: ${prophet.birthplace}`;
        portrait.loading = 'lazy'; // Set loading attribute to lazy load the image
        portrait.width = '340'; // Set width attribute for the image (adjust as needed)
        portrait.height = '440'; // Set height attribute for the image (adjust as needed)

        // Append the fullName <h2> and portrait <img> elements to the card <section>
        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        // Append the card <section> to the #cards container in the HTML
        cards.appendChild(card);
    });
}

// Call getProphetData to initiate fetching and displaying the prophets data
getProphetData(url);
