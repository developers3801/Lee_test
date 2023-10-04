const userId = 1;

// get the plan for user id = userId
fetch('http://localhost:3000/users/' + userId + '/bookmarkedEvents')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('cardContainer');
        
        // add a config button
        const edit = document.createElement('button');
        edit.className = 'edit';
        edit.id = 'schedule-editor'
        edit.textContent = 'Edit';
        container.appendChild(edit);

        data.forEach((event) => {
            const localDate = new Date(event.date).toLocaleDateString().split(' ')[0];
            console.log(localDate);

            // grouping cards by date
            if (!document.getElementById(formatDate(event.date))) {
                const separator = document.createElement('h2');
                separator.textContent = `${formatDate(event.date)}`;
                separator.id = formatDate(event.date);
                separator.className = "separator";
                container.appendChild(separator);

                const now = new Date();
                const eventDate = new Date(event.date);

                // // for testing 
                // if (eventDate.getUTCDate() === eventDate.getUTCDate() 
                // && eventDate.getUTCMonth() === eventDate.getUTCMonth()) {
                //     separator.className = "separator today";
                // }

                // real
                if (now.getDate() === eventDate.getUTCDate() 
                && now.getMonth() === eventDate.getUTCMonth()) {
                    separator.className = "separator today";
                }
            }

            // create card elements
            const card = document.createElement('div');
            card.className = 'card';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'card-content';

            const sportElement = document.createElement('h2');
            sportElement.textContent = event.event_name;
            contentDiv.appendChild(sportElement);

            const locationElement = document.createElement('p');
            locationElement.textContent = `Venue: ${event.venue}`;
            contentDiv.appendChild(locationElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = `Date: ${formatDate(event.date)}`;
            contentDiv.appendChild(dateElement);

            const timeElement = document.createElement('p');
            timeElement.textContent = `Time: ${event.start_time} ~ ${event.end_time}`;
            contentDiv.appendChild(timeElement);

            card.appendChild(contentDiv);

            // create checkbox for each event card
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${userId}-${event.event_id}`;
            checkbox.className = 'checkbox';
            checkbox.name = 'selectedEvents';
            card.appendChild(checkbox);

            container.appendChild(card);
        });

        // EVENTLISTENER
        // required const
        const allCheckboxs = document.querySelectorAll('.checkbox');
        const selectAll = document.getElementById('select-all');

        // hide and show the checkbox on cards, and the select bar at the bottom, unselect every checkbox
        edit.addEventListener("click", () => {
            edit.classList.toggle('editing');

            allCheckboxs.forEach(checkbox => {
                checkbox.classList.toggle('displayBlock');
                checkbox.checked = false;
                selectAll.textContent = 'Select all';
            });

            const selectBar = document.getElementById('select-bar');
            selectBar.classList.toggle('displayFlex');

        });

        // select or unselect all checkbox
        selectAll.addEventListener('click', () => {
            const unselectedEvents =  document.querySelectorAll('input[name="selectedEvents"]:not(:checked)');
            if (unselectedEvents.length > 0) {
                unselectedEvents.forEach((unchecked) => {
                    unchecked.checked = true;
                    selectAll.textContent = 'Unselect all';
                })
            } else {
                allCheckboxs.forEach(checkbox => {
                    checkbox.checked = false;
                    selectAll.textContent = 'Select all';
                })
            }
        })

        // check the state of all checkbox, if all checkbox are selected, change the text to "Unselect all",
        // else, change the text to "select all"
        allCheckboxs.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const unselectedEvents =  document.querySelectorAll('input[name="selectedEvents"]:not(:checked)');
                if (unselectedEvents.length > 0) {
                    selectAll.textContent = 'Select all';
                } else {
                    selectAll.textContent = 'Unselect all';
                }
            })
        })

        // remove all selected events from user_events
        const removeButton = document.getElementById('remove');
        const promises = []; 
        removeButton.addEventListener('click', () => {
            const selectedEvents =  document.querySelectorAll('input[name="selectedEvents"]:checked');
            selectedEvents.forEach((checkedEvent) => {
                const userId = checkedEvent.id.split('-')[0];
                const eventId = checkedEvent.id.split('-')[1];
                promises.push(removeFromDatabase(userId, eventId));
            })
            Promise.all(promises).then(() => {
                location.reload(true);
            })
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
});


// FUNCTIONS
// formatting the date representation 
function formatDate(isoString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date(isoString);
    
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

function removeFromDatabase(userId, eventId) {
    return fetch('http://localhost:3000/users/unbookmark', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          event_id: eventId
        })
    })
    .then(response => {
        if (!response.ok) {
            console.log('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error: ', error);
    })

}