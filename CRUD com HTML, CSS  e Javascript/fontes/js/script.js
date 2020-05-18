window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = 0;

function start(){
    preventFormSubmit();

    activateInput();        

    render();
}

var activateInput = () =>{
    let insertName = (name) =>{
        globalNames.push(name);
        
        render();
    }

    let updateName = (name) =>{
        globalNames[currentIndex] = name;
        render();
    }

    let handleTyping = (event) =>{
        let hasText = !!event.target.value && event.target.value.trim() !== '';

        if(!hasText){
            clearInput();
            return;
        }
        
        if(event.key === 'Enter' && event.target.value.trim() !== ''){
            let name = event.target.value.trim();            

            if(isEditing){
                updateName(name);
            }else{
                insertName(name);
            }

            isEditing = false;
        }
    }

    inputName = document.querySelector("#inputName");    

    inputName.addEventListener('keyup', handleTyping);
}

var preventFormSubmit = () =>{
    let handleFormSubmit = (event) =>{
        event.preventDefault();
    }

    let form = document.querySelector('form');

    form.addEventListener('submit', handleFormSubmit);
}

var render = () =>{
    let createDeleteButton = (index) =>{
        let deleteName = () =>{            
            globalNames.splice(index, 1);
            render();
        }

        let button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);

        return button;
    }

    let createSpan = (item, index) =>{
        let editItem = () =>{
            inputName.value = item;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        let span = document.createElement('span');
        span.textContent = item;
        span.classList.add('clickable');
        span.addEventListener('click', editItem);

        return span;
    }

    let divNames = document.querySelector("#names");

    divNames.innerHTML = '';

    let ul = document.createElement('ul');

    let elementsLooping = (item, index) =>{
        let li = document.createElement('li');        
        let button = createDeleteButton(index);
        
        let span = createSpan(item, index);

        li.appendChild(button);
        li.appendChild(span);        
        ul.appendChild(li);
    }

    globalNames.forEach(elementsLooping);

    divNames.appendChild(ul);

    clearInput();
}

var clearInput = ()=>{
    inputName.value = '';
    inputName.focus();
}