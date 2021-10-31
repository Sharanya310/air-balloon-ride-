var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial envar balloon, balloonImage1, balloonImage2;
var database, position;

function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(250, 450, 150, 600);
  balloon.addAnimation("hotAirBalloon", balloonImage2);
  balloon.scale = 0.5;

  textSize(20); 

  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value", readHeight, showError);
}
// function to display UI
function draw() {
  background(bg);

  
  if(keyIsDown(LEFT_ARROW)){
    balloon.x -=5;
  //write code to move air balloon in left direction
  }
  if(keyIsDown(RIGHT_ARROW)){
    balloon.x +=5;
    //write code to move air balloon in right direction
  }
  if(keyIsDown(UP_ARROW)){
    balloon.y +=10;
    //write code to move air balloon in up direction
    balloon.scale=balloon.scale -0.03;
  }
  if(keyIsDown(DOWN_ARROW)){
    balloon.y -=10;
    //write code to move air balloon in down direction
    balloon.scale=balloon.scale+0.03;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x, y) {
  database.ref("balloon/height").set({
    'x':height.x + x,
    'y':height.y + y
  })
}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError() {
  console.log("ERROR");
}

