const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
var dustbinObj,groundObject;
var rightBorder, leftBorder;
var world;
var paper;
var dustbinSprite;
var dustbinImage;

var mCon;


var showText;

function preload()
{
	dustbinImage = loadImage('dustbingreen.png');
}

function setup() {
	var canvas = createCanvas(1600, 700);
	rectMode(CENTER);


	engine = Engine.create();
	world = engine.world;
	
	groundObject = new ground(width/2,1670,width*4,2000);
	dustbinObj = new dustbin(1200,650);

	rightBorder = new ground(width*2, height/2, width*2.2, height*10);
	leftBorder = new ground(-width, height/2, width*2.05, height*10);

	dustbinSprite = createSprite(1200, 600, 100, 50);
	dustbinSprite.visible = false;

	paper = new CrumpledPaper(200, 100);

	var canvasMouse = Mouse.create(canvas.elt);
	canvasMouse.pixelRatio = pixelDensity();

	var mCOpt = 
	{
		mouse: canvasMouse
	}

	mCon = MouseConstraint.create(engine, mCOpt);

	World.add(world, mCon);

	Engine.run(engine);

	showText = false;
}


function draw() {
  rectMode(CENTER);
  background(230);

  if (keyWentDown('r'))
  {
	  Matter.Body.setVelocity(paper.body, {x:0, y:-5});
	  Matter.Body.setPosition(paper.body, {x:200, y:300});
	  World.add(world, mCon);
	  showText = false;
  }
 

  groundObject.display();
  rightBorder.display();
  leftBorder.display();
  paper.updateSprite();

  

  textAlign(CENTER);
  textSize(30);
  text("Drag the paper around.", width/2, height/4 + 100);
  textSize(20);
  text("You can drag it anywhere to the left of the line, then throw it into the bin.", width/2, height/2);
  if (paper.sprite.x > width/2)
  {
	  Matter.World.remove(world, mCon);
	  showText = true;
  }
  if (showText)
  {
	textSize(40);
	text(paper.sprite.isTouching(dustbinSprite)?"You got the paper in the bin! (r to reset)":"Click r to reset the paper's position.", width/2, height/4);
  }
  rect(width/2, 0, 1, height*2);
  imageMode(CENTER);
  image(dustbinImage, 1200, 543.5, 240, 260);
  drawSprites();
}
