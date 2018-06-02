var deepY, deepX, deep, myScore, score1=0;

var btn = document.getElementById('btn');
var btn1 = document.getElementById('btn1');
btn.addEventListener('click', startGame);

var obstacle = [];

function startGame() {
	gameArea.start();
	myScore = new score();
	deep = new player();
}

 var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
    	btn.style.visibility = 'hidden';
    	this.canvas.width = 900;
    	this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGame, 20);
        this.frameNo = 0;
    },
    clear : function() {
    	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }

 }

 function gameComponent(x,y,width,height,color,type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;    
    c = gameArea.ctx;
    this.update = function() {
    
    c.fillStyle = color;
    c.fillRect(this.x,this.y,this.width,this.height);}
    
 }

function player() {
    	gameArea.canvas.addEventListener('mousemove', function(e) {
    		deepX = e.clientX;
    		deepY = e.clientY;
    	c.beginPath();
    	c.arc(deepX,deepY,10,0,Math.PI * 2,false);
    	c.strokeStyle = 'yellow';
    	c.fillStyle = 'yellow';
    	c.stroke(); c.fill();
    	
    
    	this.crashWith = function(otherobj) {
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        if (((deepY >= othertop) && ((otherleft - deepX == 10) || (deepX - otherleft == otherright)) && (deepY<= otherbottom))) {
            crash = true;
        }
        return crash;
    }  
    for(i = 0; i < obstacle.length; i += 1) {
        if (this.crashWith(obstacle[i])) {
            gameArea.canvas.style.visibility = 'hidden';
            alert("game over SCORE::::"+(score1-1));
            gameArea.stop();
            btn1.style.visibility = 'visible';
            return;
        } 
    }
});	
    }
function score() {
       
       this.updateScore = function() {
       	c.font = '40px Arial';
       	c.fillStyle = 'white';
       	c.fillText("SCORE",90,100);
       	c.fillText(score1,100,150);
       }
}
 function updateGame() {
 	gameArea.clear();
   
   
 	var x = 900;
 	gameArea.frameNo++;
 	if(gameArea.frameNo == 1 || (gameArea.frameNo % 60) == 0) {
 		minHeight = 0;
        maxHeight = 240;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 30;
        maxGap = 80;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
 		obstacle.push(new gameComponent(x,0,20,height,'black'));
 		obstacle.push(new gameComponent(x,height+gap,20,x-height-gap,'black'));
 	}
 	for(i=0;i<obstacle.length;i++) {
 		console.log(obstacle[i].y);
 		obstacle[i].x+=-1;
 		obstacle[i].update();
 	} 
 	 score1++;
    myScore.updateScore();
 }