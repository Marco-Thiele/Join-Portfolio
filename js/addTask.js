let categoriesArray = ['New Category', 'Sales', 'Marketing'];
let colorsArray = ['', 'red', 'blue'];
let newCategoryColors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let categoryInputContainer;
let assignToInputContainer;
let onInputSubTask;
let subtaskInput;
let appendixSubtask;
let categoryList;
let choseContacts = [];
let l = false;
let j = false;
let p = false;
let priority;
let priorityImg;
let addsubtask;
let subTasks = [];
let selectedSubtasks = [];
let userName;
let newAssingedContact;
let newLetters2;
let selectedContactLetters = [];
let newContacts = [];
let newAddedContactLetters = [];
let arrayContactColor = [];
let helpVarSumit = false;
let newCategoryColor;
let id;

/**global variable for addTask() function */
let title;
let description;
let contact;
let subTaskDone;
let category;
let categoryColor;
let dueDate;
let subTask;
let idTask;
let progress;

/**
 * this function is used to load AddTask-HTML page (init function)
 * 
 */
function onloadAddTask() {
    init('addTask');
    renderSubtasks();
    updateCalender();
}


/**
 *  The function render the assigned user contacts
 *  and allows to invite the new contact via email
 * 
 */
async function renderAssignTo() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = "";
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        userName = userAccounts[activeUser]['userContacts'][i]['name'];
        assignedContactList.innerHTML += templateRenderAssignToContacts(userName);
    }
    assignedContactList.innerHTML += templateRenderAssignToNewContact();
}


/**
 * This function allows user to choose the contact with the checkbox - the check marked contact is showing below in a cirle
 * 
 * @param {string} name - the name of the contact which was selected from the userAccounts in the renderAssignTo() function 
 */
function chooseContact(name) {
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = name;
    choseContacts.splice(0);
    let allChekbox = document.querySelectorAll('.checkboxForContacts');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked)
            choseContacts.push(checkbox.value);
        displayChosenContactsForTask();
    }
}


/**
 * This function render the check marked contacts
 * 
 */
async function renderAssignToCheckMarked() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = ""; //clear container inside html
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        let userName = userAccounts[activeUser]['userContacts'][i]['name'];
        const element = choseContacts;
        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += renderAssignToCheckMarkedHTML(userName, checkedAttribute)
    }
    assignedContactList.innerHTML += renderAssignToCheckMarkedHTMLNewContact();
}


/**
 * Show AssignTo Select Menu - toggle at clicking on the dropdown Button
 * 
 */
function dropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    document.getElementById('circleContactsContainer').style.display = "flex";
    if (assignedList.style.display == "block") {
        closeDropDownAssignTo();
    } else {
        showDropDownAssignTo();
    }
    closeDropdownCategory();
}


/**
 * close the dropdown AssignTo Menu
 * 
 */
function closeDropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    assignedList.style.display = "none";
    assignToInputContainer.style.border = "1px solid #D1D1D1";
    assignToInputContainer.style.borderRadius = "10px";
    document.getElementById('circleContactsContainer').style.display = "flex";
}


/**
 * open the dropdown AssignTo Menu
 * 
 */
function showDropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    assignedList.style.display = "block";
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    if (choseContacts == '') {
        renderAssignTo();
    } else {
        renderAssignToCheckMarked();
        displayChosenContactsForTask();
    }
}


/**
 * This function allows to set the AssignTo input field to default style
 * 
 */
function rejectAssignTo() {
    document.getElementById('assignInput').value = "";
    document.getElementById('assignInput').placeholder = "Select contacts to assign";
    closeDropDownAssignTo();
    document.getElementById('newAssignToInput').style.display = "none";
    document.getElementById('assignDropDown').style.display = "flex";
    document.getElementById('circleContactsContainer').style.display = "flex";
}


/**
 * This function shows the email sent status in a Box
 * 
 */
function showEmailSentStatus() {
    newAssingedContact = document.getElementById('assignInput');
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    newContacts.push(newAssingedContact.value);
    document.getElementById('assignedList').style.display = "block";
    document.getElementById('assignedList').value = "";
    document.getElementById('assignedList').innerHTML = `
    Email was sent successfully!
    `;
}


