/**
* Close the dropdown container from category
* 
*/
function closeDropdownCategoryBoard() {
    let categoryInputContainer = document.getElementById('inputContainer');
    let categoryList = document.getElementById('categoryList');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}


/**
 * Selected variable for renderAssignToBoardContacts()
 * 
 * @param {number} cards 
 */
async function renderAssignToBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = "";
    let users = userAccounts[activeUser]['userContacts'];
    renderAssignToBoardContacts(users, assignedContactList, todo)
}


/**
 * Show all Contacts includes with checkboxes
 * 
 * @param {string} users 
 * @param {string} assignedContactList 
 * @param {object} todo 
 */
function renderAssignToBoardContacts(users, assignedContactList, todo) {
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        const element = todo.contact;
        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += renderAssignToBoardContactsHTML(userName, checkedAttribute, todo)
    }
}


/**
 * Select all chosed Contacts and push them into checkbox
 * 
 * @param {string} name 
 * @param {number} cards 
 */
function chooseContactBoard(name, cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = '';
    inputAssignedContact.value = name;
    choosedContact.splice(0);
    let allChekbox = document.querySelectorAll('.checkboxForContacts');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        chooseContactOverlayChange(checkbox, todo);
    }
}


/**
 * If checkbox checked render contacts in overlay changes
 * 
 * @param {object} checkbox 
 * @param {object} todo 
 */
function chooseContactOverlayChange(checkbox, todo) {
    if (checkbox.checked) {
        choosedContact.push(checkbox.value);
        renderContactsOverlayChange(todo);
    }
}


/**
 * Save all changes to backend
 * 
 * @param {number} cards 
 */
async function saveInputTask(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let newDescription = document.getElementById('inputDescription').value;
    let newDueDate = document.getElementById('date').value;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    newTitleSave(todo);
    prioritySave(todo);
    contactChoosed(todo);
    chooseSubtasksBoard(todo);
    newTitleSave(todo);
    await saveAndNewRender(cards)
}


/**
 * Show Overlay and update HTML
 * 
 * @param {number} cards 
 */
async function saveAndNewRender(cards) {
    await saveTasksToBackend();
    await saveUserAccountsToBackend();
    updateHTML();
    choosedContact= [];
    showOverlay(cards);
}


/**
 * checkes if title new
 * 
 * @param {object} todo 
 */
function newTitleSave(todo) {
    let newTitle = document.getElementById('inputTittle').value;
    if (newTitle == '') {
        newTitle = todo.title;
    }
    todo.title = newTitle;
}

// 
/**
 * Save choosedConatact for render and save contacts to task
 * 
 * @param {object} todo 
 */
function contactChoosed(todo) {
    if (!todo.contact.includes(todo.contact)) {
        todo.contact = choosedContact
    }
}


/**
 * Show the priority 
 * 
 * @returns 
 */
function getPriority() {
    let priority;
    let priorityImg;
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        priorityImg = "assets/img/urgent.png";
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        priorityImg = "assets/img/medium.png";
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        priorityImg = "assets/img/low.png";
    }
    return { priority, priorityImg };
}


/**
 *  Change the priority 
 * 
 * @param {object} todo 
 * @param {string} priority 
 * @param {string} priorityImg 
 */
function setPriority(todo, priority, priorityImg) {
    todo.priority = priority;
    todo.priorityImg = priorityImg;
}


/**
 * Save the priority
 * 
 * @param {object} todo 
 */
function prioritySave(todo) {
    const { priority, priorityImg } = getPriority();
    setPriority(todo, priority, priorityImg);
}


/**
 * Selected if Subtask is done
 * 
 * @param {object} todo 
 */
async function chooseSubtasksBoard(todo) {
    todo.subTaskDone = [];
    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            todo.subTaskDone.push(checkbox.value);
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
}

// 
/**
 * Render subtasks
 * 
 * @param {number} cards 
 */
function renderSubtasksBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let content = document.getElementById('subtasks');
    let subTaskDone = todo.subTaskDone
    content.innerHTML = "";
    for (let j = 0; j < todo['subTask'].length; j++) {
        const showSubTask = todo['subTask'][j];
        const subTaskIsDone = subTaskDone.includes(showSubTask);
        const checkedAttribute = subTaskIsDone ? 'checked' : '';
        content.innerHTML += renderSubtasksBoardHTML(showSubTask, checkedAttribute, j);
    }
}


/**
 * Render the progressbar (cards)
 * 
 * @param {number} cards 
 */
async function changeProgressbar(cards) {
    const progress = document.getElementById(`progressBar${cards}`);
    const contant = document.getElementById(`countDone${cards}`);
    const todo = userAccounts[activeUser]['userTasks'].find((item) => item.id === cards);
    const present = todo.subTaskDone.length;
    const result = present ? `${(present * 100) / todo.subTask.length}%` : 0;
    progress.style.width = result;
    contant.innerHTML = `${present}/${todo.subTask.length} Done`;
    if (todo.subTask.length == 0) {
        contant.classList.add('d-none');
    }
    if (todo.subTask.length > 0) {
        document.getElementById(`progress${cards}`).style.backgroundColor = "#F4F4F4";
    }
}


/**
 * Select witch searchinput and checked if its includes
 * 
 */
function filterHtml() {
    document.getElementById('noTask').classList.add('d-none');
    let { search } = chooseSearchInput();
    search = search.toLowerCase();
    let title = userAccounts[activeUser]['userTasks'];
    let text = userAccounts[activeUser]['userTasks'];
    renderSearchFilter(title, text, search);
    if (filterCount == 0)
        document.getElementById('noTask').classList.remove('d-none');
    filterCount = 0
}


/**
 * Choose the right searchfield
 * 
 * @returns 
 */
function chooseSearchInput() {
    if (window.innerWidth <= 640) {
        var search = document.getElementById('searchSmall').value;
    } else {
        var search = document.getElementById('search').value;
    }
    return { search }
}


/**
 * Render search result
 * 
 * @param {string} title 
 * @param {string} text 
 * @param {string} search 
 */
function renderSearchFilter(title, text, search) {
    for (let i = 0; i < title.length; i++) {
        let element = title[i]['title'];
        let description = text[i]['description'];
        element = element.toLowerCase();
        description = description.toLowerCase();
        if (element.includes(search) || description.includes(search)) {
            renderfilter(search, i);
            filterCount++;
        }
    }
}


/**
 * Render all cards where Search includes title
 * 
 * @param {string} search 
 * @param {number} j 
 */
async function renderfilter(search, j) {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userTasks'];
    document.getElementById('toDoContent').innerHTML = '';
    document.getElementById('inProgressContent').innerHTML = '';
    document.getElementById('awaitingFeedbackContent').innerHTML = '';
    document.getElementById('doneContent').innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        cards = userTasks['progress'];
        renderFilterHtml(userTasks, search, cards);
    }
}


function renderFilterHtml(userTasks, search, cards) {
    renderFilterHtmlByCategory(userTasks, search, cards, 'To Do', 'toDoContent');
    renderFilterHtmlByCategory(userTasks, search, cards, 'In progress', 'inProgressContent');
    renderFilterHtmlByCategory(userTasks, search, cards, 'Awaiting Feedback', 'awaitingFeedbackContent');
    renderFilterHtmlByCategory(userTasks, search, cards, 'Done', 'doneContent');
}

function renderFilterHtmlByCategory(userTasks, search, cards, category, containerId) {
    let title = cards == category && userTasks['title'].toLowerCase().includes(search);
    let text = cards == category && userTasks['description'].toLowerCase().includes(search);
    if (title || text) {
        document.getElementById(containerId).innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks);
        loadForUpdateHTML(userTasks);
    }
}
