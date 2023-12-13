let container = document.getElementById('wrapper');
let close = document.getElementById('close');
let subDiv = document.getElementById('sub-div');
let texter = document.getElementById('texter');
let add = document.getElementById('add');
let wrap = document.getElementById('wrap');
let form = document.getElementById('form');


function newList(url) {
    fetch(url, {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (display) {
        display.forEach(el => {
            createNewElement(el, url); 
        });
    })
    .catch(function (error) {
        console.error('Fetching error', error);
    });
}

close.addEventListener('click', () => {
    container.classList.remove('active');
});

function createNewElement(el, baseUrl) {
    let listDiv = document.createElement('div');
    listDiv.innerText = `${el.id} ${el.title}`;
    listDiv.classList.add('list');
    listDiv.setAttribute('data-id', el.id);
    subDiv.appendChild(listDiv);

    let delButton = document.createElement('button');
    delButton.innerText = 'Delete Post';
    delButton.classList.add('delButton');
    listDiv.appendChild(delButton);
    delButton.setAttribute('data-id', el.id);

    delButton.addEventListener('click', (e) => {
        e.stopPropagation();
        let theTarget = e.target.getAttribute('data-id');
        let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${theTarget}`;
        fetch(deleteUrl, {
            method: "DELETE",
        })
        .then(function() {
            listDiv.remove();
        })
    })

    listDiv.addEventListener('click', () => {
        container.classList.toggle('active');
        let getId = listDiv.getAttribute('data-id');
        let newUrl = `${baseUrl}/${getId}`; 
        fetch(newUrl, {
            method: 'GET'
        })
        .then(function (getter) {
            return getter.json();
        })
        .then(function (doIt) {
            texter.innerText = doIt.body;
        })
        .catch(function (error) {
            console.error('Fetching error', error);
        });
    });
}

newList('https://jsonplaceholder.typicode.com/posts', function (dataInfo) {
    dataInfo.forEach((el) => {
        createNewElement(el, 'https://jsonplaceholder.typicode.com/posts'); 
    });
});


add.addEventListener('click', function() {
    wrap.classList.toggle('visible');
})


form.addEventListener('submit', function(e) {
    e.preventDefault();
    let theValue = e.target[0].value;
    
    let datum = {
        title: theValue
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify(datum),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (after) {
        wrap.classList.remove('visible');
        createNewElement(after)
    })


})