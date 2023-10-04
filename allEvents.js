const userId = 1;

// fetch table events and user_events
const eventsEndpoint = 'http://localhost:3000/events/';
const userEventsEndpoint = 'http://localhost:3000/users/' + userId + '/bookmarkedEvents'

const fetchEventsTable = fetch(eventsEndpoint).then(response => response.json());
const fetchUserEventsTable = fetch(userEventsEndpoint).then(response => response.json());

Promise.all([fetchEventsTable, fetchUserEventsTable]).then(
    data => {
        const [allEvents, userEvents] = data;

        allEvents.forEach((event) => {
            const category = event.category;
            const outerContainer = document.getElementById(category);
            
            // handle the case that the category is not included in the allEventList page
            if (outerContainer) {
                const container = outerContainer.querySelector('.list-expansion');

                // add event info
                const listExpansionContent = document.createElement('li');
                listExpansionContent.className = 'list-expansion-content';
                container.appendChild(listExpansionContent);

                const listExpansionContentEventInfo = document.createElement('div');
                listExpansionContentEventInfo.className = 'list-expansion-content-event-info';
                listExpansionContent.appendChild(listExpansionContentEventInfo);

                const eventName = document.createElement('h4');
                eventName.textContent = `${event.event_name}`;
                listExpansionContentEventInfo.appendChild(eventName);

                const eventVenue = document.createElement('p');
                eventVenue.textContent = `${event.venue}`;
                listExpansionContentEventInfo.appendChild(eventVenue);

                const eventTime = document.createElement('p');
                eventTime.textContent = `${formatDate(event.date)} - ${event.start_time} ~ ${event.end_time}`;
                listExpansionContentEventInfo.appendChild(eventTime);

                // add buttons
                const addAndRemoveButton = document.createElement('button');
                addAndRemoveButton.id = `${userId}-${event.event_id}-allEventList`;
                const scheduled = userEvents.some(scheduledEvent => scheduledEvent.event_id === event.event_id);
                if (scheduled) {
                    addAndRemoveButton.className = 'remove';
                    console.log(`${event.event_name} is scheduled`)
                } else {
                    addAndRemoveButton.className = 'add';
                }
                listExpansionContent.appendChild(addAndRemoveButton);

                // add separator between events
                const separator = document.createElement('hr');
                container.appendChild(separator);
            } else {
                console.log(`Fail to add event ${event.event_name}`);
            }
        });
        // EVENTLISTENER
        const addButtons = document.querySelectorAll('.add');
        const removeButtons = document.querySelectorAll('.remove');
        const buttons = Array.from(addButtons).concat(Array.from(removeButtons));
        
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                const userId = e.target.id.split('-')[0];
                const eventId = e.target.id.split('-')[1];
                if (button.className === 'add') {
                    addToSchedule(userId, eventId);
                    console.log('add');
                } else {
                    removeFromSchedule(userId, eventId);
                    console.log('remove');
                }
                buttonAnimation(button);
            })
        })
        
    })
    .catch(error => {
        console.error(error);
    })


function formatDate(isoString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date(isoString);
    
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

// control lists expansion
function toggleListExpansion(parentElement) {
    const listExpansion = parentElement.querySelector(".list-expansion");
    listExpansion.classList.toggle("show");
}

// control lists expansion
function toggleAllListExpansion(button) {
    var eventTable = button.closest(".event-table");
    const listExpansions = eventTable.querySelectorAll(".list-expansion");

    if (button.innerText === "Show all") {
        for (var listExpansion of listExpansions) {
            listExpansion.classList.add("show");
        }
        button.innerText = "Hide all";
    } else {
        for (var listExpansion of listExpansions) {
            listExpansion.classList.remove("show");
        }
        button.innerText = "Show all";
    }
}

// set button animation, the button is unclickable during animation
function buttonAnimation(button) {
    button.style.pointerEvents = 'none';
    button.classList.add('rotating');
    
    setTimeout(function() {
        if (button.className.includes('add')) {
            button.classList.remove('add');
            button.classList.add('remove');
        } else {
            button.classList.remove('remove');
            button.classList.add('add');
        }
        button.classList.remove('rotating');
        button.style.pointerEvents = 'auto';  
    }, 300);
}

// add event to the user_events table
function addToSchedule(userId, eventId) {
    fetch('http://localhost:3000/users/bookmark', {
        method: 'POST',
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
        console.error(error);
    })
}

// remove event from user_events table
function removeFromSchedule(userId, eventId) {
    fetch('http://localhost:3000/users/unbookmark', {
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
        console.error(error);
    })

}