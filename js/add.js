function add(){
  const form = document.getElementById('myForm');
  if (form.checkValidity()){
    event.preventDefault();
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

        let userData;

        if (currentData) {
            // Parse the JSON data into an array if it exists and is an array
            userData = Array.isArray(JSON.parse(currentData)) ? JSON.parse(currentData) : [];
        } else {
            // Initialize userData as an empty array if there's no data in localStorage
            userData = [];
        }


        const newData = {
            "FirstName": firstNameAdd,
            "LastName": lastNameAdd,
            "PhoneNumber": phoneNumberAdd,
            "Email": emailAdd,
            "ContactId" : data.id.toString()
        }

        userData.push(newData);

        localStorage.setItem("localData", JSON.stringify(userData));
        ///console.log("JSON Data in localStorage:", userData);
        update();

        //console.log("Added New Contact" + newData.FirstName + "   " + newData.LastName + "   " + newData.PhoneNumber + "  contactId " + newData.ContactId);
        })
        .catch(error =>{
        console.error('Error:', error);
        });
    }
}

const apiEnpointAdd = 'http://poosd.xyz/LAMPAPI/AddContact.php'

const addButton = document.getElementById('addButton');

addButton.addEventListener('click', add);