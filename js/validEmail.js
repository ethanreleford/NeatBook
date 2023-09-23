// Function to validate the input when the text box loses focus.
function validateOnBlur() {
    let inputField = document.getElementById('emailAdd').value;
    let error = document.getElementById('error');

    if(!inputField.includes('@')) {
        error.textContent = 'Input must contain an "@" symbol.';
        alert('Input must contain an "@" symbol.'); // Popup Alert
    } else {
        error.textContent = '';
    }
}

// Attach the validateOnBlur function to the blur event of the text box.
document.getElementById('emailAdd').addEventListener('blur', validateOnBlur);

// Handle form submission.
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the form from submitting the traditional way.

    let inputField = document.getElementById('emailAdd').value;
    let error = document.getElementById('error');

    if(inputField.includes('@')) {
        error.textContent = '';
        alert('Input is valid!');
        // Perform form submission or other actions here if needed.
    } else {
        error.textContent = 'Input must contain an "@" symbol.';
    }
});