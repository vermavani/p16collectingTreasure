var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword;

var pathImg,boyImg,cashImg,diamondsImg,
    jwelleryImg,swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordGroup;

var gameOver,EndImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  EndImage = loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(500,600);
  
  // Moving background
  path=createSprite(250,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  //create game over screen
  gameOver = createSprite(260,280,200,100)
  gameOver.addImage(EndImage)
  gameOver.visible = false;

  //create groups
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  
}

function draw() {
  //add background
  background(0);
  
  //make boy move with the mouse movements
  boy.x = World.mouseX;
  
  //creae edge sprites
  edges= createEdgeSprites();
  
  //make boy collide with edges
  boy.collide(edges);
  
  //game states
  if(gameState === PLAY){
    
  //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
  }
    //groups
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    // collect the treasure when boy touches it
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
       treasureCollection = treasureCollection + 200
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100
      
    }
    else{
        if(swordGroup.isTouching(boy)) {
          swordGroup.destroyEach();
          gameState = END;
        }
    }
        
 
   
}
  else if (gameState === END){
    
    gameOver.visible = true;
    boy.visible = false;
     
    path.velocityY = 0;
    
    //destroy the treasure when the game ends
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
    
    diamondsG.setVelocityYEach(0);
    diamondsG.destroyEach();
    
    jwelleryG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    
    swordGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    
  }
    
    drawSprites();
  
   //add text for score
    textSize(30);
    fill("yellow");
    text("Treasure: "+ treasureCollection,180,30);
  
}

//create function for cash obstacle
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

//create function for diamond obstacle
function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
 }
}

//create function for jwellery obstacle
function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

//create function for sword obstacle
function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
  
