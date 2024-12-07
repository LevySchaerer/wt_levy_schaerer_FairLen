
async function handleFormSubmit(id) {
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
}

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