var deepY, deepX;

var btn = document.getElementById('btn');
btn.addEventListener('click', startGame);

var obstacle = [];

function startGame() {
	gameArea.start();
	deep = new player();
}

 var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
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

 function gameComponent(x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;    
    c = gameArea.ctx;
    this.update = function() {
    c.fillStyle = color;
    c.fillRect(this.x,this.y,this.width,this.height);
    }
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
        if (((deepY >= othertop) && ((otherleft - deepX == 10) || (deepX - otherleft == otherright)))) {
            crash = true;
        }
        return crash;
    } 
});	
    }
 function updateGame() {
 	gameArea.clear();
   
    for (i = 0; i < obstacle.length; i += 1) {
        if (deep.crashWith(obstacle[i])) {
            gameArea.stop();
            return;
        } 
    }
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
 		obstacle[i].x+=-1;
 		obstacle[i].update();
 	} 
 	
 }