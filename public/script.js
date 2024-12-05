

function handleFormSubmit(id) {
    event.preventDefault();
    let element = document.getElementById(`input${id}`);
    console.log(element.value);
    document.getElementById(`input${id}`).value = "";
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
            commentsData += `<div class="comment">
                        <i class="fas fa-user fa-5x" id="icon"></i>
                        <p>${comment["comment"]}</p>
                    </div>`;
        });
        commentsContainer.innerHTML = commentsData + '<div class="end"><p>No Comments Left!</p></div>';
    }).catch(error => {
        console.error('Error:', error);
    });
}

function openLogin() {
    const element = document.getElementById(`register`)
    element.classList.remove("registeractive");
    console.log("Hello")
    const login = document.getElementById(`login`); 
    login.classList.toggle("loginactive");
}

const element = document.getElementById(`login`);
element.classList.toggle("loginactive");

function openRegister() {
    const element = document.getElementById(`login`)
    element.classList.remove("loginactive");
    console.log("Hello")
    const login = document.getElementById(`register`); 
    login.classList.toggle("registeractive");
}

