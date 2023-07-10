function renderCategoryHTML() {
    return `<div class="categoryAndColor" onclick=" newCategoryInput()" >
    <div>New category</div>
    </div>
`;
}


function renderCategoryHTML2(i, category, color) {
    return `<div class="categoryAndColor" onclick="chooseCategory(${i}, '${category}', '${color}')" >
            <div>${category}</div>
            <div class="color"  style="background-color:${color}"></div>
            </div>
            `;
}


function renderCategoryHTML3() {
    return `<div class="categoryAndColor" onclick=" deleteCategoryAddTask()" >
             <div>Delete category</div>
             </div>`;
}


function deleteCategoryAddTaskHTML(i, category, color) {
    return `
    <div class="categoryAndColor" onclick="deleteThisCategory(${i})" >
        <div>${category}</div>
        <div class="color"  style="background-color:${color}"></div>
    </div>
    `;
}


/**
 * This function is a HTML-template to render the assigned contacts
 * @param {string} userName - the name of the assigned contact at certain index
 * @returns - the contact names
 */
function templateRenderAssignToContacts(userName) {
    return /*html*/`
    <div class="assignedContact" >
        <div>${userName}</div>
        <label class="filledCheckboxContainer">
            <input type="checkbox" class="checkboxForContacts" value="${userName}" onclick="chooseContact('${userName} ')">
            <span class="checkmark"></span>
        </label>
    </div>
    `;
}


/** This function is a HTML-template to render the invite new contact Text and it's image*/
function templateRenderAssignToNewContact() {
    return /*html*/`
    <div class="assignedContact" onclick="assignToInput()">
        <div>invite new contacts</div>
        <img src="assets/img/new_contact.png" class="newContactImg">
    </div>
`;
}


/**
 * HTML-Template for render the check marked contacts
 * @param {string} userName - contact name
 * @param {true/false} checkedAttribute - checkbox true or false
 * @returns - HTML Code of name and checked attribute of checkbox
 */
function renderAssignToCheckMarkedHTML(userName, checkedAttribute) {
    return `
    <div class="assignedContact" >
        <div>${userName}</div>
        <label class="filledCheckboxContainer">
            <input type="checkbox" class="checkboxForContacts" value="${userName}" ${checkedAttribute} onclick="chooseContact('${userName} ')">
                <span class="checkmark"></span>
        </label>
    </div>
    `;
}


/**
 * HTML-Template for render new contact
 * @returns 
 */
function renderAssignToCheckMarkedHTMLNewContact() {
    return /*html*/`
    <div class="assignedContact" onclick="assignToInput()">
            <div>invite new contacts</div>
            <img src="assets/img/new_contact.png" class="newContactImg">
        </div>
    `;
}


/**This function is used for invite new contact via an Email to assign into the Kanban Project Managment Tool*/
function assignToInput() {
    helpVarSumit = true;
    document.getElementById('assignedList').innerHTML = `<form action="/Join/send-email.php" method="post">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email placeholder="email"">
    <button type="submit" onclick="showEmailSentStatus()">Submit</button>
    </form>`;
    document.getElementById('assignedList').style.display = "block !important";
}


/**HTML-templates for renderCircleName() */
function renderNamesInTwoLetters(bgContactColor, letters, i) {
    return document.getElementById('circleContactsContainer').innerHTML += `
    <div class="circleContact" id="circleContact${i}" style="background-color: ${bgContactColor} !important">  ${letters}
    </div>
    `;
}


function renderSubtasksHTML(showSubTask, i) {
    return /*html*/`
    <label class="container">
        <input type="checkbox" class="checkedSubTasks" onclick="chooseSubtasks()" value="${showSubTask}" checked />
        <span class="checkmark" id="checkmark${i}"></span>
        <div class="subtaskCheck">${showSubTask}</div>
    </label>
    `;
}