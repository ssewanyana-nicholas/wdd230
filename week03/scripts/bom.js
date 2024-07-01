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

let chaptersArray = getChapterList() || [];
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', () => {
    if (input.value != '') {  // make sure the input is not empty
        displayList(input.value); // call the function that outputs the submitted chapter
        chaptersArray.push(input.value);  // add the chapter to the array
        setChapterList(); // update the localStorage with the new array
        input.value = ''; // clear the input
        input.focus(); // set the focus back to the input
    }
});

function displayList(item) {
    let li = document.createElement('li');
    let deletebutton = document.createElement('button');
    li.textContent = item; // note the use of the displayList parameter 'item'
    deletebutton.textContent = '❌';
    deletebutton.classList.add('delete'); // this references the CSS rule .delete{width:fit-content;} to size the delete button
    li.append(deletebutton);
    list.append(li);
    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent); // note this new function that is needed to remove the chapter from the array and localStorage.
        input.focus(); // set the focus back to the input
    });
    console.log('I like to copy code instead of typing it out myself and trying to understand it.');
}

function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

chapter = chapter.slice(0, chapter.length - 1); // this slices off the last character

chaptersArray = chaptersArray.filter((item) => item !== chapter);

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

