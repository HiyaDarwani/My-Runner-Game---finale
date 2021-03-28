var backGround,backGroundimg;
var ground;
var monkey, monkeyimg;
var stone, stoneimg, stonegroup;
var banana, bananagroup, bananaImage;
var score;
var gameState = "play";


function preload(){
  backGroundimg = loadImage("jungle.jpg");
  stoneimg = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  monkeyimg =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananagroup = new Group();
  stonegroup = new Group();
  score = 0;
}

function setup() {
  createCanvas(600, 600);
  
    backGround = createSprite(300, 300, 600, 600);
    backGround.addImage(backGroundimg);
  
    ground = createSprite(200, 550, 400, 10);
    ground.visible = false;
  
    monkey = createSprite(90, 490, 10, 10);
    monkey.addAnimation("MONKEY",monkeyimg);
    monkey.scale =0.2;
  
 
}

function draw() {
    background("white");
    drawSprites();
    

    if (gameState === "play"){
      stroke("black");
      textSize(20);
      fill("black");
      text("Score ="+score, 400, 50);

      camera.position.y = monkey.y
    //camera.position.x = monkey.x
    
    backGround.velocityX = -5;
    if (backGround.x < 150){
    backGround.x = 300;
      }
    ground.velocityX = -5;
    if (ground.x < 0){
    ground.x = ground.width /2;
     }
   if (keyDown("space") && monkey.y>250){
    monkey.velocityY = -12;
     }
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
  Food();
  spawnObstacles();
  if (monkey.isTouching(bananagroup)){
    bananagroup.destroyEach();
    score = score+1;
      }
  switch(score){
    case 5:monkey.scale = 0.3;
      break;
    case 10:monkey.scale = 0.4;
      break;
   case 20:monkey.scale = 0.5;
      break;
  }
  if (monkey.isTouching(stonegroup)){
      monkey.scale = 0.1;
      }
  
  if(score === 30){
      gameState = "end";
  }
} else if (gameState === "end"){
   background("black");
   textSize(30);
   stroke("white");
   fill("Green");
   text("GAMEOVER", 300, 300);
}

  
    }
   
  
    
function Food(){
  if (frameCount % 80 === 0){
    banana = createSprite(600, Math.round(random(100, 400)), 20, 20);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 120;
    bananagroup.add(banana);
  }
}
function spawnObstacles(){
  if (frameCount % 80 === 0){
    stone = createSprite(600, 520, 20, 20);
    stone.velocityX = -5;
    stone.addImage(stoneimg);
    stone.scale = 0.2;
    stone.lifetime = 120;
    stonegroup.add(stone);
    stone.debug= false;
    stone.setCollider("circle",0,0,30);
  }
}







