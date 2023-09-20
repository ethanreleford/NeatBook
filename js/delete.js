const apiEndpointDelete =  "http://poosd.xyz/LAMPAPI/DeleteContact.php"

const deleteButtons = document.querySelectorAll('deleteButton');

// Attach a click event listener to each delete button
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr'); 
        const firstNameDelete = row.querySelector('').textContent;
        const lastNameDelete = row.querySelector('').textContent;

        const deleteRequest = {
            "userId": "1",
            "FirstName": firstNameDelete,
            "LastName": lastNameDelete
        };

        fetch(apiEndpointDelete, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteRequest),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data or update the UI as needed
            row.remove(); // Remove the row from the table on successful deletion
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
