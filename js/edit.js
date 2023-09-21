const apiEndpointUpdate = 'http://poosd.xyz/LAMPAPI/UpdateContact.php';



const editButtons = document.querySelectorAll('#editButton');


editButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr'); 
        const contentEditableElements = row.querySelectorAll('[contenteditable]');

        // Toggle the contenteditable attribute for each element
        contentEditableElements.forEach(element => {
            element.contentEditable = element.contentEditable === 'true' ? 'false' : 'true';
        });
        console.log('im in there dog');
if(contentEditableElements[0].contentEditable == 'false'){
        console.log('yea im in there dog');
const updateRequest = {
    "FirstName": row.querySelector('td:first-child').innerText,
    "LastName": row.querySelector('td:nth-child(2)').innerText,
    "Email": row.querySelector('td:nth-child(3)').innerText,
    "PhoneNumber":  row.querySelector('td:nth-child(4)').innerText,
    "Id": "1"
}

fetch(apiEndpointUpdate, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateRequest),
  }).then(response => response.json())
  .then(data => {
    console.log('it workeddddd!!!!');
  }).catch(error => {
        console.error('Error:', error);
});


}

});


});