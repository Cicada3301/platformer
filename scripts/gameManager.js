function Keys(up, right, down, left){
	this.up=up;
	this.down=down;
	this.right=right;
	this.left=left;
}
function Options(frames, updateMs, files){
	this.fps=frames;
	this.updateMs=updateMs;
	this.files=files||{
		player:'/matei/games/platformer/player.png',
		platform:'/matei/games/platformer/grass.png'
	};
}
function GameManager(){
    this.objects=[];
	this.drawer = new CanvasDrawer('canvy');
	this.options = new Options(1000/60, 20);
	this.physics= new Physics({top:0, bottom:this.drawer.size.height, left:0, right:this.drawer.size.width});
	this.player = new Player(this);
	this.platform = new Platform(this);
}
GameManager.prototype.loop = function () {
    var current = Date.now();
    var elapsed = current - this.previous;
    this.previous = current;
    this.lag += elapsed;
    var security = 0;
    while (this.lag >= this.options.updateMs && ++security < 10) {
        this.updateAll();
        this.lag -= this.options.updateMs;
    }
    this.renderAll();
    window.requestAnimationFrame(this.loop.bind(this));
};
GameManager.prototype.updateAll=function(){
	console.log('update');
};