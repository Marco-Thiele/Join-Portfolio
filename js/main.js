let activeUser;
let loginCheckedBox;

/**
 * load data
 * 
 * @param {String} id 
 */
async function init(id) {
  await includeHTML();
  highlightSelectedNav(id);
  await loadUserData();
  changeProfileImg();
}


/**
 * Load user data
 * 
 */
async function loadUserData() {
  await loadUserAccountsFromBackend();
  loadActiveUserLocal();
  await loadTasksFromBackend()
}

/**
 * Change profile image
 * 
 */
function changeProfileImg() {
  let userInitials = userAccounts[activeUser]['userInitials'];
  let userColor = userAccounts[activeUser]['userColor'];
  userColor = String(userColor);
  document.getElementById('profile-img').innerHTML = `<div class="log-out">${userInitials}</div>`;
  document.getElementById('profile-img').style.backgroundColor = userColor;
}

/**
 * Show log out 
 * 
 */
function showLogOut(){
  if (window.innerWidth <801) {
    document.getElementById('help').style.display = '';
    document.getElementById('legal-notice-').style.display = '';
    setTimeout(() => {
      document.getElementById('help').style.display = 'none';
      document.getElementById('legal-notice-').style.display = 'none';
  }, 3000);
  }
  document.getElementById('log-out').style.display = '';
  setTimeout(() => {
    document.getElementById('log-out').style.display = 'none';;
}, 3000);
}


/**
 * reset local storage item 
 * 
 */
function resetT(){
  localStorage.setItem('t', false);
}


/**
 * change image for login checkbox
 * 
 */
function loginCheckbox() {
  if (loginCheckedBox) {
    document.getElementById("loginCheckbox").src = "./assets/img/unchecked.png";
    loginCheckedBox = false;
  } else {
    document.getElementById("loginCheckbox").src = "./assets/img/checked.png";
    loginCheckedBox = true;
  }
}


/**
 * Set a color for each user
 * 
 * @returns color
 */
function randomUserColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let rgbColor = `rgb(${r},${g},${b})`;
  return rgbColor;
}

/**
 * Includes Html
 * 
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


/**
 * loading user accounts from backend
 * 
 */
async function loadUserAccountsFromBackend() {
  await downloadFromServer();
  userAccounts = JSON.parse(backend.getItem('userAccounts')) || [];
}


/**
 * loading Tasks accounts from backend
 * 
 */
async function loadTasksFromBackend() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * Save accounts to backend
 * 
 */
async function saveUserAccountsToBackend() {
  await backend.setItem('userAccounts', JSON.stringify(userAccounts));
}


/**
 * Save tasks to backend
 * 
 */
async function saveTasksToBackend() {
  await backend.setItem('tasks', JSON.stringify(tasks));
}

/**
 * load active user
 * 
 */
function loadActiveUserLocal() {
  activeUser = localStorage.getItem('activeUser');
}


/**
 * Highlighted the selected navbar
 * 
 * @param {Number} id 
 */
function highlightSelectedNav(id) {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.add("selected");
  }, 10);
}

/**
 * get Username initials
 * 
 */
function userNameInitial(name) {
  let initials = "";
  let nameSplit = name.split(" ");

  for (let i = 0; i < nameSplit.length; i++) {
    let initial = nameSplit[i].charAt(0);
    initials += initial;
  }
  return initials;
}