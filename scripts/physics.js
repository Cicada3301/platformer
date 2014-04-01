function Physics(gM){
    this.gM=gM;
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
    if(obj.pos.y+obj.size.height>this.gM.drawer.size.height) return 'bottom';
    if(obj.pos.x<0||obj.pos.x+obj.size.width>this.gM.drawer.size.width) return 'sides';
    if(obj.pos.y<0) return 'top';
};