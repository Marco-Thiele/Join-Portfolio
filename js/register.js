async function signUpUser() {
  let name = document.getElementById("sign-up-name-input").value;
  let email = document.getElementById("sign-up-email-input").value;
  let password = document.getElementById("sign-up-password-input").value;
  let userId = userAccounts.length;
  let userInitials;
  let userColor = randomUserColor();
  let splitName = name.split(" ");
  if (splitName.length !== 2) {
    document.getElementById('notRightName').classList.remove('d-none');
    document.getElementById('notRightName').innerHTML = "Please enter your first and last name";
  } else {
    for (let i = 0; i < splitName.length; i++) {
      let namePart = splitName[i];
      splitName[i] = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    name = splitName.join(" ");
    document.getElementById('notRightName').classList.add('d-none');
    userInitials = userNameInitial(name);
    await pushNewUser(name, email, password, userId, userInitials, userColor)
    await saveUserAccountsToBackend();
    document.getElementById("registerBox").classList.remove("display-none");
    setTimeout(backToLogin, 1000);
  }
}

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


function deleteUser(i) {
  let user = userAccounts
  user.splice(i,1);
  saveUserAccountsToBackend();
}


