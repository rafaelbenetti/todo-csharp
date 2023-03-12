const API_BASE_URL = "https://localhost:44321/api/todos";

const HttpMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

/* Funcao que vai realizar todas as chamadas HTTP (GET, POST, PUT e DELETE) */
function httpRequest(method, url, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

/* Funcao que adiciona um novo item */
async function onAddTodoItem() {
    const title = document.getElementById("titleInput").value;

    if (!title) {
        alert("Title is required!");
        return;
    }

    const id = await getNextId();
    const dataToPost = { id, title };
    await httpRequest(HttpMethod.POST, API_BASE_URL, dataToPost);

    document.getElementById("titleInput").value = null;
    await getTodoItems();
}

async function getNextId() {
    const items = await httpRequest(HttpMethod.GET, API_BASE_URL);
    return items?.length + 1;
}

/* Funcao que obtem os todo itens e adiciona no HTML*/
async function getTodoItems() {
    const items = await httpRequest(HttpMethod.GET, API_BASE_URL);

    if (!items?.length) return;

    const listContainer = document.getElementById("todoListContainer");
    listContainer.innerHTML = null;

    items.map((item) => {
        const element = document.createElement("div");
        element.className = "todo-list-item";
        element.innerHTML = item.title;
        listContainer.append(element);
    });
}

/* Funcao que eh executada no inicio do codigo */
async function configureInitialData() {
    await getTodoItems();
}

configureInitialData().then(() => {
    console.log("Loaded initial data with success");
});
