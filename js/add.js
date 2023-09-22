function add(){
  const firstNameAdd = document.getElementById('firstNameAdd').value
  const lastNameAdd = document.getElementById('lastNameAdd').value
  const emailAdd = document.getElementById('emailAdd').value
  const phoneNumberAdd = document.getElementById('phoneNumberAdd').value

  const addRequest = {
      "FirstName": firstNameAdd,
      "LastName": lastNameAdd,
      "Email": emailAdd,
      "PhoneNumber": phoneNumberAdd,
      "userId": sessionStorage.getItem("user_id")
    };

    // Call API
    fetch(apiEnpointAdd, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(addRequest),
    }).then(response => response.json())
    .then(data => {
      document.getElementById('firstNameAdd').value = '';
      document.getElementById('lastNameAdd').value = '';
      document.getElementById('emailAdd').value = '';
      document.getElementById('phoneNumberAdd').value = '';
  
      // Append Local Copy
  
      const currentData = localStorage.getItem("localData");
  
  
      var userData = currentData ? JSON.parse(currentData) : [];
  
      const newData = {
        "FirstName": firstNameAdd,
        "LastName": lastNameAdd,
        "PhoneNumber": phoneNumberAdd,
        "Email": emailAdd,
        "ContactID" : data.id
      }

      userData.push(newData);

      localStorage.setItem("localData", JSON.stringify(userData));

      update();

      console.log("Added New Contact");
    })
    .catch(error =>{
      console.error('Error:', error);
    });
}

const apiEnpointAdd = 'http://poosd.xyz/LAMPAPI/AddContact.php'

const addButton = document.getElementById('addButton');

addButton.addEventListener('click', add);