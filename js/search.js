const searchInput = document.getElementById('searchInput');
const contactsTableBody = document.getElementById('contactsTableBody');
const firstNameDisplay = document.getElementById('firstNameDisplay');

function fetchAndDisplayContacts(searchTerm) {
    const apiEndpointSearch = 'http://poosd.xyz/LAMPAPI/SearchContacts.php';
    const searchRequest = {
        search: searchTerm,
        userId: "1",
    };

    fetch(apiEndpointSearch, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchRequest),
    })
    .then(response => response.json())
    .then(data => {
        contactsTableBody.innerHTML = '';
        if (data.results && Array.isArray(data.results)) {
            data.results.forEach(contact => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${contact.FirstName}</td>
                    <td>${contact.LastName}</td>
                    <td>${contact.Email}</td>
                    <td>${contact.PhoneNumber}</td>
                    <td>
                        <button class="optionButton" id="editButton">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="optionButton" id="deleteButton">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </td>
                `;
                contactsTableBody.appendChild(newRow);
            });
        } else {
            console.error('Invalid API response format');
        }
    })
    .catch(error => {
        console.error('Error fetching contacts:', error);
    });
}


searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();
    fetchAndDisplayContacts(searchTerm);
});


fetchAndDisplayContacts("");


const storedFirstName = sessionStorage.getItem('firstName');
if (storedFirstName) {
    firstNameDisplay.textContent = storedFirstName.toUpperCase();
}