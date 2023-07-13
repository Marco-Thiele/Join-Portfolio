/**
 * This function is use to render Category with a Color Dots
 * 
 */
function renderCategory() {
    let categories = userAccounts[activeUser].userCategory;
    let categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = renderCategoryHTML();
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]['category'];
        const color = categories[i]['color'];
        categoryList.innerHTML += renderCategoryHTML2(i, category, color);
    }
    categoryList.innerHTML += renderCategoryHTML3();
}


/**
 * Render category for delete category
 * 
 */
function deleteCategoryAddTask() {
    let categories = userAccounts[activeUser].userCategory;
    let categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]['category'];
        const color = categories[i]['color'];
        categoryList.innerHTML += deleteCategoryAddTaskHTML(i, category, color)
    }
}


/**
 * Checks if you want to delete the category
 * 
 * @param {number} i 
 */
function wantDeleteCategory(i) { 
    let category = userAccounts[activeUser].userCategory[i].category;
    let color = userAccounts[activeUser].userCategory[i].color;
    let deleteDiv = document.getElementById('deleteCategory');
    deleteDiv.style.zIndex = "30";
    deleteDiv.innerHTML = '';
    deleteDiv.innerHTML = wantDeleteCategoryHTML(category, i)
    document.getElementById('colorCategory').style.color = color;
}


/**
 * delete the category
 * 
 * @param {number} i 
 */
async function deleteThisCategory(i) {
    let categories = userAccounts[activeUser].userCategory;
    categories.splice(i, 1);
    document.getElementById('deleteCategory').innerHTML = '';
    category = document.getElementById('input');
    category.value = "";
    unsetCategoryInputField();
    await saveUserAccountsToBackend();
    renderCategory();
    document.getElementById('deleteCategory').style.zIndex = "-1";
}


/**
 * delete not the category and render category again
 * 
 */
function notDeleteThisCategory() {
    document.getElementById('deleteCategory').innerHTML = '';
    category = document.getElementById('input');
    category.value = "";
    renderCategory();
    document.getElementById('deleteCategory').style.zIndex = "-1";
}


/**
 *  This function set Category InputField to default as in beginning with a placholder and a drop down Button
 *  
 */
function unsetCategoryInputField() {
    rejectNewCategory();
}


/**
 * This function shows Category Select Menu - toggle at clicking on the dropdown Button 
 * 
 */
function dropDown() {
    categoryList = document.getElementById('categoryList');
    if (categoryList.style.display == "block") {
        closeDropdownCategory();
    } else {
        showDropdownCategory();
    } closeDropDownAssignTo();
}


/**
 * This function shows the Category Select Menu
 * 
 */
function showDropdownCategory() {
    if (j == false) {
        categoryList = document.getElementById('categoryList');
        categoryInputContainer = document.getElementById('inputContainer');
        categoryList.style.display = "block";
        categoryInputContainer.style.borderBottom = "none";
        categoryInputContainer.style.borderRadius = "10px 10px 0 0";
        renderCategory();
    }
}


/**
 * This function choose one Category with it's color dot from the Category DropDown Menu
 * @param {number} index - position of the Category in the Array
 * @param {string} category - the name of the category
 * @param {color-hex-string} color - background color hex. code
 */
function chooseCategory(index, category, color) {
    let input = document.getElementById('input');
    input.value = '';
    input.value = category;
    document.getElementById('color').style.background = color;
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('buttonDropDown').style.display = "flex";
}


/**
 *  This function allows to insert in the category input field for new category input 
 * 
 */
function newCategoryInput() {
    closeDropdownCategory();
    document.getElementById('input').placeholder = 'New Category Name';
    document.getElementById('newCategoryInput').style.display = "flex";
    document.getElementById('buttonDropDown').style.display = "none";
    document.getElementById('newCategoryColorsBox').style.display = "flex";
    document.getElementById("input").disabled = false;
    l = true;
    j = true;
}


/**
 * 
 *  This function gets the background color for the new category color dot
 */

function newColor(color) {
    document.getElementById('color').style.background = color;
    newCategoryColor = color;
}


/**
 * The function allows to input new category name in the Category Array and input the color for the color Array
 * 
 */
async function addNewCategory() {
    var newCategory = document.getElementById('input');
    changeCategoryField(newCategory);
    categoriesArray.push(newCategory.value);
    if (newCategory !== '') {
        saveNewCategory(newCategory);
    }
    j = false;
}


/**
 * Close the categoryfield
 * 
 * @param {string} newCategory 
 */
function changeCategoryField(newCategory) {
    categoriesArray.push(newCategory.value);
    document.getElementById('newCategoryColorsBox').style.display = "none";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('buttonDropDown').style.display = "flex";
    document.getElementById('color').style.background = newCategoryColor;
    colorsArray.push(newCategoryColor);
}


