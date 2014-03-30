function CanvasDrawer(canvasId){
	var canvas=document.getElementById(canvasId);
	var ctx=canvas.getContext('2d');
	this.size=canvas;
	this.ctx=ctx;
    this.background={
        sprite:new Image(),
        pos:{
            x:0,
            y:0
        }
    };
    this.background.sprite.src='http://lorempizza.com/256/512';
}
CanvasDrawer.prototype.draw=function(obj){
	this.ctx.drawImage(obj.sprite, obj.pos.x, obj.pos.y);
};
