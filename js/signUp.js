    // JavaScript code for handling login
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input values
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Replace these temporary values with your actual login API logic
        const apiUrl = '../LAMPAPI/SignUp.php';
        const requestBody = {
            FirstName: firstName,
            LastName: lastName,
            Login: username,
            Password: password
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
                sessionStorage.setItem("firstName", firstName);
                sessionStorage.setItem("lastName", lastName);

                fadeOut("../");
            } else {
                userExists(username);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

function userExists(username){
    const usernameContainer = document.getElementById('usernameContainer');
    const errorMessage = document.getElementById('errorMessage');

    // Remove any existing error message
    const existingErrorMessage = document.getElementById('errorMessage');
    if(existingErrorMessage) existingErrorMessage.remove();

    errorMessage.textContent = 'Username is already taken!';
    errorMessage.style.display = 'inline'; // Show the error message

    // Append the error message to the username container
    usernameContainer.appendChild(errorMessage);
  }