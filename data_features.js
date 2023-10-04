
// Send user info to the database
async function submitRegistration() {
    try {
        const email = document.querySelector('input[name="uname"]').value;
        const password = document.querySelector('input[name="psw"]').value;

        // Create the data object to be sent
        const data = {
            email: email,
            password: password
        };

        // Add a log to see the JSON data being sent
        console.log('Sending JSON data:', data);

        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is successful
        if (response.status === 200) {
            alert('Registration successful! Redirecting to login page...');
            window.location.href = 'login.html'; // Redirect to the login page
        } else {
            // If not successful, throw an error to be caught by the catch block
            throw new Error(await response.text());
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed!');
    }
}

// Listener for the registration function
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRegistration();
    });
});

async function loginUser() {
    try {
        const email = document.querySelector('input[name="uname"]').value;
        const password = document.querySelector('input[name="psw"]').value;

        const data = {
            email: email,
            password: password
        };

        console.log('Sending JSON data:', data);

        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const jsonData = await response.json();
        if (response.status !== 200) {
            throw new Error(jsonData.message || "An error occurred");
        } else {
            window.location.href = '/index.html';
        }

    } catch (error) {
        console.error('Error:', error.message);
        alert('Login failed! Please check your credentials.');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginUser();
        });
    }
});

