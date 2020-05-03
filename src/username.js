const form = document.querySelector(".username-form"),
  input = form.querySelector("input"),
  userName = document.querySelector(".identify-name"),
  userNameLabel = document.querySelector(".form label");

const USER_NAME = "currentName",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_NAME, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  idenfifyingName(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function idenfifyingName(text) {
  form.classList.remove(SHOWING_CN);
  userNameLabel.classList.add("noone");
  userName.classList.add(SHOWING_CN);
  userName.innerText = `${text}`;
}

function loadName() {
  const currentName = localStorage.getItem(USER_NAME);
  if (currentName === null) {
    askForName();
  } else {
    idenfifyingName(currentName);
  }
}

function init() {
  loadName();
}

init();
