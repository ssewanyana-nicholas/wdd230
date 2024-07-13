// Base URL of your GitHub Pages site
const baseURL = "https://ssewanyana-nicholas.github.io/wdd230/";

// URL to the links.json data file
const linksURL = `${baseURL}data/links.json`;

// Asynchronous function to fetch links data from the JSON file
async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayLinks(data); // Call displayLinks to process and display data
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

// Function to display links
function displayLinks(weeks) {
    const container = document.getElementById('learningActivities'); // Assuming your HTML has a <ul> with id 'learningActivities'

    weeks.weeks.forEach(week => {
        // Create list item for week title
        const weekItem = document.createElement('li');
        weekItem.textContent = `${week.week}: `;

        // Create span to hold links
        const linksSpan = document.createElement('span');

        // Add each link as an anchor element
        week.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url.startsWith('http') ? link.url : `${baseURL}${link.url}`;
            linkElement.textContent = link.title;
            linksSpan.appendChild(linkElement);

            if (index < week.links.length - 1) {
                linksSpan.appendChild(document.createTextNode(' | '));
            }
        });

        // Append linksSpan to weekItem
        weekItem.appendChild(linksSpan);

        // Append weekItem to container
        container.appendChild(weekItem);
    });
}

// Call the getLinks function to fetch and display the links
getLinks();
