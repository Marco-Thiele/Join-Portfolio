/**
 * This function is used to create a (Project Management Task Object) which include the information of the title, description, due date, priority, the department, contact etc.
 * This function was called on AddTask Main Page
 */
async function addTaskToBoard() {
    document.getElementById('checkprio').classList.add('d-none');
    chooseSubtasks();
    await addTask();
    if (p == true) {
        annimationTaskAddedToBoard();
        setAllFieldsToDefault();
        closeDropdownCategory();
        closeDropDownAssignTo();
        choseContacts = [];
    }
}

/**
 * This function is used to create a (Project Management Task Object) which include the information of the title, description, due date, priority, the department, contact etc.
 * This function was called on Board Page and Contact Page
 */
async function addTaskOnSubPages() {
    document.getElementById('checkprio').classList.add('d-none');
    chooseSubtasks();
    await addTask();
    if (p == true) {
        clearAllFields();
    }
}


/**
 * Cleared all fields after save
 * 
 */
function clearAllFields(){
    document.getElementById('bg').style.display = 'none';
    annimationTaskAddedToBoardForPopOut();
    setAllFieldsToDefault();
    document.getElementById('assignedList').innerHTML = '';
    closeDropdownCategory();
    closeDropDownAssignTo();
    choseContacts = [];
    subTasks = [];
    updateHTML();
    selectedSubtasks = [];
    p = false;
}


/**
 * Set other Inputfields to default values and the prio Buttons to the original text and color
 * 
 */
function setAllFieldsToDefault() {
    setTextFieldToDefault();
    setSelectableFieldsToDefault();
    setPrioBoxesTodefault();
    deleteSubTask();
}


/**
 * Set text field to default
 * 
 */
function setTextFieldToDefault() {
    title = document.getElementById('title');
    title.value = "";
    description = document.getElementById('description');
    description.value = "";
}


/**
 * Set electable field to default
 * 
 */
function setSelectableFieldsToDefault() {
    category = document.getElementById('input');
    category.value = "";
    unsetCategoryInputField();
    document.getElementById('assignInput').value = "";
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.innerHTML = "";
    dueDate = document.getElementById('date');
    dueDate.value = "";
}


/**
 * This function return the priority boxes to default style
 * 
 */
function setPrioBoxesTodefault() {
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioUrgentImg').classList.remove('Img-white');
    document.getElementById('prioMediumImg').classList.remove('Img-white');
    document.getElementById('prioLowImg').classList.remove('Img-white');
}


/**
 * show the animation when the Task is created and direct to the board page
 * while a task is being added to the board the addTask Button is disabled
 * */
function annimationTaskAddedToBoard() {
    document.getElementById('messageAddedTask').style.display = "flex";
    document.getElementById('messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('messageAddedTask').style.display = "none";
    }, 3900)
    document.getElementById('addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('addTaskBtn').classList.add('buttonEnabled');
    }, 4000)

}


/**
 * show the animation when the Task is created and direct to the board page
 * while a task is being added to the board the addTask Button is disabled
 * */
function annimationTaskAddedToBoardForPopOut() {
    document.getElementById('messageAddedTask').style.display = "flex";
    document.getElementById('messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('messageAddedTask').style.display = "none";
    }, 2000)
    document.getElementById('addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('addTaskBtn').classList.add('buttonEnabled');
    }, 3000)
    setTimeout(function () {
        closePopOutAddTask();
    }, 2000)
}


/**
 * Function to generate new Id if one Id contains in the Task
 * @param {object} tasks - it shows the Id-Number of (Project Management Task Object) 
 * @returns {number} id - return a new Id-Number (the next larger number)
 */
function generateTaskId(tasks) {

    if (tasks.length == 0) {
        id = 0;
    } else {
        generateIdTask(tasks)
    }
    return id;
}


/**
 * Generate an id
 * 
 * @param {object} tasks 
 * @returns the id for the task
 */
function generateIdTask(tasks) {
    id = tasks.length;
    let idExists = true;
    while (idExists) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                idExists = true;
                break;
            } else
                idExists = false;
        } if (idExists)
            id++;
    }
    return id
}


/**
 * This function changes clear button Image to blue by hover 
 * 
 */
function clearBtnhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgGray');
    document.getElementById('clearBtnImg').classList.add('clearButtonImgblue');
}


/**
 * This function changes clear button Image to the original color
 * 
 */
function clearBtnCancelhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgGray');
}


/**
 *  This function change the color of the Clear Button to gray when it is onactive
 * 
 */
function setClearBtnOnActive() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
    document.getElementById('clearBtnImg').classList.add('clearButtonImgGray');
}


/**
 * This function modify calendar to only select current date or date in the future 
 * 
 */
function updateCalender() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById('date').min = today;
}


/**
 * clear all field of AddTask page
 * 
 */
function clearAllAddTaskFields() {
    setAllFieldsToDefault();
}


/**
 * show AddTaskPopOut.html
 * 
 */
async function showAddTaskPopOut(progresscategory) {
    updateCalender();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    showAddTaskPopOutAnimate();
    progress = progresscategory;
    renderCategory();
    displayChosenContactsForTask();
}


/**
 * Show pop out
 * 
 */
function showAddTaskPopOutAnimate() {
    document.getElementById('popOut-taskCard').classList = "popOut-taskCard";
    document.getElementById('contentContainer').classList.add('scrollY');
    document.getElementById('kanban').classList.add('kanban');
    document.getElementById('profile-container').classList.add('profile-container-d-none');
    document.getElementById('bodyBoard').classList.add('noScrollSite');
    document.getElementById('bg').style.display = '';
}


/**
 * hide AddTaskPopOut.html
 * 
 */
function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList = "popOut-hidden";
    document.getElementById('bg').style.display = 'none';
    document.getElementById('bodyBoard').classList.remove('noScrollSite');
    document.getElementById('kanban').classList.remove('kanban');
    document.getElementById('profile-container').classList.remove('profile-container-d-none');
    setAllFieldsToDefault();
    closeDropdownCategory();
    closeDropDownAssignTo();
    choseContacts = [];
}


/**
 * This function is used to filter contact by entering the letters
 * 
 */
function filterContact() {
    let search = document.getElementById('assignInput').value;
    search = search.toLowerCase();
    let content = document.getElementById('assignedList');
    content.innerHTML = '';
    assignToInputContainer = document.getElementById('contactInputContainer');
    content.style.display = "block";
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    renderfilterContact(search);
}


/**
 * Render filter contact
 * 
 * @param {string} search 
 */
function renderfilterContact(search){
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        userName = userAccounts[activeUser]['userContacts'][i]['name'];
        userNameLowerLetter = userName.toLowerCase();
        if (userNameLowerLetter.includes(search)) {
            content.innerHTML += templateRenderAssignToContacts(userName);
        }
    }
}


/**
 * this function delete the category from the user after the input number of the category
 * 
 * @param {number} number - this is the activUser category-array number 
 */
async function deleteCategory(number) {
    let user = userAccounts[activeUser]['userCategory'];
    for (let i = 0; i < user.length; i++) {
        if (i === number) {
            user.splice(i, 1);
            break;
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    closeOverlay();
    updateHTML();
}


/**
 * This function closes the Category Select Menu
 * 
 */
function closeDropdownCategory() {
    var categoryList = document.getElementById('categoryList');
    categoryInputContainer = document.getElementById('inputContainer');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
    if (l == true) {
        document.getElementById("input").disabled = true;
    } else {
        document.getElementById("input").disabled = false;
    }
}