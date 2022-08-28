const state = {
    taskList: [],
};

const taskContent = document.querySelector('.task-content');
const taskModel = document.querySelector('.task-modal-body');

// Genrating htlm

const htmlTaskContent = ({
    id, title, description, type, url
}) =>
    `<div class='col-md-6 col-lg-4 mt-3 d-flex flex-wrap'id=${id} key=${id} >
    <div class="card  shadow-sm task-card" style="width: 18rem;">
    <div class='card-header d-flex gap-2 justify-content-end task-card-header'>
    <button type="button" class='btn btn-outline-dark mr-2'  onclick='editTask.apply(this, arguments)' name=${id}>
    <i class= "fas fa-pencil-alt " name=${id}></i>
    </button>
    <button type="button" class='btn btn-outline-dark mr-2'onclick='deleteTask.apply(this, arguments)' name=${id}>
    <i class= "fas fa-trash-alt "name=${id}></i>
    </button>
    </div>
    <div class='card-body'>
    ${url
        ? `
          <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
        : `
        <img width='100%' src="https://cdn.pixabay.com/photo/2016/06/03/08/18/lets-do-it-1432952__340.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
    }
    <div class = 'for-border'>
    <h2 classs='task--card--title'> Title: ${title}</h2>
    <p class='task--description trim-3-lines ' data-gram_editor='false'>Description:
    ${description}</P>
    <div class='tags text-white d-flex flex-wrap'>
    <span class= 'badge bg-light text-dark '>Task-Type:${type}</span>
    </div>
    </div>
    </div>
    <div class='card-footer'>
    <button type="button" class='btn btn-outline-dark mr-2'  id=${id}
    onclick='openTask.apply(this, arguments)' data-bs-toggle='modal' data-bs-target=#showTask >
    open Task
    </button>
    </div>
  </div>
</div> 
`;


//htlm card body completed


//card contents

const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${url
            ? `
          <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
            : `
        <img width='100%' src="https://cdn.pixabay.com/photo/2016/06/03/08/18/lets-do-it-1432952__340.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
        }
    <strong class='text-sm '>Created on${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='lead'>${description}</p>
    </div>

    `
};
// card content completed


//local storage creating function

const updateLocalStorage = () => {
    localStorage.setItem("tasks",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};

//staing load storage 

const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
        taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
};

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("url").value,
        title: document.getElementById("title").value,
        type: document.getElementById("type").value,
        description: document.getElementById("taskDescription").value,
    }
    if (input.title === '' || input.description === "" || input.type === "") {
        return alert("please fill the every field");
    }
    taskContent.insertAdjacentHTML(
        "beforeend",
        htmlTaskContent({
            ...input,
            id,
        })
    )
    state.taskList.push({ ...input, id })
    updateLocalStorage();
};


const openTask = (e) => {
    if (!e) e = window.event;

    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModel.innerHTML = htmlModalContent(getTask);
};


const deleteTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({ id }) => id !== targetID);
    state.taskList = removeTask;

    updateLocalStorage();
    if (type === "BUTTON") {
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }

    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );
};

const editTask = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.id;
    const type = e.target.tagName;
    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;


    if (type === "BUTTON") {
        parentNode = e.target.parentNode.parentNode;
    } else {
        parentNode = e.target.parentNode.parentNode.parentNode;
    }


    taskTitle = parentNode.childNodes[3].childNodes[3].childNodes[1];
    taskDescription = parentNode.childNodes[3].childNodes[3].childNodes[3];
    taskType = parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
};

const saveEdit = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    // console.log(parentNode.childNodes);

    const taskTitle = parentNode.childNodes[3].childNodes[3].childNodes[1];
    const taskDescription = parentNode.childNodes[3].childNodes[3].childNodes[3];
    const taskType = parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    };

    let stateCopy = state.taskList;

    stateCopy = stateCopy.map((task) =>
        task.id === targetID
            ? {
                id: task.id,
                title: updateData.taskTitle,
                description: updateData.taskDescription,
                type: updateData.taskType,
                url: task.url,
            }
            : task
    );

    state.taskList = stateCopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
};

const searchTask = (e) => {
    if (!e) e = window.event;

    while (taskContent.firstChild) {
        taskContent.removeChild(taskContent.firstChild);
    }

    const resultData = state.taskList.filter(({ title }) => {
        return title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    console.log(resultData);

    resultData.map((cardData) => {
        taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
};

