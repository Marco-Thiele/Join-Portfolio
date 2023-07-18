/**
 * Close Overlay
 * 
 */
function closeOverlay() {
    if (loadOverlay) {
        let overlay = document.getElementById('overlay');
        overlay.classList.add('d-none');
        document.getElementById('overlay-background').classList.remove('overlay-background');
        document.getElementById('bodyBoard').classList.remove('noscroll');
        document.getElementById('kanban').classList.remove('display-none');
    }
}


/**
 * Overlay should not be closed
 *  
 * @param {function} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Load priority button
 * 
 */
function insertPriorityField(priority, nonPriority1, nonPriority2) {
    document.getElementById(`prio${priority}Box`).classList.toggle(`bg${priority}`);
    document.getElementById(`prio${nonPriority1}Box`).classList.remove(`bg${nonPriority1}`);
    document.getElementById(`prio${nonPriority2}Box`).classList.remove(`bg${nonPriority2}`);
    document.getElementById(`prio${priority}Img`).classList.add('Img-white');
    document.getElementById(`prio${nonPriority1}Img`).classList.remove('whitecolor');
    document.getElementById(`prio${nonPriority2}Img`).classList.remove('whitecolor');
}


/**
 * Show medium button
 * 
 */
/*
function insertMedium() {
    document.getElementById('prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    
    document.getElementById('prioMediumImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
}


/**
 * Show low button
 * 
 
function insertLow() {
    document.getElementById('prioLowBox').classList.toggle('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    /*img-color*
    document.getElementById('prioLowImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
}
*/

/**
 * reads the priortiy and show the right button
 * 
 * @param {number} cards 
 */
function insertPriority(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    if (todo.priority == 'Urgent') {
        insertPriorityField('Urgent', 'Medium', 'Low')
    } else if (todo.priority == 'Medium') {
        insertPriorityField('Medium', 'Urgent', 'Low')
    } else {
        insertPriorityField('Low', 'Urgent', 'Medium')
    }
}


/**
 * Textarea is not possible to move with the mouse
 * 
 * @param {number} cards 
 */
function chanceTextarea(cards) {
    document.addEventListener("DOMContentLoaded", function () {
        var textarea = document.getElementById(`inputDescription${cards}`);
        var placeholder = textarea.getAttribute("placeholder");
        var numLines = (placeholder.match(/\n/g) || []).length + 1;
        textarea.setAttribute("rows", numLines);
    });
}

 
/**
 * show the container for contacts to assign
 * 
 * @param {number} cards 
 */
function dropDownAssignToBoard(cards) {
    let assignedList = document.getElementById('assignedList');
    let assignToInputContainer = document.getElementById('contactInputContainer'); 
    if (assignedList.style.display == "block") { 
        assignedList.style.display = "none"; 
        assignToInputContainer.style.border = "1px solid #D1D1D1"; 
        assignToInputContainer.style.borderRadius = "10px"; 
    } else { 
        assignedList.style.display = "block";   
        assignToInputContainer.style.borderBottom = "none"; 
        assignToInputContainer.style.borderRadius = "10px 10px 0 0"; 
        renderAssignToBoard(cards); 
    }
    closeDropdownCategoryBoard();
}


/**
 * Shows the contacts that are assign to the task
 * 
 * @param {object} cards 
 */
function renderContactsOverlayChange(cards) {
    let contant = document.getElementById('contactOverlayChange');
    contant.innerHTML = '';
    const { id, contact } = cards;
    const user = userAccounts[activeUser].userContacts;
    if (choosedContact.length == 0) {
        renderContactsWithContacts(id, contact, contant, user);
    }
    if (choosedContact.length >= 1) {
        renderContactsChoosedContacts(id, contact, contant, user);
    }
}


/**
 * Render contacts and checkboxes
 * 
 * @param {number} id 
 * @param {object} contact 
 * @param {string} contant 
 * @param {object} user 
 */
function renderContactsChoosedContacts(id, contact, contant, user) {
    const userWithContacts = user.filter(({ name }) => choosedContact.includes(name));
    userWithContacts.forEach((user, index) => {
        const idStr = id.toString() + index.toString();
        contant.innerHTML += renderContactsOverlayChangeHTML(idStr, user);
        changeBackgroundCircle(`round${idStr}`, user.color);
    })
}


/**
 * Render contacts and checkboxes
 * 
 * @param {number} id 
 * @param {object} contact 
 * @param {string} contant 
 * @param {object} user 
 */
function renderContactsWithContacts(id, contact, contant, user) {
    const userWithContacts = user.filter(({ name }) => contact.includes(name));
    userWithContacts.forEach((user, index) => {
        const idStr = id.toString() + index.toString();
        contant.innerHTML += renderContactsOverlayChangeHTML(idStr, user);
        changeBackgroundCircle(`round${idStr}`, user.color);
    })
}


/**
 * Change progress in responsive mode
 * 
 * @param {number} cards 
 */
async function changeCategoryUp(cards){
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    if (todo.progress == 'To Do') {
        todo.progress = 'Done'
    } else  if (todo.progress == 'In progress') {
        todo.progress = 'To Do'
    }else if (todo.progress == 'Awaiting Feedback') {
        todo.progress = 'In progress'
    }else if (todo.progress == 'Done') {
        todo.progress = 'Awaiting Feedback'
    }
    await saveUserAccountsToBackend();
    updateHTML()
}


/**
 * Change progress in responsive mode
 * 
 * @param {number} cards 
 */
async function changeCategoryDown(cards){
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    if (todo.progress == 'To Do') {
        todo.progress = 'In progress'
    } else  if (todo.progress == 'In progress') {
        todo.progress = 'Awaiting Feedback'
    }else if (todo.progress == 'Awaiting Feedback') {
        todo.progress = 'Done'
    }else if (todo.progress == 'Done') {
        todo.progress = 'To Do'
    }
    await saveUserAccountsToBackend();
    updateHTML()
}


window.addEventListener('scroll', myFunction);

function myFunction() {
  if (scrollY == 0) {
    document.getElementById('kanban').classList.remove('display-unset');
  } else{
    document.getElementById('kanban').classList.add('display-unset');
  }
}


/**
 * Delete a task from backend and update HTML
 * 
 * @param {number} number 
 */
async function deleteTaskActiveUser(number) {
    let user = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === number) {
            user.splice(i, 1);
            break;
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    closeOverlay();
    updateHTML();
}