// JavaScript code for handling login
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    // Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Replace these temporary values with your actual login API logic
    const apiUrl = '../LAMPAPI/Login.php';
    const requestBody = {
        login: username,
        password: password
    };

    // Send a POST request to your login API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the API response here
        if (data.id != 0) {
            sessionStorage.setItem("user_id", data.id);
            sessionStorage.setItem("firstName", data.firstName);
            sessionStorage.setItem("lastName", data.lastName);

            fadeOut("../");
        } else {
            loginFailed();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function loginFailed()
{
    const usernameContainer = document.getElementById('usernameContainer');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = 'Username/Password Incorrect!';
    errorMessage.style.display = 'inline'; // Show the error message

    usernameInput.style.borderColor = '#d43900';
    passwordInput.style.borderColor = '#d43900';
}