const form = document.getElementById("addForm");
const itemList = document.getElementById("items");
const filterItems = document.querySelector(".form-control");
let inp = document.getElementById("item");

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
filterItems.addEventListener("keyup", filterOut);
document.addEventListener("DOMContentLoaded", getItems);

function addItem(e) {
  e.preventDefault();

  let li = document.createElement("li");

  let btn = document.createElement("button");
  btn.className = "btn btn-danger btn-sm float-right delete";

  btn.appendChild(document.createTextNode(""));

  li.appendChild(btn);

  li.className = "list-group-item";

  li.appendChild(document.createTextNode(inp.value));

  itemList.appendChild(li);

  addItemToLocalStorage(inp.value);

  inp.value = "";
}

function addItemToLocalStorage(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));
}

function getItems() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach((i) => {
    let li = document.createElement("li");

    let btn = document.createElement("button");
    btn.className = "btn btn-danger btn-sm float-right delete";

    btn.appendChild(document.createTextNode(""));

    li.appendChild(btn);

    li.className = "list-group-item";

    li.appendChild(document.createTextNode(i));

    itemList.appendChild(li);
  });
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    itemList.removeChild(li);
    removeItemFromLocalStorage(e.target.parentElement);
  }
}

function removeItemFromLocalStorage(hello) {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach((task, index) => {
    if (hello.textContent === task) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

function filterOut(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName("li");

  Array.from(items).forEach((item) => {
    var itemName = item.lastChild.textContent;

    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
