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

function Obj(gM, moveable, x, y, sizeX, sizeY, weight, spriteSrc){
    this.gM=gM;
    this.moveable=moveable;
    if(moveable){
        this.vel=new Vec(0, weight);
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
}
Obj.prototype.jump=function(){
    if(this.jumpStats.phase<2) {
        this.vel.y -= this.jumpStats.height;
        ++this.jumpStats.phase;
    }
};
Obj.prototype.move=function(){
    this.vel.update(this.acc.x, this.acc.y);
    this.pos.update(this.vel.x, this.vel.y);
    if(this.vel.y>10)this.vel.y=10;
    if(this.vel.y<-10)this.vel.y=-10;
    if(this.vel.x>10) this.vel.x=10;
    if(this.vel.x<-10)this.vel.x=-10;
};
function Player(gM, x, y){
	Obj.call(this, gM,true ,x||0, y||0, 16, 32, 2,'/matei/games/platformer/player.png');
    this.speed=4;
    this.jumpStats={
        phase:0,
        incrementation:-1,
        height:11
    };
    this.type='player';
    this.acc.y=this.weight/9.8
}
Player.prototype=Object.create(Obj.prototype);
Obj.prototype.draw=function(){
    this.gM.drawer.draw(this)
};
function Platform(gM, x, y, width){
	Obj.call(this, gM, true ,x||0, y||0, 16, 16, 2,'/matei/games/platformer/grass.png');
    this.fixed=true;
    this.jumpStats={
        phase:0,
        incrementation:0,
        height:0
    };
    this.type='platform';
    this.width=width;
}
Platform.prototype=Object.create(Obj.prototype);
Platform.prototype.draw=function() {
    for (var i = 0; i < this.width; ++i) {
        this.gM.drawer.drawXY(this, this.pos.x + this.size.width * i, this.pos.y);
    }
};
