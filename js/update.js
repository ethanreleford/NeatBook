function update(){
    // Step 1: Retrieve the JSON string from localStorage
    const jsonUserData = JSON.parse(localStorage.getItem('localData'));
   
    document.getElementById("contactsTableBody").innerHTML = '';
    
    for (let user of jsonUserData){
       //console.log("contactId = " + user.ContactId);
       const newRow = document.createElement('tr');
       newRow.setAttribute('id', user.ContactId);
        newRow.innerHTML = `
            <td contenteditable="false">${user.FirstName}</td>
            <td contenteditable="false">${user.LastName}</td>
            <td contenteditable="false">${user.Email}</td>
            <td contenteditable="false">${user.PhoneNumber}</td>
            <td>
                <button class="optionButton editButton">
                    <span class="material-icons">edit</span>
                </button>
                <button class="optionButton deleteButton" >
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </td>
        `;
        contactsTableBody.appendChild(newRow);
   
        document.getElementById(user.ContactId).getElementsByClassName('deleteButton')[0].addEventListener('click', function() {
           const row = this.closest('tr');
           Delete(row.id);
       });
    }
   }