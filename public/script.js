
// Save Comments in sqlDB 
async function handleFormSubmit(id) {
    event.preventDefault();
    let element = document.getElementById(`input${id}`);
    console.log(element.value);
    
    const comment = document.getElementById(`input${id}`).value;
    try {
        const response = await fetch(`/api/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment })
        });


        if (!response.ok) {
            const res = response.json();
            console.error('Error:', res[message])
        }

    } catch (error) {
        console.error('Fehler beim Senden der Daten:', error);
    }

    document.getElementById(`input${id}`).value = ""
    openPost(id)
}

// Load comments and open Post 

function openPost(id) {
    const activeElements = document.querySelectorAll(".active");
    activeElements.forEach((element) => {
        element.classList.remove("active");
    })

    const div = document.getElementById(`imgcontainer${id}`); 
    div.classList.toggle("active");
    fetch(`/api/${id}`).then(response => response.json()).then(data => {
        const commentsContainer = document.getElementById(`comments${id}`);
        let commentsData = "";
        data.forEach((comment) => {
            commentsData = `<div class="comment">
                        <img src="Grafics/Icons/profile-circle.512x511.png" alt="">
                        <p>${comment["comment"]}</p>
                    </div>` + commentsData;
        });
        commentsContainer.innerHTML = commentsData + '<div class="end"><p>No Comments Left!</p></div>';
    }).catch(error => {
        console.error('Error:', error);
    });
}


// Login / Register Page
function openLogin() {
    const element = document.getElementById(`register`)
    element.classList.remove("registeractive");
    const login = document.getElementById(`login`); 
    login.classList.toggle("loginactive");
}

const element = document.getElementById(`login`);
element.classList.toggle("loginactive");

function openRegister() {
    const element = document.getElementById(`login`)
    element.classList.remove("loginactive");
    const login = document.getElementById(`register`); 
     login.classList.toggle("registeractive");
}

// Login design

const inputs = document.querySelectorAll('input.input-errors[type="text"], input.input-errors[type="password"]');
const errormessages = document.querySelectorAll('.hide-errormessage')

inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        const errormessage = errormessages[index];

        if (input.value.length < 8) {
            input.style.borderBottom = "2px solid rgb(194, 0, 0)";
            errormessage.textContent = 'Das sind nicht 8 Zeichen';
            errormessage.classList.add('show-errormessage');
            
        }

        else if (input.value.length > 7) {
            errormessage.classList.remove('show-errormessage');
            input.style.borderBottom = "2px solid rgb(51, 255, 0)";
            errormessage.classList.add('hide-errormessage');
        }
    });
})

// Login System

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('register-username').value;
    const name = document.getElementById('register-name').value;
    const password = document.getElementById('register-password').value;

    console.log(username, name, password, 'Hallo')

    fetch(`/api/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler bei der Registrierung: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Erfolgreich registriert:', data);
        alert('Erfolgreich registriert!');
    })
    .catch(error => {
        console.error('Fehler bei der Registrierung:', error);
        alert('Fehler bei der Registrierung: ' + error.message);
    });
});

async function register() {
    event.preventDefault();

    let username = document.getElementById('register-username').value;
    let name = document.getElementById('register-name').value;
    let password = document.getElementById('register-password').value;
    
    try {
        const response = await fetch(`/apii/${username}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, password })
        });


        if (!response.ok) {
            const res = response.json();
            console.error('Error:', res)
        }

    } catch (error) {
        console.error('Fehler beim Senden der Daten:', error);
    }
    document.getElementById('register-username').value = "";
    document.getElementById('register-name').value = ""
    document.getElementById('register-password').value = ""
}