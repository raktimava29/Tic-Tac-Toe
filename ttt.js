//arrow functions work only with => like in L10 & L33 and not with >= 

let blocks = Array.from(document.getElementsByClassName('box'))
let status = document.getElementById('status')
let res = document.getElementById('res')
let strike = document.getElementById('strike')

let running = false

const O = 'O';
const X = 'X';
let curr = X;
let blank = Array(9).fill(null);

start = () =>{
    blocks.forEach(block => block.addEventListener('click',Clicked))
    res.addEventListener('click', restart);
}

function hover() {
    blocks.forEach((block) => {
      block.classList.remove("X-hover");
      block.classList.remove("O-hover");
    });
  
    const hoverClass = `${curr}-hover`;
  
    blocks.forEach((block) => {
      if (block.innerHTML == '') {
        block.classList.add(hoverClass);
      }
    });
}

hover();

function Clicked(e){
    running = true;
    const id = e.target.id  
    if(!blank[id] && running){
        e.target.innerHTML = curr;
        blank[id] = curr;
        win();
        hover();
    }
    if(!running){
        for(i=0 ; i<blank.length ; i++){
            if(blank[i] == null){
                blank[i]=' ';
            }
        }
    }
}

change = () => {
    if(curr == 'X'){
        curr = 'O'
        status.innerHTML=`${curr}'S TURN !!`; 
    }
    else{
        curr = 'X';
        status.innerHTML=`${curr}'S TURN !!`;
    }
}

function restart(){
    blank.fill(null)
    blocks.forEach(abc => {
        abc.innerHTML = ''
        hover();
        abc.style.opacity = '1'
        strike.setAttribute("class","strike")
    })
    curr = X;
    status.innerHTML='PLAY!!'; 
}

combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

win = () => {
    let flag = false;
    let c = 0;
    for(i=0 ; i<combinations.length ; i++){
        combo = combinations[i];
        a = blank[combo[0]];
        b = blank[combo[1]];
        c = blank[combo[2]];

        if(a =='' ||b ==''||c ==''){
            continue;
        }

        if( a && a == b && b == c){
        flag = true;
        winner();
        document.getElementById(combo[0]).style.opacity = '0.5'
        document.getElementById(combo[1]).style.opacity = '0.5'
        document.getElementById(combo[2]).style.opacity = '0.5'
        break;
        }
    }
    if(flag){
        abc = `${curr}`
        status.innerHTML=`VICTORY!!!!`;
        setTimeout("alert(abc + '  WINS')",200)
        running = false;
        setTimeout(restart,200)
    }
    else if(!blank.includes(null)){
        status.innerHTML="DRAW!!"
    }
    else{  
        change();
    }
    
}

winner = () => {
    if(JSON.stringify(combo) === JSON.stringify([0, 1, 2])){
        strike.classList.add("strike-row-1");
    }
    else if(JSON.stringify(combo) === JSON.stringify([3,4,5])){
        strike.classList.add("strike-row-2");
    }
    else if(JSON.stringify(combo) === JSON.stringify([6,7,8])){
        strike.classList.add("strike-row-3");
    }
    else if(JSON.stringify(combo) === JSON.stringify([0, 3, 6])){
        strike.classList.add("strike-column-1");
    }
    
    else if(JSON.stringify(combo) === JSON.stringify([1, 4, 7])){
        strike.classList.add("strike-column-2");
    }
    else if(JSON.stringify(combo) === JSON.stringify([2,5,8])){
        strike.classList.add("strike-column-3");
    }
    else if(JSON.stringify(combo) === JSON.stringify([0,4,8])){
        strike.classList.add("strike-diagonal-1");
    }
    else if(JSON.stringify(combo) === JSON.stringify([2,4,6])){
        strike.classList.add("strike-diagonal-2");
    }
}


start();