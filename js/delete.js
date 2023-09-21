const apiEndpointDelete =  "http://poosd.xyz/LAMPAPI/DeleteContact.php"

const deleteButtons = document.querySelectorAll('#deleteButton');


deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr'); 
        const firstNameDelete = row.querySelector('td:first-child').textContent;
        const lastNameDelete = row.querySelector('td:nth-child(2)').textContent;

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
            row.remove(); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
