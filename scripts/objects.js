function Vec(x, y){
	this.x=x;
	this.y=y;
}
Vec.prototype.set = function(x, y){
	this.x=x;
	this.y=y;
};
Vec.prototype.update = function(x, y){
	this.x+=x;
	this.y+=y;
};
Vec.prototype.increment = function(obj){
	obj.x+=this.x;
	obj.y+=this.y;
};

function Obj(gM, movable, x, y, sizeX, sizeY, weight, spriteSrc){
    this.movable=movable;
    if(movable){
        this.vel=new Vec(0, 0);
        this.acc=new Vec(0, 0);
    }
	this.pos=new Vec(x, y);
    this.weight=weight;
	this.size={
		width:sizeX,
		height:sizeY
	};
	this.sprite=new Image();
	this.sprite.src=spriteSrc;
    gM.objects.push(this);
}
Obj.prototype.applyGravity=function(){
    gM.physics.applyGravity(this);
};
Obj.prototype.move=function(){
    var isColliding=false;
    for(var i=0; i<gM.objects.length; ++i) {
        if (gM.physics.checkCollision(this.pos, gM.objects[i])) {
            isCollising = true;
        }
    }
    if(!isColliding){
        this.vel.update(this.acc.x, this.acc.y);
        this.pos.update(this.vel.x, this.vel.y);
        this.applyGravity();
    }else{
        this.vel.set(0, 0)
    }
};
function Player(gM, x, y){
	Obj.call(this, gM,true ,x||0, y||0, 16, 32, 3,'/matei/games/platformer/player.png');
}
Player.prototype=Object.create(Obj.prototype);
Obj.prototype.draw=function(){
    gM.drawer.draw(this)
};
function Platform(gM, x, y, width){
	Obj.call(this, gM, true ,x||0, y||0, width, 16, 0,'/matei/games/platformer/grass.png')
}
Platform.prototype=Object.create(Obj.prototype);
