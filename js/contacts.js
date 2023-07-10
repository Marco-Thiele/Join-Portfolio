let bothLetters;
let contactName;
let inputName;
let email;
let phone;
let letters = [];
let contactColor = randomUserColor();


/**
 * This function executes all necessary functions onload
 * 
 */
function onloadContact() {
    init('contacts');
    sortNames();
    sortLetters();
    //updateCalender('date');
}


/**
 * This function gets the initials from contacts,pushes them into an array
 * 
 */
function getFrontLettersUser() {
    let userName = userAccounts[activeUser].userContacts;
    for (let i = 0; i < userName.length; i++) {
        const contact = userName[i]['name'];
        let firstChar = contact.charAt(0);
        firstChar = firstChar.toUpperCase();
        check = letters.indexOf(firstChar);
        if (check == -1) 
            letters.push(firstChar);
    }
    sortLetters();
}


/**
 * This function renders and sorts the contacts alphabeticly
 * 
 */
async function sortNames() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    getFrontLettersUser();
    let userName = userAccounts[activeUser].userContacts;
    document.getElementById('contact-container').innerHTML = '';
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        templateLetter(letter, i);
        renderShortNames(userName, letter, i)
    }
}


/**
 * Render the contacts
 * 
 * @param {string} userName 
 * @param {string} letter 
 * @param {number} i 
 */
function renderShortNames(userName, letter, i){
    for (let j = 0; j < userName.length; j++) {
        let name = userName[j]['name'];
        let email = userName[j]['email'];
        let bothLetters = userName[j]['letters'];
        let nameLetter = name.charAt(0);
        if (nameLetter == letter) {
            templateNameCard(i, name, email, j, bothLetters);
            circleColor(j);
        }
    }
}


/**
 * This function gives a contact cirlce image a saved background color
 * 
 * @param {number} j - is the number that leads to the specific contact in the array
 */
function circleColor(j) {
    let color = userAccounts[activeUser].userContacts[j]['color'];
    document.getElementById('circle' + j).style.backgroundColor = color;
}


/**
 * Shows all contact information
 * 
 * @param {number} j 
 * @param {string} bothLetters 
 */
function showContact(j, bothLetters) {
    document.getElementById('right-container').style.justifyContent = 'flex-start';
    if (window.innerWidth < 1140) {
        document.getElementById('kanban-contact').style.display = 'block';
    }
    let color = userAccounts[activeUser].userContacts[j]['color'];
    contactName = userAccounts[activeUser]['userContacts'][j]['name'];
    email = userAccounts[activeUser]['userContacts'][j]['email'];
    phone = userAccounts[activeUser]['userContacts'][j]['phone'];
    renderHTMLShowContact(color, bothLetters, contactName, j, email, phone);
    document.getElementById('floating-contact-container').style.display = "flex";
    document.getElementById('right-container').classList.add("display");
    displayFloatContact();
}


/**
 * This fucntion makes the contact details visable
 * 
 */
function displayFloatContact() {
    document.getElementById('name-container').style.display = '';
    document.getElementById('contact-details').style.display = '';
}


/**
 * This function lets you edit the contact
 * 
 * @param {number} j is the number that leads you to the right place in the array of contacts
 */
function editContactCard(j) {
    changeTemplate(j);
    setInputfields(j);
    changeProfileInitials(j);
    showCard();
}


/**
 * This function changes the profile picture to the initials and the backgroundcolor
 * 
 * @param {number} j is the number that leads you to the right place in the array of contacts
 */
function changeProfileInitials(j) {
    let initials = userAccounts[activeUser]['userContacts'][j]['letters'];
    let color = userAccounts[activeUser]['userContacts'][j]['color'];
    // document.getElementById('icon-container').innerHTML = `<div class="icon-container">`;
    document.getElementById('icon-container').innerHTML = `${initials}`;
    document.getElementById('icon-container').style.backgroundColor = `${color}`;
}


/**
 * This function lets you delete a contact
 * 
 * @param {number} j is the number that leads you to the right place in the array of contacts
 */
async function deleteContact(j) {
    letters = [];
    document.getElementById('floating-contact-container').style.display = 'none';
    userAccounts[activeUser]['userContacts'].splice(j, 1);
    await saveUserAccountsToBackend();
    sortNames();
    closeContactCard();
    changeTextTo('deleted');
    successfulAnimation(); 
}


