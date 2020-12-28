var doraemon,doraemon_running;
var bg,bg_image;
var ground;
var iceGroup,iceImage;
function preload(){
    doraemon_running =  loadAnimation("Image/eevee (1).png","Image/eevee (2).png","Image/eevee (3).png","Image/eevee (4).png");
    bg_image= loadImage("Image/bg2.jpg");
    iceImage=loadImage("Image/brick.jpg");
}
function setup(){createCanvas(1000,600);
    bg=createSprite(500,250,1000,600);
    bg.addImage(bg_image);
    bg.scale=1.9;
    bg.velocityX=-6

    doraemon=createSprite(150,537,20,50);
    doraemon.addAnimation("running",doraemon_running);
    doraemon.scale=0.4;
    
    ground=createSprite(80,595,2000,10);
    ground.visible=false;

    iceGroup=newGroup();
    
}
function draw(){
    
     if (bg.x < 100){
         bg.x=bg.width;}
    
    if(keyDown("space") ) {
        doraemon.velocityY = -16;
        }
    doraemon.velocityY=doraemon.velocityY+0.5;

    generateIce();
    for(var i=0; i<(iceGroup).lenght; i++){
        var temp = (iceGroup).get(i);
        if(temp.isTouching(doraemon))
        {doraemon.collide(temp);}
        if(doraemon.x<200){
        doraemon.x=200}
        if(doraemon.y<50){
        doraemon.y=50;}}

    doraemon.collide(ground)
    drawSprites()

}
function generateIce(){
    if(frameCount % 70===0){
        var ice = createSprite(900,120,40,10);
        ice.y = random(50,450);
        ice.addImage(iceImage);
        ice.scale = 0.5;
        ice.velocityX = -6;
        ice.lifetime = 250;
        iceGroup.add(ice);
    }
}
