const state = {
    taskList: [],
};

const taskContent = document.querySelector('.task-content');
const taskModel = document.querySelector('.task-modal-body');

// Genrating htlm

const htmlTaskContent = ({
    id, title, description, tag, url
}) =>
    `<div class='col-md-6 col-lg-4 mt-3 'id=${id} key=${id} >
    <div class="card  shadow-sm task-card" style="width: 18rem;">
    <div class='card-header d-flex gap-2 justify-content-end task-card-header'>
    <button type="button" class='btn btn-outline-info mr-2' name=${id}>
    <i class= "fas fa-pencil-alt " name=${id}></i>
    </button>
    <button type="button" class='btn btn-outline-danger mr-2' name=${id}>
    <i class= "fas fa-trash-alt " name=${id}></i>
    </button>
    <div class='card-body'>
    ${url && `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg'/>`
    }
    <h4 classs='task--card--title'>${title}</h4>
    <p class='task--description trim-3-lines text-muted' data-gram_editor='false'>${description}</P>
    <div class='tags text-white d-flex flex-wrap'>
    <span class= 'badge bg-primary m-1'>${tag}</span>
    </div>
    </div>
    <div class='card-footer'>
    <button type="button" class='btn btn-outline-info mr-2 data-bs-toggle='modal' data-bs-toggle=#showTask >
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
    ${url && `<img width='100%' src=${url} alt='card image cap' class='img-fluid place--holder--image  mb-3'/>`
        }
    
    <strong class='text-sm text-muted'>Created on${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='lead'>${description}</p>
    </div>

    `
};
// card content completed


//local storage creating function

const updateLocalStorage = () => {
    localStorage.setItem("task",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};

//staing load storage 

const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorageCopy.task);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
}