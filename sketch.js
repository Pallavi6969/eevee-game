var doraemon,doraemon_running;
var bg,bg_image;
var ground;
function preload(){
    doraemon_running =  loadAnimation("Image/eevee (1).png","Image/eevee (2).png","Image/eevee (3).png","Image/eevee (4).png");
    bg_image= loadImage("Image/bg2.jpg");
}
function setup(){createCanvas(1000,600);
    bg=createSprite(500,250,1000,600);
    bg.addImage(bg_image);
    bg.scale=1.9;
    bg.velocityX=-6

    doraemon=createSprite(70,537,20,50);
    doraemon.addAnimation("running",doraemon_running);
    doraemon.scale=0.4;
    
    ground=createSprite(80,595,2000,10);
    ground.visible=true;
    
}
function draw(){
    drawSprites()
    if (bg.x < 100){
            bg.x=bg.width/4;}
    
    if(keyDown("space") ) {
        doraemon.velocityY = -16;
        }
    doraemon.velocityY=doraemon.velocityY+0.5;
    doraemon.collide(ground)
    doraemon.debug=true;
    debug.visible=false;

}
