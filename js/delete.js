function Delete(ContactID) {
    // 1. Call API to delete contactID
    const deleteRequest = {
        "Id" : ContactID
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
    // 2. Remove object from local JSON table
        var currentData = JSON.parse(localStorage.getItem('localData'));
        console.log("ContactID to Remove: ", ContactID);

        currentData = currentData.filter(contact => contact.ContactId !== ContactID);

        localStorage.setItem('localData', JSON.stringify(currentData))
    // 3. Call update

    update();

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const apiEndpointDelete = "http://poosd.xyz/LAMPAPI/DeleteContact.php";

const deleteButtons = document.querySelectorAll('.deleteButton');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr');
        Delete(row.id);
    });
});