let inputDir = {x: 0,y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed=10;
let lastPaintTime=0;
let snakeArr = [
    {x:13, y:20}
]
let food = {x:6,y:9};
let score = 0;
let hiscore=0;

if(speed<10){
    document.getElementById("speedShow").value="0"+speed;
}
else{
    document.getElementById("speedShow").value=speed;
}
function up(){
    speed+=1;
    if(speed<10){
        document.getElementById("speedShow").value="0"+speed;
    }
    else{
        document.getElementById("speedShow").value=speed;
    }
}
function down(){
    speed-=1;
    if(speed<10){
        document.getElementById("speedShow").value="0"+speed;
    }
    else{
        document.getElementById("speedShow").value=speed;
    }
}
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //bump into itself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if bump into wall
    if(snake[0].x >=24 || snake[0].x <=0 || snake[0].y >=24 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // part 1 : updating the snake and food 
    musicSound.play();
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again.")
        snakeArr = [{x:13, y:20}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score : "+score;     
    }
    // when snake eats the food 
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=22;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
        foodSound.play();   
        score+=1;
        if(score>hiscore){
            hiscore=score;
            hiscoreBox.innerHTML="High Score : "+hiscore;
        }
        scoreBox.innerHTML="Score : "+score;     
    }

    // moving the snake 
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    // part 2 : displaying the snake and food 
    // displaying the snake

    board.innerHTML="";
    snakeArr.forEach((e,index)=> {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // displaying the food 
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp": console.log("ArrowUp")
                        inputDir.x=0;
                        inputDir.y=-1;
                        break;
        case "ArrowDown": console.log("ArrowDown")
                        inputDir.x=0;
                        inputDir.y=1;
                        break;
        case "ArrowLeft": console.log("ArrowLeft")
                        inputDir.x=-1;
                        inputDir.y=0;
                        break;
        case "ArrowRight": console.log("ArrowRight")
                        inputDir.x=1;
                        inputDir.y=0;
                        break;
    }
})