"use strict";

const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elTodoList = document.querySelector(".todo__list");

const elButtons = document.querySelector(".buttons");
const elCountAll = document.querySelector(".all__count");
const elCountCompleted = document.querySelector(".completed__count");
const elCountUncompleted = document.querySelector(".uncompleted__count");

const elBtnAll = document.querySelector(".all");
const elBtnCompleted = document.querySelector(".completed");
const elBtnUncompleted = document.querySelector(".uncompleted");

const todosStorage = JSON.parse(window.localStorage.getItem("todos"))

const todos = todosStorage || [];

elTodoList.addEventListener("click", function (evt) {
  const todoDeleteBtnId = Number(evt.target.dataset.deleteBtnId);
  const foundTodoIndex = todos.findIndex((todo) => todo.id === todoDeleteBtnId);

  const todoCheckboxId = Number(evt.target.dataset.checkboxId);
  const foundCheckboxIndex = todos.find((todo) => todo.id === todoCheckboxId);

  if (evt.target.matches(".delete__btn")) {
    todos.splice(foundTodoIndex, 1);

    elTodoList.innerHTML = null;
    window.localStorage.setItem("todos", JSON.stringify(todos))

    if (todos.length === 0) {
      window.localStorage.removeItem("todos")
    }
    renderTodos(todos, elTodoList);
  } else if (evt.target.matches(".checkbox")) {
    foundCheckboxIndex.isComleted = !foundCheckboxIndex.isComleted;

    elTodoList.innerHTML = null;

    window.localStorage.setItem("todos", JSON.stringify(todos))
    renderTodos(todos, elTodoList);
  }
});

const renderTodos = function (arr, htmlElement) {
  elCountAll.textContent = todos.length;

  elCountCompleted.textContent = todos.filter(
    (todo) => todo.isComleted === true
  ).length;

  elCountUncompleted.textContent = todos.filter(
    (todo) => todo.isComleted === false
  ).length;

  arr.forEach((todo) => {
    const newItem = document.createElement("li");
    const newTitle = document.createElement("h5");
    const newInput = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newItem.setAttribute("class", "mb-2 d-flex align-items-center list-group-item fs-4 bg-info bg-opacity-50 rounded-2 ps-2");
    newTitle.setAttribute("class", "m-0 me-2 me-auto overflow-hidden");
    newTitle.style.maxWidth = "205px"
    newTitle.textContent = todo.title;
    newInput.setAttribute("class", "checkbox me-2");
    newInput.type = "checkbox";
    newInput.dataset.checkboxId = todo.id;
    newDeleteBtn.setAttribute("class", "delete__btn btn btn-danger");
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.dataset.deleteBtnId = todo.id;

    if (todo.isComleted) {
      newInput.checked = true;

      newTitle.style.textDecoration = "line-through";
    }

    htmlElement.appendChild(newItem);
    newItem.appendChild(newTitle);
    newItem.appendChild(newInput);
    newItem.appendChild(newDeleteBtn);
  });
};
renderTodos(todos, elTodoList);

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const formInputValue = elFormInput.value;

  const newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: formInputValue,
    isComleted: false,
  };

  todos.push(newTodo);

  window.localStorage.setItem("todos", JSON.stringify(todos))

  elFormInput.value = null;
  elTodoList.innerHTML = null;

  renderTodos(todos, elTodoList);
});

elButtons.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (evt.target.matches(".all")) {
    elTodoList.innerHTML = null;
    renderTodos(todos, elTodoList);
  } else if (evt.target.matches(".completed")) {
    elTodoList.innerHTML = null;
    const completedTodos = todos.filter((todo) => todo.isComleted);
    renderTodos(completedTodos, elTodoList);
  } else if(evt.target.matches(".uncompleted")){
    elTodoList.innerHTML = null
    const uncompletedTodos = todos.filter((todo) => !todo.isComleted);
    renderTodos(uncompletedTodos, elTodoList);
  }
});
