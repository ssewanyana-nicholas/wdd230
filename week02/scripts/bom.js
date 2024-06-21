// Declare three const variables that hold references to the input, button, and list elements
const input = document.getElementById('favchap');
const button = document.querySelector('button[type="submit"]');
const list = document.getElementById('list');

// Add an event listener to the button to call addChapter when clicked
button.addEventListener('click', addChapter);

function addChapter() {
    const chapter = input.value.trim();

    // Check if the input is not blank
    if (chapter === "") {
        // If the input is blank, do nothing and return the focus to the input field
        alert("Please enter a book and chapter."); // Optional alert message
        input.focus();
        return;
    }

    // Create a new li element
    const li = document.createElement('li');

    // Populate the li element's textContent with the input value
    li.textContent = chapter;

    // Create a delete button
    const deleteButton = document.createElement('button');

    // Populate the button's textContent with a ❌
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete';

    // Append the li element with the delete button
    li.appendChild(deleteButton);

    // Append the li element to the unordered list
    list.appendChild(li);

    // Add an event listener to the delete button that removes the li element when clicked
    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
    });

    // Send the focus to the input element
    input.focus();

    // Change the input value to an empty string to clean up the interface for the user
    input.value = '';
}
