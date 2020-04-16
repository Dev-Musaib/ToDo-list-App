const form = document.getElementById('addForm');
const itemList = document.getElementById('items');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

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
        if (confirm('Are you sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li)
        }
    }
}