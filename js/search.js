const searchInput = document.getElementById('searchInput');
const contactsTableBody = document.getElementById('contactsTableBody');
const firstNameDisplay = document.getElementById('firstNameDisplay');

function fetchAndDisplayContacts(searchTerm) {
    const apiEndpointSearch = 'http://poosd.xyz/LAMPAPI/SearchContacts.php';
    const searchRequest = {
        search: searchTerm,
        userId: sessionStorage.getItem("user_id")
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

        //Access the results property of the response
        const results = data.results

        if(results){
            localStorage.setItem("localData", JSON.stringify(results));
        } else{
            localStorage.setItem("localData", JSON.stringify(""));
        }

        console.log("Fetched Contacts: ", results);
        update();
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