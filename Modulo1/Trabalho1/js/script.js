'use strict';

window.addEventListener('load', () => {
    var red = document.querySelector("#red");    
    
    var green = document.querySelector("#green");    

    var blue = document.querySelector("#blue");    

    red.addEventListener('change', redOnChange);

    green.addEventListener('change', greenOnChange);

    blue.addEventListener('change', blueOnChange);    
});

var redOnChange = (event) =>{    
    document.querySelector("#redtext").value = event.target.value;
    changeCss();
}

var greenOnChange = (event) =>{        
    document.querySelector("#greentext").value = event.target.value;
    changeCss();
}

var blueOnChange = (event) =>{    
    document.querySelector("#bluetext").value = event.target.value;
    changeCss();
}

var changeCss = () => {
    let red = document.querySelector("#redtext").value;

    let green = document.querySelector("#greentext").value;

    let blue = document.querySelector("#bluetext").value;

    document.querySelector("#cubo").style.backgroundColor = `rgb(${red},${green},${blue})`;
}