let gameSeq=[];
let userSeq=[];
let btns=["yellow", "red", "purple", "green"]
let started = false;
let level = 0;
let highsc=0;
highsc = localStorage.getItem("highsc") ? parseInt(localStorage.getItem("highsc")) : 0;
let h2=document.querySelector("h2");
let p=document.querySelector("p");
let allBtns=document.querySelectorAll(".btn");
document.addEventListener("keypress", function(){
    if(started==false){
    console.log("game started");
    started=true;
    levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 500)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 500)
}


function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    
}

function checkAns(idx){
if(userSeq[idx]==gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
       setTimeout(levelUp, 500);
    }
    console.log(highsc);
    if(highsc<level){
        highsc=level;
        localStorage.setItem("highsc", highsc);
        highsc = localStorage.getItem("highsc") ? parseInt(localStorage.getItem("highsc")) : 0;
        console.log(highsc);
    }
}else {
    
    console.log("highsc", highsc);
    h2.innerHTML=`Better Luck Next Time ! <b> Score was ${level}</b> <br> Press Any Key To Restart <br> <p>Hightest Score Was ${highsc+1}</p>`;
    
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    }, 1000)
    reset();
}
}

function btnpress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

for(btn of allBtns){
    btn.addEventListener("click", btnpress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[]; 
    level=0;
}

