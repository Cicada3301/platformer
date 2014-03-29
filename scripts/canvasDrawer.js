function CanvasDrawer(canvasId){
	var canvas=document.getElementById(canvasId);
	var ctx=canvas.getContext('2d');
	this.size=canvas;
	this.ctx=ctx;
}
CanvasDrawer.prototype.draw=function(obj){
	this.ctx.drawImage(obj.sprite, obj.pos.x, obj.pos.y);
}
