function edit(ContactID) {
    const row = document.getElementById(ContactID);
    const tds = row.querySelectorAll('td');
  
    // Function to toggle the contenteditable attribute and style
    function toggleContentEditable() {
      tds.forEach((td, index) => {
        if (index < tds.length - 1) {
          const isEditable = td.getAttribute('contenteditable') === 'true';
          td.contentEditable = isEditable ? 'false' : 'true';
          td.classList.toggle('editable', !isEditable); // Apply the 'editable' class
        }
      });
    }
  
    // Toggle contenteditable and apply styles
    toggleContentEditable();
  
    if (tds[0].contentEditable == 'false') {
      const editRequest = {
        "FirstName": tds[0].textContent,
        "LastName": tds[1].textContent,
        "Email": tds[2].textContent,
        "PhoneNumber": tds[3].textContent,
        "Id": ContactID
      };
  
      fetch(apiEndpointEdit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editRequest),
      })
        .then(response => response.json())
        .then(data => {
          const currentData = localStorage.getItem("localData");
          let userData;
  
          if (currentData) {
            userData = Array.isArray(JSON.parse(currentData)) ? JSON.parse(currentData) : [];
          } else {
            userData = [];
          }
  
          const index = userData.findIndex(item => item.ContactId === ContactID);
  
          if (index !== -1) {
            userData[index] = {
              ...userData[index],
              ...editRequest
            };
          }
  
          localStorage.setItem("localData", JSON.stringify(userData));
          update();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  
  const apiEndpointEdit = "http://poosd.xyz/LAMPAPI/UpdateContact.php";
  