var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket, rocketImg;
var bg, bgImg;
var star, starGroup, starImage;
var planet, planetGroup, planetImage;
var gameOver, gameOverImg;

var score = 0;

function preload(){
  rocketImg = loadImage("rocket.png");
  bgImg = loadImage("spaceBackground.png");
  starImage = loadImage("star.png");
  planetImage = loadImage("planet.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200,200);
  bg.addImage(bgImg);
  bg.velocityY = 5;

  rocket = createSprite(200,350,20,20);
  rocket.addImage(rocketImg);
  rocket.scale = 0.1;
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  starGroup = new Group();
  planetGroup = new Group();
  
  score = 0;
}

function draw() {
  
  if (gameState === PLAY){
    background(0);
    rocket.x = World.mouseX;
  
    edges = createEdgeSprites();
    rocket.collide(edges);
  
    if (bg.y > 400){
      bg.y = bg.height/2;
    }
    
    createPlanet();
    createStar();
    
    if(starGroup.isTouching(rocket)){
      starGroup.destroyEach();
      score = score + 1;
    }

    if(planetGroup.isTouching(rocket)){
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    bg.velocityY = 0;
    rocket.velocityY = 0;
    starGroup.destroyEach();
    planetGroup.destroyEach();
    starGroup.setVelocityYEach(0);
    planetGroup.setVelocityYEach(0);
    
    if(keyDown("SPACE")){
      reset();
    }
   }
  
 drawSprites();
 textSize(20);
 fill(255);
 text("Stars: "+ score, 20,20);
  
}

function createPlanet(){
  if (World.frameCount % 200 == 0) {
  var planet = createSprite(Math.round(random(50,350),40,10,10));
  planet.addImage(planetImage);
  planet.scale = 0.05;
  planet.velocityY = 5;
  planet.lifetime = 150;
  planetGroup.add(planet);
  }
}

function createStar(){
  if (World.frameCount % 200 == 0) {
  var star = createSprite(Math.round(random(50,350),40,10,10));
  star.addImage(starImage);
  star.scale = 0.05;
  star.velocityY = 5;
  star.lifetime = 150;
  starGroup.add(star);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  starGroup.destroyEach();
  planetGroup.destroyEach();
  score = 0;
}
