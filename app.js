const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const filterItems = document.querySelector('.form-control');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
filterItems.addEventListener('keyup', filterOut)

function addItem(e) {
    e.preventDefault();

    let inp = document.getElementById('item').value;

    var li = document.createElement('li');

    let btn = document.createElement('button');
    btn.className = "btn btn-danger btn-sm float-right delete";

    btn.appendChild(document.createTextNode('X'))

    li.appendChild(btn);

    li.className = 'list-group-item'



    li.appendChild(document.createTextNode(inp));


    itemList.appendChild(li);

}


function removeItem(e) {
    if (e.target.classList.contains('delete')) {

        var li = e.target.parentElement;
        itemList.removeChild(li)

    }
}

function filterOut(e) {
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    Array.from(items).forEach((item) => {
        var itemName = item.lastChild.textContent;

        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none'
        }
    });

}