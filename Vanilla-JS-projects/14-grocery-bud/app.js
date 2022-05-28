// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addItem(event) {
  event.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert('item added to the list', 'success');
    container.classList.add('show-container');
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('value changed', 'success');
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert('please enter value', 'danger');
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1500);
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

function deleteItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) container.classList.remove('show-container');
  displayAlert('item removed', 'danger');
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  editElement = event.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit';
}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const groceryToAdd = { id, value };
  let items = getLocalStorage();

  items.push(groceryToAdd);
  localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) item.value = value;
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}

function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <em class="fas fa-edit"></em>
            </button>
            <button type="button" class="delete-btn">
                <em class="fas fa-trash"></em>
            </button>
        </div>
        `;
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);

  list.appendChild(element);
}