/**
 * Change contact information
 * 
 * @param {string} j 
 */
async function editContact(j) {
    letters = [];
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters, 'color': contactColor };
    userAccounts[activeUser]['userContacts'].splice(j, 1, contact_obj);
    await saveUserAccountsToBackend();
    sortNames();
    showContact(j, bothLetters);
    closeContactCard();
    changeTextTo('edited');
    successfulAnimation();
}


/**
 * This function changes the alert text.
 * 
 * @param {*\string} text is changed text depending on what function was used
 */
function changeTextTo(text) {
    document.getElementById('success').innerHTML = `Contact succesfully ${text}`;
    document.getElementById('right-container').style.justifyContent = 'space-between';
}


/**
 * This function sorting letters and renders the initials
 * 
 */
function sortLetters() {
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        document.getElementById('contact-container').innerHTML += `<div id="letter-container">${letter}</div>`;
    }
}


/**
 * This function displays the add-contact-card
 * 
 */
function showCard() {
    document.getElementById('bg').style.display = '';
    document.getElementById('contact-card').classList = 'add-contact-card';
}


/**
 * This function hides the add-contact-card
 * 
 */
function closeContactCard() {
    document.getElementById('contact-card').classList = 'hidden';
    document.getElementById('bg').style.display = 'none';
    changeTemplateBack();
    resetInputfields();
}


/**
 * This function gets the input values
 * 
 */
function getInputValues() {
    let contact_email = document.getElementById('contact-email');
    let contact_phone = document.getElementById('contact-phone');
    let contact_name = document.getElementById('contact-name');
    changeInputValues(contact_email, contact_phone, contact_name)
    if (inputName.indexOf(' ') >= 0) {
        let helpLetter = contactName.split(" ");
        bothLetters = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
    }
    else 
        bothLetters = firstLetter;  
}


/**
 * Change the input values
 * 
 * @param {string} contact_email 
 * @param {string} contact_phone 
 * @param {string} contact_name 
 */
function changeInputValues(contact_email, contact_phone, contact_name) {
    inputName = contact_name.value;
    email = contact_email.value;
    phone = contact_phone.value;
    const firstLetter = inputName.charAt(0).toUpperCase();
    const remainingLetters = inputName.slice(1);
    contactName = firstLetter + remainingLetters;
    contactColor = randomUserColor();
}


/**
 * This function creates a new contact by getting the values and pushing them into the Object
 * 
 */
async function CreateNewContact() {
    await loadUserAccountsFromBackend();
    let userName = userAccounts[activeUser].userContacts;
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters, 'color': contactColor };
    userName.push(contact_obj);
    await saveUserAccountsToBackend();
    closeContactCard();
    changeTextTo('created');
    successfulAnimation();
    sortNames();
    resetInputfields();
    showContact(userName.length - 1, bothLetters);
}


/**
 * This function resets the inputfields
 * 
 */
function resetInputfields() {
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-name').value = '';
}


/**
 * This function sets the inputfields to the fitting contact details
 * 
 * @param {number} j leads to the right contact in the array
 */
function setInputfields(j) {
    document.getElementById('contact-email').value = userAccounts[activeUser]['userContacts'][j]['email'];
    document.getElementById('contact-phone').value = userAccounts[activeUser]['userContacts'][j]['phone'];
    document.getElementById('contact-name').value = userAccounts[activeUser]['userContacts'][j]['name'];
}


/**
 * It plays a animation if saveToBackend was successful
 * 
 */
function successfulAnimation() {
    document.getElementById('success').style.display = '';
    document.getElementById('success').classList.add("animate-contact");
    setTimeout(() => {
        document.getElementById('success').style.display = 'none';
    }, 2000);
}


/**
 * This function displays the addTask html template
 * 
 */
function showAddTaskPopOut() {
    document.getElementById('popOut-taskCard').classList.remove('d-none');
}


/**
 * This function hides the addTask html template
 * 
 */
function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList.add('d-none');
}


/**
 * This function hides the right container
 * 
 */
function backToContactList() {
    document.getElementById('right-container').classList.remove("display");
    document.getElementById('kanban-contact').style.display ="none";
}




