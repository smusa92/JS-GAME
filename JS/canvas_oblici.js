var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

star = new Image();
star.src = 'https://constellation.standuptocancer.org/assets/star-facbd92545e601590a94bd3fd813f643.png';

shipImg = new Image();
shipImg.src = 'https://jackrugile.com/images/misc/rocket-sprite.png';

heart = new Image();
heart.src = 'https://images-na.ssl-images-amazon.com/images/I/41YYECsFLpL.png';

rock = new Image();
rock.src = 'http://vignette2.wikia.nocookie.net/scribblenauts/images/a/aa/Meteor_HD.png/revision/latest?cb=20121228002932';

var osX=750;
var randomStarY = Math.floor(Math.random() * 480) + 15 ;
var osY=Math.floor(Math.random() * 480) + 15 ;
var randomStarX = Math.floor(Math.random() * 740) + 15 ;
var osYR = 0;
var randomStarXR = Math.floor(Math.random() * 740) + 15 ;

var score = 0;
var starScore =-1;
var lives = 3;
var speed = 2;
speedRock = 4;

var numberLevel = 1;

var rightPressed =leftPressed =upPressed =downPressed = false;

var shipWidth = shipImg.width;
var shipHeight = shipImg.height;
var shipX=(canvas.width-shipWidth)/2;
var shipY=((canvas.height-shipHeight)/2)-5;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
	if(e.keyCode==39){	
		rightPressed=true;	
	}
	else if(e.keyCode==37){	
		leftPressed=true;
		}
        else if(e.keyCode==38){	
		upPressed=true;
		}
        else if(e.keyCode==40){	
		downPressed=true;
		}
                else if(e.keyCode==80){
		alert("PAUSE! \n Press OK to continue.");
		}
	}
function keyUpHandler(e){
	
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
		}
        else if(e.keyCode==38){	
		upPressed=false;
		}
        else if(e.keyCode==40){	
		downPressed=false;
		}
	}
function drowStar(){
    ctx.beginPath();
    ctx.drawImage(star,osX, randomStarY, 21, 21);
    ctx.closePath();
    ctx.restore();
    osX=osX-speed;
}
function drowRock(){
    ctx.beginPath();
    ctx.drawImage(rock, randomStarXR,osYR, 21, 21);
    ctx.closePath();
    ctx.restore();
    osYR=osYR+speedRock/4;
}
function drowHeart(){

    ctx.beginPath();
    ctx.drawImage(heart, randomStarX,osY, 21, 21);
    ctx.closePath();
    ctx.restore();
}

function drowShip(){
	ctx.beginPath();
        ctx.drawImage( shipImg, shipX, shipY,40,30);
	ctx.closePath();
	}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("Score: "+score+" / "+starScore, 8, 20);
}
function newStar(){
    osX=750;
    randomStarY = Math.floor(Math.random() * 480) + 15 ;
       drowStar();
}

function collisionDetection() {
	if(shipX+20>osX && shipX<osX+21 && shipY+20>randomStarY && shipY<randomStarY+21){
            //ctx.clearRect(osX-750, randomStarY, 21, 21);
            newStar();
            score++;
        }     
}
function collisionDetectionHeart() {
    if(shipX+20>randomStarX && shipX<randomStarX+21 && shipY+20>osY && shipY<osY+21){
            ctx.clearRect(randomStarX, osY, 21, 21);
            osY=Math.floor(Math.random() * 480) + 15 ;
            randomStarX = Math.floor(Math.random() * 740) + 15 ;
            lives++;
        }
}
function collisionDetectionRock() {
    if(shipX+20>randomStarXR && shipX<randomStarXR+21 && shipY+speedRock/2>osYR && shipY<osYR){
            if(starScore>20)
            {
            lives-=0.5;
            } 
            else{
                lives--;
            }
        }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawLevel(numberLevel) {
    ctx.font = "30px bold Courier New ";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("Level: "+numberLevel, canvas.width/2.4, 40);
}

function shakeCanvas() {
canvas.style.animation= 'shake 0.5s';
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel(numberLevel);
    drowShip();
    drowStar();
    drawScore();
    drawLives();
    collisionDetection();
    collisionDetectionHeart();
    collisionDetectionRock();
    if(osX<=2 ){
    shakeCanvas();
    lives--;
    newStar();
    }
    if(osY>=480){
        shakeCanvas();
        drowRock();
    }
    if( osYR>=480){
        osYR = 0;
        randomStarXR=Math.floor(Math.random() * 740) + 15 ;
        drowRock();
    }
    if(starScore>15 && starScore<18 || starScore>25 && starScore<28|| starScore>45 && starScore<49){drowHeart(); }
    
    if(starScore>12){drowRock();numberLevel=2;}
    if(starScore>20){
        numberLevel=3;
        speedRock = 5;
    }
    if(score>40 && score<60){
        speed = 2.5;   
        numberLevel=4;
        speedRock = 6;
    }
    if(score>60 && score<80 ){
        speed = 2.8;
        numberLevel=5;
        speedRock = 7;
    }
    if(score>80){
        speed = 3.3;
        numberLevel=6;
    }
    if(starScore == 100) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
    }
    if(osX<750 && osX>749.5-(speed)){
    starScore++;
    }
    /*if(!lives){
        alert("GAME OVER");
        document.location.reload();
    }*/
    if(rightPressed && shipX < canvas.width){
        shipX += speed+0.5;
    }
    else if(leftPressed && shipX > 0){
        shipX -= speed+0.5;
    }
    else if(upPressed && shipY > 10){
        shipY -= speed+0.5;
    }
    else if(downPressed && shipY < 520){
        shipY += speed+0.5;
    }
}
setInterval(draw,10);
