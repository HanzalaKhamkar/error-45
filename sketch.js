var dave, youngDave_img;
var background_img;
var invisibleGround;
var  obs2_img, obsGroup;
var balloon1_img,balloon2_img, balloon3_img, balloon4_img,  balloon5_img, balloonsGroup; 
var rand;

var gameState;

var score;

var restartButton;

function preload(){
  youngDave_img  = loadImage("images/youngDave.png");
  background_img = loadImage("images/sunnybg.jpg");

  obs2_img = loadImage("images/stone2.png");

  balloon1_img = loadImage("images/balloon1.png");
  balloon2_img = loadImage("images/balloon2.png");
  balloon3_img = loadImage("images/balloon3.png"); 
  balloon5_img = loadImage("images/balloon5.png");
}


function setup() {
  createCanvas(displayWidth-10,displayHeight-150);

  scene = createSprite(width/2, height/2, width, height);
  scene.addImage("scene",background_img);
  scene.scale = 5; 
  scene.velocityX = -5;
  
  
  dave = createSprite(400, 450, 50, 50);
  dave.addImage("dave",youngDave_img);
  dave.scale = 0.4;

  invisibleGround = createSprite(width/2, height - 40, width, 20);
  invisibleGround.visible = false; 

  balloonsGroup = new Group();
  obsGroup = new Group ();

  gameState = "play";

  score = 0;

}

function draw() {
  background("white");
  
  if(gameState == "play") {
    
    if(scene.x < 0) {
      scene.x = width/2;
    
    }
  
    dave.velocityY +=  0.5;
  
    spawnObstacles();

    spawnBalloons();

    // if(balloonsGroup.isTouching(dave)) {
    //   score += 5;
    // }

    // if(obsGroup.isTouching(dave)) {
    //   gameState = "end";
    // }

  
  }

  else if (gameState == "end") {

    scene.velocityX = 0;
    balloonsGroup.setVelocityXEach (0);
    obsGroup.setVelocityXEach (0);

    restartButton = createButton('Restart');
    restartButton.position(width/2, height/2);

  }

  dave.collide(invisibleGround);

  drawSprites();
  textSize(20);
  textAlign(CENTER);
  fill ("green");
  text ("Score : " + score, width - 200, 100);
}

function keyPressed() {
  if (keyCode === 32) {
   dave.velocityY = -12;
  } 
}

function spawnObstacles() {
  if(frameCount%100==0){
    var obstacle = createSprite( width-10, height-100, 10, 10);
    obstacle.velocityX = -10;
    obstacle.scale = 0.2;
    obstacle.addImage("obstacle",obs2_img);

    //obstacle.lifetime = Math.round(-width/-obstacle.velocityX);
    obsGroup.add(obstacle);

  }
 
}

function spawnBalloons() {
  if(frameCount%120 == 0) {
    var balloon = createSprite(width, height/2-250, 10, 10);

    balloon.velocityX = -10;
    balloon.y = random(height/2-250 , height/2 - 150);

    rand  = Math.round(random(1, 5));


    switch(rand) {
      case 1 : balloon.addImage("balloon",balloon1_img);
      break;

      case 2 : balloon.addImage("balloon",balloon2_img);
      break;

      case 3 : balloon.addImage("balloon",balloon3_img);
      break;

      case 4 : balloon.addImage("balloon",balloon4_img);
      break;

      case 5 : balloon.addImage("balloon",balloon5_img);
      break;

      default : break;

      
    }  
    
//  balloon.lifetime = Math.round(-width/-balloon.velocityY);
 // console.log(balloon.lifetime);
    balloonsGroup.add(balloon);
  }
}