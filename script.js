let h1 = document.createElement('h1');
h1.innerText = 'Список дел';

let root = document.getElementById('root');

let inputField = document.createElement('input');
inputField.setAttribute('placeholder', 'Введите текст');
inputField.className = 'input';

let addBtn = document.createElement('button');
addBtn.className = 'addBtn';
addBtn.innerText = 'Добавить';

let tabs = document.createElement('div');
tabs.setAttribute('id', 'tabs');

let tab1 = document.createElement('div');
tab1.className = 'tab whiteborder';
tab1.innerText = 'Выполненные дела';
let tab2 = document.createElement('div');
tab2.className = 'tab';
tab2.innerText = 'Невыполненные дела';

let tabContent1 = document.createElement('div');
tabContent1.className = 'tabContent';
let tabContent2 = document.createElement('div');
tabContent2.className = 'tabContent';

root.append(h1);
root.append(inputField);
root.append(addBtn);
root.append(tabs);
tabs.append(tab1);
tabs.append(tab2);
tabs.append(tabContent1);
tabs.append(tabContent2);


addBtn.addEventListener('click', addListItem);

function createListElements(inputValue, element) {
    let listItemDiv = document.createElement('div');
    listItemDiv.className = 'listItemDiv';
    tabContent2.append(listItemDiv);

    let listItem = document.createElement('p');
    listItem.className = 'listItem';
    listItem.innerText = inputValue;

    if(inputValue == '' || inputValue.trim() == '') {
        alert('Введите дело!');
    } 
    else {
        listItemDiv.append(listItem);
    }

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = 'X';
    listItemDiv.append(deleteBtn);

    let editBtn = document.createElement('button');
    editBtn.className = 'editBtn';
    editBtn.innerText = 'Редактировать';
    listItemDiv.append(editBtn);

    let completeBox = document.createElement('div');
    listItemDiv.append(completeBox);

    let completeText = document.createElement('p');
    completeBox.append(completeText);
    completeText.innerText = 'Выполнено: ';

    if (element != undefined && element.userId === 1 && element.completed === true) {
        let checkMark = document.createElement('img');
        checkMark.setAttribute('src', './check-mark.png');
        checkMark.className = 'checkMark';
        completeText.append(checkMark);
        tabContent1.append(listItemDiv);
    } else if (element != undefined && element.userId === 1 && element.completed === false) {
        const cancelMark = document.createElement('img');
        cancelMark.setAttribute('src', './cancel-mark.jpg');
        cancelMark.className = 'canсelMark';
        completeText.append(cancelMark);
        tabContent2.append(listItemDiv);
    }


    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editListItem);
}

function addListItem () {
    
    let input = document.querySelector('.input');
    let inputValue = input.value;

    addToLocalStorage(inputValue);
    createListElements(inputValue);

    input.value = '';
    
}

function deleteItem(event) {
    let delBtnParent = event.target.parentNode;
    let inputValue = delBtnParent.firstChild.innerText;
    let getLocalItem = JSON.parse(localStorage.getItem('inputValues'));
    let elIndex = getLocalItem.indexOf(inputValue);
    getLocalItem.splice(elIndex, 1);
    localStorage.setItem('inputValues', JSON.stringify(getLocalItem));
    delBtnParent.classList.add('delete');
    delBtnParent.addEventListener('animationend', () => {
        delBtnParent.remove();

    });
}

function editListItem(event) {
    
    let saveBtn = document.createElement('button');
    saveBtn.className = 'saveBtn';
    saveBtn.innerText = 'Сохранить';
    let parent = event.target.parentNode;
    let listItem = parent.firstElementChild;
    parent.append(saveBtn);

    let cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    cancelBtn.id = 'cancelBtn';
    cancelBtn.innerText = 'Отмена';
    parent.append(cancelBtn);

    let editListItemTxt = document.createElement('input');
    editListItemTxt.className = 'editListItemTxt';
    let inputValue = parent.firstChild.innerText;
    parent.firstElementChild.replaceWith(editListItemTxt);
    editListItemTxt.setAttribute('value', inputValue);

    let getLocalItem = JSON.parse(localStorage.getItem('inputValues'));
    let elIndex = getLocalItem.indexOf(inputValue);

    let editBtn = event.target;

    editBtn.replaceWith(saveBtn);

    
    saveBtn.addEventListener('click', saveNewTxt);

    function saveNewTxt() {
        let newInputValue = editListItemTxt.value;
        
        console.log(listItem);
        if(newInputValue == '' || newInputValue.trim() == '') {
            alert('Иди ты нахуй, дурачок');
        } else {
            listItem.innerText = newInputValue;
            editListItemTxt.replaceWith(listItem);
        }
        
        getLocalItem.splice(elIndex, 1, newInputValue);
        localStorage.setItem('inputValues', JSON.stringify(getLocalItem));

        editListItemTxt.replaceWith(listItem);
        saveBtn.replaceWith(editBtn);
        cancelBtn.remove();
    }

    cancelBtn.addEventListener('click', cancelChanges);

    function cancelChanges() {
        editListItemTxt.replaceWith(listItem);
        cancelBtn.replaceWith(editBtn);
        saveBtn.remove();
    }
}

function addToLocalStorage(listItemInnerText) {
    let data = JSON.parse(localStorage.getItem('inputValues'));
    data.push(listItemInnerText);
    localStorage.setItem('inputValues', JSON.stringify(data));
}


function rendering() {
    if(typeof(localStorage.getItem('inputValues')) === 'string') {
        let data = JSON.parse(localStorage.getItem('inputValues'));
        data.forEach(element => {
            createListElements(element);
        });
    }else {
        let array = [];
        localStorage.setItem('inputValues', JSON.stringify(array));
    }
}

let allTab
let allTabContent

window.onload = () => {
    allTab = document.getElementsByClassName('tab');
    allTabContent = document.getElementsByClassName('tabContent');
    hideTabsContent(1);
}

function hideTabsContent (a) {
    for (var i=a; i<allTabContent.length; i++) {
        allTabContent[i].classList.remove('show');
        allTabContent[i].classList.add("hide");
        allTab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = (event) => {
    let target = event.target;
    if (target.className=='tab') {
        for (var i=0; i<allTab.length; i++) {
            if (target == allTab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent (b) {
    if (allTabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        allTab[b].classList.add('whiteborder');
        allTabContent[b].classList.remove('hide');
        allTabContent[b].classList.add('show');
    }
}

rendering();

let requestURL = 'https://jsonplaceholder.typicode.com/todos';

let xhr = new XMLHttpRequest();

xhr.responseType = 'json';

xhr.onload = () => {
    let response = xhr.response;
    console.log(response);
    renderList (response);
}

xhr.open('GET', requestURL);
xhr.send();


function renderList (response) {
    response.forEach(element => {
        if (element.userId === 1) {
            createListElements(element.title, element);
        }
    })
}








