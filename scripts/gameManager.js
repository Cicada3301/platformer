function Keys(up, right, down, left){
	this.up=up;
	this.down=down;
	this.right=right;
	this.left=left;
    this.array=[up, down, right, left];
}
function Options(frames, updateMs, files){
    this.keys=new Keys(38, 39, 40, 37);
	this.files=files||{
		player:'/matei/games/platformer/player.png',
		platform:'/matei/games/platformer/grass.png'
	};
    this.timing={
        updateMs:updateMs,
        fps:frames,
        lag:0,
        previous: Date.now()
    }
}
function GameManager(){
	this.drawer = new CanvasDrawer('canvy');
	this.options = new Options(1000/60, 20);
	this.physics= new Physics(this, {top:0, bottom:this.drawer.size.height, left:0, right:this.drawer.size.width});
    this.objects=[new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*7, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*6, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*5, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*4, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*3, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*2, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), 0, Math.floor(Math.random()*3))];
	this.player = new Player(this, this.drawer.size.width/2, 0);
    this.objects.push(this.player);
}
GameManager.prototype.render=function(){
    this.drawer.draw(this.drawer.background);
    for(var currentObj=0; currentObj<this.objects.length; ++currentObj){
        this.objects[currentObj].draw();
    }
};
GameManager.prototype.update=function(){
    for(var currentObj=0; currentObj<this.objects.length; ++currentObj){
        var ent=this.objects[currentObj];
        if(ent.moveable){
            var isInCollision=false;
            switch(this.physics.checkBounding(ent)){
                case 'sides':ent.vel.x*=-1; break;
                case 'bottom':
                    if(ent.type==='platform'){
                        this.objects.splice(this.objects.indexOf(ent), 1);
                        this.objects.push(new Platform(this, Math.floor(Math.random()*240), 0, Math.floor(Math.random()*3)+2));
                    }else if(ent.type==='player'){
                        ent.pos.y=0;
                    } break;
            }
            for(var toCollideN=0; toCollideN<this.objects.length; ++toCollideN){
                var toCollide=this.objects[toCollideN];
                var collision=this.physics.checkCollision(ent, toCollide);
                if(toCollide===ent){isInCollision=false;
                }else if(collision){
                    isInCollision=toCollide;
                    toCollideN=this.objects.length;
                }
            }
            if(isInCollision&&ent.type==='player'){
                ent.vel.y=toCollide.vel.y;
                ent.jumpStats.phase=0;
            }
            ent.move();
        }
    }
};
GameManager.prototype.loop = function () {
    if(this.inGame) {
        var current = Date.now();
        var elapsed = current - this.options.timing.previous;
        this.options.timing.previous = current;
        this.options.timing.lag += elapsed;
        while (this.options.timing.lag >= this.options.timing.updateMs) {
            this.update();
            this.options.timing.lag -= this.options.timing.updateMs;
        }
        this.render();
        window.requestAnimationFrame(this.loop.bind(this));
    }
};
GameManager.prototype.init=function(){
    this.inGame=true;
    this.drawer = new CanvasDrawer('canvy');
    this.options = new Options(1000/60, 20);
    this.physics= new Physics(this, {top:0, bottom:this.drawer.size.height, left:0, right:this.drawer.size.width});
    this.objects=[new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*7, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*6, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*5, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*4, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*3, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8*2, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), this.drawer.size.height/8, Math.floor(Math.random()*3)),
        new Platform(this, Math.floor(Math.random()*240), 0, Math.floor(Math.random()*3))];
    this.player = new Player(this, this.drawer.size.width/2, 0);
    this.objects.push(this.player);
    this.loop();
};
GameManager.prototype.gameOver=function(){
    this.inGame=false;
};
GameManager.prototype.handleKey=function(key){
    switch(key){
        case 'left':this.player.vel.update(-this.player.speed/4, 0); break;
        case 'right':this.player.vel.update(this.player.speed/4, 0); break;
        case 'up':this.player.jump(); break;
    }
};
GameManager.prototype.keyDown = function(e) {
    switch (e.keyCode) {
        case this.options.keys.left:
            this.handleKey('left');
            break;
        case this.options.keys.up:
            this.handleKey('up');
            break;
        case this.options.keys.right:
            this.handleKey('right');
            break;
        case this.options.keys.down:
            this.handleKey('down');
            break;
    }
};