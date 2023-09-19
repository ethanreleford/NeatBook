const firstNameAdd = document.getElementById('firstNameAdd').value

const lastNameAdd = document.getElementById('lastNameAdd').value

const emailAdd = document.getElementById('emailAdd').value

const phoneNumberAdd = document.getElementById('phoneNumberAdd').value

const apiEnpointAdd = 'http://poosd.xyz/LAMPAPI/AddContact.php'

const addButton = document.getElementById('addButton');


addButton.addEventListener('click', function() {
const addRequest = {
    "FirstName": firstNameAdd,
    "LastName": lastNameAdd,
    "Email": emailAdd,
    "PhoneNumber": phoneNumberAdd,
    "userId": "1"
  };

  fetch(apiEnpointAdd, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(addRequest),
  }).then(response > response.json())
  .then(data => {
    
  })
  .catch(error =>{
    console.error('Error:', error);
  });
});