/**
 * Render showContact
 * 
 * @param {string} color 
 * @param {string} bothLetters 
 * @param {string} contactName 
 * @param {number} j 
 * @param {string} email 
 * @param {number} phone 
 */
function renderHTMLShowContact(color, bothLetters, contactName, j, email, phone) {
    document.getElementById('contact-circle-letters').innerHTML = `${bothLetters}`;
    document.getElementById('contact-circle').style.backgroundColor = `${color}`;
    document.getElementById('float-contact-name').innerHTML = `${contactName}`;
    document.getElementById('contact-information').innerHTML = `<h4>Contact information</h4>
    <a class="edit" onclick="editContactCard(${j});"><img src="assets/img/edit-contact.png"><p>Edit contact</p></a>`;
    document.getElementById('responsive-buttons').innerHTML = `
    <button class="delete-button-responsive" onclick="deleteContact(${j});"><img src="assets/img/delete-contact.png"> </button>
    <button class="edit-button-responsive" onclick="editContactCard(${j});"><img src="assets/img/edit-contact2.png"> </button>`;
    document.getElementById('email').innerHTML = `${email}`;
    document.getElementById('phone').innerHTML = `${phone}`;
}


/**
 * This function changes the add-contact card to the edit contact card
 * 
 * @param {number} j is the number that leads to the specific position of the array
 */
function changeTemplate(j) {
    document.getElementById('card-header').innerHTML = '<h3>Edit contact</h3>';
    document.getElementById('btn-container').innerHTML = `                
    <button id="left-btn" onclick="deleteContact(${j})" class="btn-contact-white">Delete<img class="cancel-img"
    src="assets/img/contact-cancel-button.png"></button>
    <button id="right-btn" onclick="editContact(${j})" class="btn-contact-blue">Save<img class="create-contact-img"
    src="assets/img/contact-create-contact-button.png"></button>`;
    document.getElementById('right-btn').classList.add("width-btn");
}


/**
 * This function changes the edit-contact card to back the add contact card
 * 
 */
function changeTemplateBack() {
    document.getElementById('icon-container').innerHTML = '<img src="assets/img/add-contact-profile.png">';
    document.getElementById('card-header').innerHTML = `<h3>Add contact</h3>
    <p>Tasks are better with a team!</p>`;
    document.getElementById('btn-container').innerHTML = `                
    <button id="left-btn" onclick="closeContactCard()" class="btn-contact-white">Cancel<img class="cancel-img"
    src="assets/img/contact-cancel-button.png"></button>
    <button id="right-btn" onclick="CreateNewContact()" class="btn-contact-blue">Create contact<img class="create-contact-img"
    src="assets/img/contact-create-contact-button.png"></button>`;
    document.getElementById('right-btn').classList.remove("width-btn");
}


/**
 * This function renders the namecards in the contactlist
 * 
 * @param {number} i is the id number of the contact-card
 * @param {string} name is the name of the contact
 * @param {email} email is the email of the contact
 * @param {number} j is the number that leads to the specific position of the array
 * @param {string} bothLetters are the initial of the contact
 */
function templateNameCard(i, name, email, j, bothLetters) {
    document.getElementById('contact-cards' + i).innerHTML += `
    <div class="name-card" id=name-card${j} onclick="showContact(${j},'${bothLetters}')">
      <div class="circle" id="circle${j}">${bothLetters}</div>
      <div class="info">
            <h4> ${name} </h4>
             <p> ${email} </p>
     </div>
    </div>`;
}


/**
 * This function renders the contactlist-cards-box
 * 
 * @param {string} letter is the alphabetic character
 * @param {number} i is the id number of the contact-card
 */
function templateLetter(letter, i) {
    document.getElementById('contact-container').innerHTML +=
        `<div class="contact-list">
        <div id="letter-container">
        ${letter}
        </div>
        <span class="vertical-line"></span>
        <div class="contact-cards" id="contact-cards${i}">
        </div>
    </div>`;
}