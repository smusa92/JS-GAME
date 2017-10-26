var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

star = new Image();
star.src = 'https://constellation.standuptocancer.org/assets/star-facbd92545e601590a94bd3fd813f643.png';

shipImg = new Image();
shipImg.src = 'https://jackrugile.com/images/misc/rocket-sprite.png';

var osX=750;
var randomStarY = Math.floor(Math.random() * 480) + 15 ;

var score = 0;
var starScore = 0;

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
    osX--;
}

function drowShip(){
	ctx.beginPath();
        ctx.drawImage( shipImg, shipX, shipY,40,30);
	ctx.closePath();
	}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("Score: "+score+"/"+starScore, 8, 20);
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

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drowShip();
    drowStar();
    drawScore();
    collisionDetection();
    if(osX<10){
     newStar();
        }
        if(osX<750 && osX>748){
    starScore++;
    }
    if(rightPressed && shipX < canvas.width){
        shipX += 3;
    }
    else if(leftPressed && shipX > 0){
        shipX -= 3;
    }
    else if(upPressed && shipY > 10){
        shipY -= 3;
    }
    else if(downPressed && shipY < 520){
        shipY += 3;
    }
}
setInterval(draw,10);
