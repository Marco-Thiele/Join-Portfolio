/**
 * Check the name, color, password and the id
 * 
 */
async function signUpUser() {
  let name = document.getElementById("sign-up-name-input").value;
  let email = document.getElementById("sign-up-email-input").value;
  let password = document.getElementById("sign-up-password-input").value;
  let userId = userAccounts.length;
  let userInitials;
  let userColor = randomUserColor();
  let splitName = name.split(" ");
  saveSplitName(splitName, userColor, userInitials, userId, password, email, name);
}

/**
 * set userInitials
 * 
 * @param {String} splitName 
 * @param {String} userColor 
 * @param {String} userInitials 
 * @param {Number} userId 
 * @param {String} password 
 * @param {String} email 
 * @param {String} name 
 */
async function saveSplitName(splitName, userColor, userInitials, userId, password, email, name){
  if (splitName.length !== 2) {
    document.getElementById('notRightName').classList.remove('d-none');
    document.getElementById('notRightName').innerHTML = "Please enter your first and last name";
  } else {
    for (let i = 0; i < splitName.length; i++) {
      let namePart = splitName[i];
      splitName[i] = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    saveUser(splitName, userColor, userInitials, userId, password, email, name);
  }
}


/**
 * Save user to backend
 * 
 * @param {String} splitName 
 * @param {String} userColor 
 * @param {String} userInitials 
 * @param {Number} userId 
 * @param {String} password 
 * @param {String} email 
 * @param {String} name 
 */
async function saveUser(splitName, userColor, userInitials, userId, password, email, name){
  name = splitName.join(" ");
  document.getElementById('notRightName').classList.add('d-none');
  userInitials = userNameInitial(name);
  await pushNewUser(name, email, password, userId, userInitials, userColor)
  await saveUserAccountsToBackend();
  document.getElementById("registerBox").classList.remove("display-none");
  setTimeout(backToLogin, 1000);
}


/**
 * Push preselected Tasks to the new account
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {Number} userId 
 * @param {String} userInitials 
 * @param {String} userColor 
 */
async function pushNewUser(name, email, password, userId, userInitials, userColor) {
  let user = userAccounts[1]
  let newUser = {
    userCategory: user.userCategory,
    userName: name,
    userEmail: email,
    userPassword: password,
    userId: userId,
    userInitials: userInitials,
    userColor: userColor,
    userContacts: user.userContacts,
    userTasks: user.userTasks,
  };
  userAccounts.push(newUser);
}


/**
 * Delete a User
 * 
 * @param {Number} i 
 */
function deleteUser(i) {
  let user = userAccounts
  user.splice(i,1);
  saveUserAccountsToBackend();
}


