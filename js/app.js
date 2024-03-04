let mainContent = document.querySelector('.main-content')


const URL_API = "http://localhost:3000/"
const myHeader = new Headers({
    "Content-type": "application/json"
});

/**
* Performs a GET request using a provided endpoint to get data.
* @param {String} endpoint The endpoint to be used for the request.
* @returns {Promise<object>} A promise that resolves with the JSON response data from the server.
    * @throws {Error} Throws an error if something fails during the request.
    */
async function getProducts(endpoint) {
    try {
        const response = await fetch(`${URL_API}${endpoint}`)
        if (!response.ok) {
            throw new Error("Error en la petición.")
        }
        return await response.json()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
* Performs a POST request using a provided endpoint to add data.
* @param {string} endpoint The endpoint to be used for the request.
* @param {Object} data The data of the product to be added, in JSON object format.
* @returns {Promise<Object>} A promise that resolves with the JSON response data from the server.
    * @throws {Error} Throws an error if something fails during the request.
    */
async function postProducts(endpoint, data) {
    try {
        const response = await fetch(`${URL_API}${endpoint}`,
            {
                method: "POST",
                headers: myHeader,
                body: JSON.stringify(data)
            }
        )
        if (!response.ok) {
            throw new Error("Error en la petición.")
        }
        return await response.json()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
* Performs a PUT request using a provided endpoint to update data.
* @param {string} endpoint The endpoint to be used for the request.
* @param {Object} data The new data of the product to be added, in JSON object format.
* @returns {Promise<Object>} A promise that resolves with the JSON response data from the server.
    * @throws {Error} Throws an error if something fails during the request.
    */
async function putProducts(endpoint, id, data) {
    try {
        const response = await fetch(`${URL_API}${endpoint}/${id}`,
            {
                method: "PUT",
                headers: myHeader,
                body: JSON.stringify(data)
            }
        )
        if (!response.ok) {
            throw new Error("Error en la petición.")
        }
        return await response.json()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
* Performs a DELETE request using a provided endpoint to delete data.
* @param {String} endpoint The endpoint to be used for the request.
* @param {String} id Reference od the data to be deleted.
* @returns {Promise<Object>} A promise that resolves with the JSON response data from the server.
    * @throws {Error} Throws an error if something fails during the request.
    */
async function delProducts(endpoint, id) {
    try {
        const response = await fetch(`${URL_API}${endpoint}/${id}`,
            {
                method: "DELETE",
                headers: myHeader,
            }
        )
        if (!response.ok) {
            throw new Error("Error en la petición.")
        }
        return await response.json()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
 * 
 * @param {*} endpoint 
 * @param {*} id 
 * @param {*} request 
 * @param {*} data 
 * @returns 
 */
async function customFetch(endpoint, id, request, data) {
    try {
        switch (request) {
            case 'GET':
                return getProducts(endpoint);

            case 'POST':
                return postProducts(endpoint, data);

            case 'DELETE':
                return delProducts(endpoint, id);

            case 'PUT':
                return putProducts(endpoint, id, data);

            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
}

function highlight(navLinks, link) {
    navLinks.forEach(link => {
        link.classList.remove('active')
    })
    link.setAttribute('aria-current', 'page')
    link.classList.toggle('active')
}
function newTaskCreator() {
    let html = `
                <article class="main-view">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <form id="taskForm">
                                <fieldset>
                                    <legend>Task Details</legend>
                                    <div class="form-group">
                                        <label for="title">Title:</label>
                                        <input type="text" id="title" name="title" placeholder="Add title" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Description:</label>
                                        <input type="text" id="description" name="description"
                                            placeholder="Add description" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="responsable">Responsable:</label>
                                        <input type="text" id="responsable" name="responsable"
                                            placeholder="Add responsable" required>
                                    </div>
                                    <fieldset>
                                        <legend>Dates</legend>
                                        <div class="form-group">
                                            <label for="startDate">Start Date:</label>
                                            <input type="date" id="startDate" name="startDate" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="endDate">End Date:</label>
                                            <input type="date" id="endDate" name="endDate" required>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Difficulty</legend>
                                        <div class="form-group">
                                            <select name="difficulty" id="difficultySelect">
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </article>
                `
    mainContent.innerHTML = html
    const taskForm = document.querySelector('#taskForm')
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        e.stopPropagation();
        let taskInfo = Object.fromEntries(new FormData(taskForm).entries())
        taskInfo['status'] = 'Pending'
        console.log(taskInfo);
        customFetch("tareas", null, "POST", taskInfo);
        confirm("Tarea guardada.")
    })
}
function showTask(response, status) {
    mainContent.innerHTML = '';
    let article = document.createElement('article')
    article.setAttribute('class', 'card-view')
    mainContent.appendChild(article)
    response.filter(item => item.status == status).forEach(item => { 
        article.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <h5 class="card-responsable">Responsable</h5>
                    <p>${item.responsable}</p>
                    <h5 class="card-start-date">Start Date</h5>
                    <p>${item.startDate}</p>
                    <h5 class="card-end-date">End Date</h5>
                    <p>${item.endDate}</p>
                    <h5 class="card-difficulty">Difficulty</h5>
                    <p>${item.difficulty}</p>
                    ${item.status == 'Completed' ? '' : '<a href="#" class="btn btn-primary">Failed :/</a>'}
                    ${item.status == 'Failed' ? '' : '<a href="#" class="btn btn-primary">Done!</a>'}
                </div>
            </div>
            `
    })
}
function navBarLinks() {
    let navLinks = document.querySelectorAll('[data-verocultar]')
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            let option = e.target.getAttribute('data-verocultar')
            highlight(navLinks, link);
            switch (option) {
                case "['a']":
                    newTaskCreator();
                    break;
                case "['b']":
                    customFetch("tareas", null, "GET", null)
                        .then(response => {
                            response.forEach(item => showTask(response, "Pending"))
                        })
                    break;
                case "['c']":
                    customFetch("tareas", null, "GET", null)
                        .then(response => {
                            response.forEach(item => showTask(response, "Completed"))
                        })
                    break;
                case "['d']":
                    customFetch("tareas", null, "GET", null)
                        .then(response => {
                            response.forEach(item => showTask(response, "Failed"))
                        })
                    break;
                default:
                    break;
            }
        })
    })
}

// Main method
navBarLinks()