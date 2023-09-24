function update(){
    // Step 1: Retrieve the JSON string from localStorage
    const jsonUserData = JSON.parse(localStorage.getItem('localData'));

    document.getElementById("contactsTableBody").innerHTML = '';

    for (let user of jsonUserData){
       //console.log("contactId = " + user.ContactId);
       const newRow = document.createElement('tr');
       newRow.setAttribute('id', user.ContactId);
       var emailPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
       var phonePattern = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
        newRow.innerHTML = `
            <form>
            <td><div contenteditable="false" class = "editInput" role="textbox" maxlength="50">${user.FirstName}</div></td>
            <td><div contenteditable="false class = "editInput" role="textbox" maxlength="50">${user.LastName}</div></td>
            <td><div contenteditable="false class = "editInput phoneNumber" role="textbox" maxlength="50" pattern=${emailPattern}>${user.Email}</div></td>
            <td><div contenteditable="false class = "editInput" role="textbox" maxlength="50">${user.PhoneNumber}</div></td>
            <td style="display: flex;">
                <button class="optionButton editButton">
                    <span class="material-icons">edit</span>
                </button>
                <button class="optionButton deleteButton" >
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </td>
            </form>
        `;
        contactsTableBody.appendChild(newRow);

        const phoneNumber = document.getElementById(user.ContactId).getElementsByClassName('phoneNumber')[0];
        phoneNumber.addEventListener('keydown',enforceFormat);
        phoneNumber.addEventListener('keyup',formatToPhone);

        document.getElementById(user.ContactId).getElementsByClassName('deleteButton')[0].addEventListener('click', function() {
            const row = this.closest('tr');
            Delete(row.id);
        });

       document.getElementById(user.ContactId).getElementsByClassName('editButton')[0].addEventListener('click', function() {
            const row = this.closest('tr');
            edit(row.id);
        });
    }
   }