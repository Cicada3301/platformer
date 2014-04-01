function Physics(gM){
    this.gM=gM;
	this.objects=[];
	/*this.bounding= {
        left: new Obj(gM, false, -100, -10, 100, this.gM.drawer.size.height+20, 0, '/matei/games/platformer/grass.png'),
        top: new Obj(gM, false, -10, -100, this.gM.drawer.size.width+20, 100, 0, '/matei/games/platformer/grass.png'),
        right: new Obj(gM, false, this.gM.drawer.size.width, -10, 100, this.gM.drawer.size.height+20, 0, '/matei/games/platformer/grass.png'),
        bottom: new Obj(gM, false, -10, this.gM.drawer.size.height, this.gM.drawer.size.width+20, 100, 0, '/matei/games/platformer/grass.png')
    };
    this.bounding.left.type='bounding';
    this.bounding.right.type='bounding';
    this.bounding.top.type='bounding';
    this.bounding.bottom.type='bounding';*/
}
Physics.prototype.checkCollision=function(a, b) {
    var ax= a.pos.x;
    var aX= ax + a.size.width;
    var ay= a.pos.y;
    var aY= ay + a.size.height;
    var bx= b.pos.x;
    var bX= bx + b.size.width;
    var by= b.pos.y;
    var bY= by + b.size.height;
    return !(aX < bx || bX < ax ||
             aY < by || bY < ay)
};
Physics.prototype.checkBounding=function(obj){
    //if(this.checkCollision(obj, this.bounding.right)||this.checkCollision(obj, this.bounding.left)) return 'sides';
    //if(this.checkCollision(obj, this.bounding.bottom)) return 'bottom';
    if(obj.pos.x<0||obj.pos.x+obj.size.width>this.gM.drawer.size.width) return 'sides';
    if(obj.pos.y+obj.size.height>this.gM.drawer.size.height) return 'bottom';
    if(obj.pos.y<0) return 'top';
};