/**
 * Save the new category
 * 
 * @param {string} newCategory 
 */
async function saveNewCategory(newCategory) {
    let newCategories = {
        'category': newCategory.value,
        'color': newCategoryColor
    }
    let category = userAccounts[activeUser].userCategory;
    category.push(newCategories);
    saveUserAccountsToBackend();
}


/**
 *  The function returns the Category Container to the default 
 * 
 */
function rejectNewCategory() {
    document.getElementById('buttonDropDown').style.display = "flex";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('input').value = "";
    document.getElementById('input').placeholder = 'Select task Category';
    document.getElementById('newCategoryColorsBox').style.display = "none";
    document.getElementById("input").disabled = true;
    document.getElementById('color').style = 'background: rgb(255,255,255)';
    j = false;
}


/**
 *  This function decides with the priority background color which Priority has been activated and get all the inputs of the one priority box
 * 
 */
function getPriorityInformation() {
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        getPriorityInformationUrgent();
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        getPriorityInformationMedium();
    } else if (document.getElementById('prioLowBox').classList.contains('bgLow')) {
        getPriorityInformationLow();
    }
}


/**
 * Set the Priority to urgent
 * 
 */
function getPriorityInformationUrgent() {
    p = true;
    priority = document.getElementById('prioUrgentBox').innerText;
    priorityImg = document.createElement("prioUrgentImg");
    priorityImg = "assets/img/urgent.png";
}


/**
 * Set the Priority to medium
 * 
 */
function getPriorityInformationMedium() {
    p = true;
    priority = document.getElementById('prioMediumBox').innerText;
    priorityImg = document.createElement("prioMediumImg");
    priorityImg = "assets/img/medium.png";
}


/**
 * Set the Priority to low
 * 
 */
function getPriorityInformationLow() {
    p = true;
    priority = document.getElementById('prioLowBox').innerText;
    priorityImg = document.createElement("prioLowImg");
    priorityImg = "assets/img/low.png";
}


/**
 * This function changes the Text and Image color to white of the Priority Urgent button, the other buttons (Prio Medium and Prio Low) change to their original color 
 * 
 */
function insertUrgent() {
    document.getElementById('prioUrgentBox').classList.add('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioUrgentImg').classList.add("Img-white");
    document.getElementById('prioMediumImg').classList.remove("Img-white");
    document.getElementById('prioLowImg').classList.remove("Img-white");
    toggleInsertUrgent();
    document.getElementById('prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
}


/**
 * This function toggles the white Text and Image of Priority Urgent to original color
 * 
 */
function toggleInsertUrgent() {
    document.getElementById("prioUrgentBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgUrgent');
        if (hasClass) {
            document.getElementById('prioUrgentBox').classList.add('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.add("Img-white");
        } else {
            document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.remove("Img-white");
        }
    });
}


/**
 * This function changes the Text- and Image-color to white of the Priority Medium button, other buttons (Prio Urgent and Prio Low) change to their original color 
 * 
 */
function insertMedium() {
    document.getElementById('prioMediumBox').classList.add('bgTextWhite');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowImg').classList.remove("Img-white");
    document.getElementById('prioUrgentImg').classList.remove("Img-white");
    document.getElementById('prioMediumImg').classList.add("Img-white");
    toggleInsertMedium();
    document.getElementById('prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioLowBox').classList.remove('bgLow');
}


/**
 * This function toggles the white Text and Image of Priority Medium to original color
 * 
 */
function toggleInsertMedium() {
    document.getElementById("prioMediumBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgMedium');
        if (hasClass) {
            document.getElementById('prioMediumBox').classList.add('bgTextWhite');
            document.getElementById('prioMediumImg').classList.add("Img-white");
        } else {
            document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
            document.getElementById('prioMediumImg').classList.remove("Img-white");
        }
    });
}


/**
 * This function changes the Text- and Image-color to white of the Priority low button, other buttons (Prio Urgent and Prio Medium) change to their original color 
 * 
 */
function insertLow() {
    document.getElementById('prioLowBox').classList.add('bgTextWhite');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowImg').classList.add("Img-white");
    document.getElementById('prioMediumImg').classList.remove("Img-white");
    document.getElementById('prioUrgentImg').classList.remove("Img-white");
    toggleInsertLow();
    document.getElementById('prioLowBox').classList.toggle('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
}


/**
 * This function toggles the white Text and Image of Priority Low to original color
 * 
 */
function toggleInsertLow() {
    document.getElementById("prioLowBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgLow');
        if (hasClass) {
            document.getElementById('prioLowBox').classList.add('bgTextWhite');
            document.getElementById('prioLowImg').classList.add("Img-white");
        } else {
            document.getElementById('prioLowBox').classList.remove('bgTextWhite');
            document.getElementById('prioLowImg').classList.remove("Img-white");
        }
    });
}