/** 
 * This function shows the chosen contacts under AssignTo-box in a filled cirlce of two letters for each chosen contact 
 * 
 */
function displayChosenContactsForTask() {
    document.getElementById('circleContactsContainer').style.display = "flex";
    renderCircleName();
}


/**
 * This function sorts the contact names into two letters
 * 
 */
function showContactsByTwoLetters() {
    document.getElementById('circleContactsContainer').innerHTML = "";
    const user = userAccounts[activeUser].userContacts;
    const userWithContacts = user.filter(({ name }) => choseContacts.includes(name));
    userWithContacts.forEach((user, index) => {
        let letters = user.letters
        const colorUser = user.color;
        renderNamesInTwoLetters(colorUser, letters, index);
    });
}


/**
 *  show Contact name in two letters in a Circle with a background color
 * 
 */
function renderCircleName() {
    showContactsByTwoLetters();
    selectedContactLetters.splice(0);
    newAddedContactLetters.splice(0);
    newContacts.splice(0);
}


/*Subtask*/
/**
 * By clicking the + Symbol changed to New subTask Input
 * 
 */
function createNewSubtask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    addsubtask.style.display = "none";
    onInputSubTask.style.display = "flex";
}


/**
 * onclick cross mark all Subtasks are deleted except of the subTasks[0] -> it only left the default value in subTasks Array 
 * 
 */
function deleteSubTask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    subtaskInput = document.getElementById('subtasksInput');
    appendixSubtask = document.getElementById('SubtaskAppendixContainer');
    subtaskInput.value = "";
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    subTasks.pop();
    renderSubtasks();
}


/**
 * This function wait for the subTask input and render the SubTask one after one when the user insert subtask
 * 
 */
function addSubTask() {
    subtaskInput = document.getElementById('subtasksInput');
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    if (subtaskInput.value != "") {
        let subTask = subtaskInput.value;
        subTasks.push(subTask);
        chooseSubtasks();
        renderSubtasks();
    }
    subtaskInput.value = "";
}


/**
 *  This function insert the checked SubTask to the Array
 * 
 */
function chooseSubtasks() {
    selectedSubtasks.splice(0);
    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked)
            selectedSubtasks.push(checkbox.value);
    }
}


/**
 * This function tender all subTasks with their check boxes
 * 
 */
function renderSubtasks() {
    appendixSubtask = document.getElementById('SubtaskAppendixContainer');
    appendixSubtask.innerHTML = "";
    for (let i = 0; i < subTasks.length; i++) {
        const showSubTask = subTasks[i];
        appendixSubtask.innerHTML += renderSubtasksHTML(showSubTask, i);
    }
}


/**
 * This function is used to create a (Project Management Task Object) which include the information of the title, description, due date, priority, the department, contact etc.
 * 
 */
async function addTask() {
    await loadUserAccountsFromBackend();
    tasks = userAccounts[activeUser].userTasks;
    title = document.getElementById('title');
    description = document.getElementById('description');
    contact = choseContacts;
    subTaskDone = [];
    category = document.getElementById('input');
    categoryColor = document.getElementById('color').style.background;
    dueDate = document.getElementById('date');
    getPriorityInformation();
    subTask = selectedSubtasks;
    idTask = generateTaskId(tasks);
    saveTask();
}


/**
 * This function save a new task
 * 
 */
async function saveTask() {
    if (typeof progress == 'undefined')
        progress = "To Do";
    if (p == true) {
        let newTask =
            addNewTask();
        tasks.push(newTask);
        await saveTasksToBackend();
        await saveUserAccountsToBackend();
    } else {
        document.getElementById('checkprio').classList.remove('d-none');
        document.getElementById('checkprio').innerHTML = 'Please select a priority!';
    }
}


/**
 * Added all values to the new task
 * 
 * @returns newTask
 */
function addNewTask() {
    return {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "categoryColor": categoryColor,
        "contact": contact,
        "dueDate": dueDate.value,
        "subTask": subTask,
        "subTaskDone": subTaskDone,
        "priority": priority,
        "priorityImg": priorityImg.src,
        "id": idTask,
        "progress": progress
    }
}