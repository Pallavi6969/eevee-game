var doraemon,doraemon_running;
var bg,bg_image,bg_sound;
var ground;
var jellyGroup,jellyImage;
var jellyScore=0;
var iceGroup,iceImage;
var obsGroup,obs1Image,obs2Image;
var gameState="PLAY";
function preload(){
    doraemon_running =  loadAnimation("Image/eevee (1).png","Image/eevee (2).png","Image/eevee (3).png","Image/eevee (4).png");
    bg_image= loadImage("Image/bg2.jpg");
    iceImage=loadImage("Image/brick.jpg");
    bg_sound=loadSound("sounds/y2mate.com - OST drama china Oh, My Emperor.mp3");
    jelly_Sound=loadSound("sounds/happy-eevee-noises.mp3");
    jellyImage=loadImage("Image/jelly.png");
    obs1Image = loadAnimation("Image/obs1(1).png","Image/obs1(2).png","Image/obs1(1).png","Image/obs1(2).png","Image/obs1(1).png","Image/obs1(2).png","Image/obs1(1).png","Image/obs1(2).png");
    obs2Image = loadAnimation("Image/obs2(1).png","Image/obs2(2).png","Image/obs2(1).png","Image/obs2(2).png","Image/obs2(1).png","Image/obs2(2).png","Image/obs2(1).png","Image/obs2(2).png");
    loseSound=loadSound("sounds/y2mate.com - Pokemon Lets Go Eevee  The many cries of Eevee.mp3");
    doraemon_collided=loadAnimation("Image/lose eevee.png")
}
function setup(){createCanvas(1000,600);
    bg=createSprite(500,250,1000,600);
    bg.addImage(bg_image,bg_sound);
    bg_sound.play();
    bg.scale=1.9;
    bg.velocityX=-5

    doraemon=createSprite(150,545,20,50);
    doraemon.addAnimation("running",doraemon_running);
    doraemon.scale=0.4;

    
    ground=createSprite(80,595,2000,10);
    ground.visible=false;

    iceGroup=new Group();
    jellyGroup=new Group();
    obsGroup=new Group();
    
}
function draw(){if (gameState==="PLAY"){
    
    if (bg.x < 100){
         bg.x=bg.width;}
    if(doraemon.x<200){
            doraemon.x=200}
    if(doraemon.y<50){
            doraemon.y=50;}
    
    if(keyDown("space") ) {
        doraemon.velocityY = -16;
        }
    doraemon.velocityY=doraemon.velocityY+0.5;
//icegenerating
    generateIce();
    for(var i=0; i<(iceGroup).length; i++){
        var temp = (iceGroup).get(i);
        if(temp.isTouching(doraemon))
        {doraemon.collide(temp);}
        }
//jelly generating
    generateJelly();
    for(var i=0;i<(jellyGroup).length;i++){
        var temp = (jellyGroup).get(i);
        if(temp.isTouching(doraemon)){
            jelly_Sound.play();
            jellyScore++;
            temp.destroy();
            temp=null;
        }   
    } 

//obs generating    
    generateObs();
    
// dieing when touching obstacle    
    if(obsGroup.isTouching(doraemon)){
        gameState==="END";
    }
}
 else if(gameState==="END"){
        bg.velocityX=0;
        doraemon.velocityY=0
        doraemon.velocityX=0
        obsGroup.setVelocityXEach(0);
        jellyGroup.setVelocityXEach(0);
        iceGroup.setVelocityXEach(0);
        obsGroup.setLifetimeEach(-1);
        jellyGroup.setLifetimeEach(-1);
        iceGroup.setLifetimeEach(-1);
        doraemon.changeAnimation(doraemon_collided);
        loseSound.play();
        bg_sound.pause();
        doraemon.scale=0.3
        doraemon.setCollider("rectangle",0,0,300,10)
        doraemon.y=600
    }
   
    doraemon.collide(ground)
    
    drawSprites();
    textSize(20);
    fill("yellow");
    text("Jelly Won:" + jellyScore,500,50);

}


function generateIce(){
    if(frameCount % 70===0){
        var ice = createSprite(900,120,40,10);
        ice.y = random(50,450);
        ice.addImage(iceImage);
        ice.scale = 0.2;
        ice.velocityX = -5;
        ice.lifetime = 250;
        iceGroup.add(ice);
    }
}


function generateJelly(){
    if(frameCount % 50===0){
        var jelly = createSprite(900,120,40,10);
        jelly.y = (random(90,250));
        jelly.addImage(jellyImage);
        jelly.scale = 0.06;
        jelly.velocityX = -6;
        jelly.lifetime = 250;
        jellyGroup.add(jelly);
    }
}

function generateObs(){
    if(frameCount % 100===0){
        var obs = createSprite(900,526,10,30);
        obs.velocityX =-6;
        obs.scale = 0.2;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1:
                obs.addAnimation("running",obs1Image);
                break;
            case 2:
                obs.addAnimation("running",obs2Image);
                break;
            default:
                break;
         }
        obs.lifetime = 280;
        obsGroup.add(obs);
    }
}
