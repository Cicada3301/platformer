function Physics(directions){
	this.objects=[];
	this.bounding={
		x:{
			top:directions.top||0,
			bottom:directions.bottom||gameManager.drawer.general.height
		},
		y:{
			left:directions.left||0,
			right:directions.right||gameManager.drawer.general.width
		}
	};
}
Physics.prototype.applyGravity=function(object){
	object.pos.y+=object.weight;
};
Physics.prototype.checkGravity=function(object,ind,ar){
	var isInAir=true
	ar.forEach(function(toCollide){
		if(!(toCollide===object)){
			if(this.checkCollision(object, toCollide)){
				isInAir=false;
				return
			}
		}
	});
	if(isInAir) this.applyGravity(object);
};
Physics.prototype.checkCollision=function(a, b){
	return !(a.x+a.width<b.x|| a.x>b.x+b.width|| a.y+a.height<b.y|| a.y>b.y+b.height)
};