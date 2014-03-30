var gm=new GameManager();
document.getElementById('start').addEventListener('click', function(){gm.init()}, false);
document.addEventListener('keydown', function (e) {
   if(gm.options.keys.array.indexOf(e)){
       gm.keyDown(e);
       e.preventDefault();
   }
});