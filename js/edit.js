const editButtons = document.querySelectorAll('.edit-button');
const tableRows = document.querySelectorAll('#contactsTableBody tr');

editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const row = tableRows[index];

        // Check if the row is in edit mode
        const isEditMode = row.classList.contains('edit-mode');

        if (!isEditMode) {

            row.classList.add('edit-mode');
            const cells = row.querySelectorAll('td');

            cells.forEach((cell, cellIndex) => {

                if (cellIndex < cells.length - 1) {
                    const originalValue = cell.textContent;
                    const input = document.createElement('input');
                    input.value = originalValue;
                    cell.textContent = '';
                    cell.appendChild(input);
                }
            });
        } else {

            const cells = row.querySelectorAll('td');
            const updatedData = {};

            cells.forEach((cell, cellIndex) => {

                if (cellIndex < cells.length - 1) {
                    const input = cell.querySelector('input');
                    const inputValue = input.value;
                    updatedData[cellIndex === 0 ? 'FirstName' : 'Email'] = inputValue;
                    cell.innerHTML = inputValue;
                }
            });


            const apiEndpoint = 'http://poosd.xyz/LAMPAPI/UpdateContact.php';
            const updateRequest = {
                "FirstName": updatedData.FirstName,
                "LastName": updatedData.LastName,
                "Email": updatedData.Email,
                "PhoneNumber": updatedData.PhoneNumber,
                "Id": "1"
            };

            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateRequest),
            })
            .then(response => response.json())
            .then(data => {
                // Handle the API response here
                if (data.status === "success") {
                    console.log("Contact updated successfully:", data.message);
                } else {
                    console.error("Failed to update contact:", data.error);
                }
            })
            .catch(error => {
                // Handle errors that occurred during the API request
                console.error("Error while updating contact:", error);
            });

            // Remove the edit mode
            row.classList.remove('edit-mode');
        }
    });
});
