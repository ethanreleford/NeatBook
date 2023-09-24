function edit(ContactID) {
    const row = document.getElementById(ContactID);
    const tds = row.querySelectorAll('td');

    // Function to toggle the contenteditable attribute and style
    function toggleContentEditable() {
      const saveBtn = row.querySelector('.editButton');
      const span = saveBtn.querySelector('span');

      const phoneNumber = row.querySelector('.phoneNumber');
      tds.forEach((td, index) => {
        if (index < tds.length - 1) {
          const isEditable = td.querySelector("div").getAttribute('contenteditable') === 'true';
          td.querySelector("div").contentEditable = isEditable ? 'false' : 'true';
          td.querySelector("div").classList.toggle('editable', !isEditable); // Apply the 'editable' class
        }
      });

      if (tds[0].querySelector("div").getAttribute('contenteditable') == 'true') {
        span.className = "material-symbols-outlined";
        span.innerHTML = "save";

        console.log(phoneNumber);

        phoneNumber.addEventListener('keydown', enforceFormat);
        phoneNumber.addEventListener('keyup', formatToPhone);
      }
      else {
        span.className = "material-icons";
        span.innerHTML = "edit";
      }
    }

    // Toggle contenteditable and apply styles
    toggleContentEditable();



    if (tds[0].querySelector("div").contentEditable == 'false') {
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
