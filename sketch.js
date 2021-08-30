 const Engine=Matter.Engine;
 const World=Matter.World;
 const Bodies=Matter.Bodies;
 const Constraint = Matter.Constraint;

 var  engine,world;
 var child1,childImg,swingImg,santaImg,santaImg2,manImg1,manImg2,bg,bg1,giftImg;
 var snow,snowman,swing,bg2,bg3,endImg,santa,gift;
 var second,minute,sound,winter;
 var ice=[];

 function  preload()
{
  backgroundImg();
  bg1=loadImage("snow1.jpg");
  bg2=loadImage("snow2.jpg");
  bg3=loadImage("snow3.jpg");

  childImg=loadAnimation("child2.png","child3.png","child4.png","child5.png","child6.png");
  manImg1=loadAnimation("snowman1.png","snowman2.png","snowman3.png","snowman4.png");
  manImg2=loadAnimation("snowman 5.png")
  santaImg=loadAnimation("santa.png") ;
  santaImg2=loadAnimation("santa2.png")

  giftImg=loadImage("gift1.png");
  swingImg=loadImage("swing.png");
  endImg=loadImage("end.JPG");

  sound=loadSound("bgSound.mp3");
 //Winter=loadSound("winter.mp3");
}

 function setup() 
{
  sound.play(true);
  var canvas=createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;
  snowfall1=new Snowfall(50,100,100,100);
  sprites();
}

 function draw() 
{


  Engine.update(engine);
  if(frameCount%5===0)
 {
    ice.push(new Snowfall(random(10,780),10,100,100))
 }
    if(bg)
  {
     sound.playSound()
    background(bg);
  }
   else if(frameCount>=1&&frameCount<=150) 
  { 

    background(bg1)
    push();
    strokeWeight(4)
    stroke("brown");
    fill("brown")
    line(240,115,240,233);
    line(160,140,160,233);
    pop();
  }
   else if (frameCount>=150&&frameCount<=250)
  {
    background(bg3)
    snowman.x=400;
    snowman.y=230  
   
    swing.visible = false;
    gift.visible = false;
  }
  else if(frameCount>=250&&frameCount<=350)
  {
    background(bg2)

    
    snowman.x=680;
    snowman.y=300
  
    snowman.changeAnimation("man still",manImg1)
    santa.visible= true;
    santa.velocityX=-5;
    child.velocityX=2.5
    
    swing.visible = false;
   
    gift.visible = false;
    
  }
  else
  {sound.stop();

    ice.pop();
    background(endImg);
    santa.destroy();
    swing.destroy();
     gift.destroy();
    child.destroy();
    snowman.destroy();
    
  }

 
  

  for (var i = 0; i < ice.length; i++) 
 {
    ice[i].display();   
 }

  drawSprites();

  push();
  textSize(32);
  stroke("red")
  fill("red")
  // text(mouseX+","+mouseY,mouseX,mouseY)
  text(frameCount,mouseX,mouseY)
   pop()
}
 async  function backgroundImg()
{
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Bishkek");
  var responseJSON=await response.json();

  var dateTime=responseJSON.datetime;
  second=dateTime.slice(17,19);
  minute =dateTime.slice(13,16)
  var hour=dateTime.slice(11,13);

  text("time="+hour+":"+minute+":"+second,100,100);

  if(second<=01 && second>=30)
 {
   snow="snow1.jpg"

   push();
   strokeWeight(4)
   stroke("brown");
   fill("brown")
   line(240,115,240,233);
   line(160,140,160,233);
   pop();
 }
  else if(second>=30 &&minute==01)
 {
   snow="snow2.jpg"
   snowman.x=680;
   snowman.y=300
 
   snowman.changeAnimation("man still",manImg1)
  
   santa.velocityX=-5;
   child.velocityX=2.5

   santa.visible= true;
   swing.visible = false;  
   gift.visible = false;
 }
  else if(minute==01&& second>=30)
 {
   snow="snow3.jpg"
     
   snowman.x=400;
   snowman.y=230  
   
   swing.visible = false;
   gift.visible = false;
   
 } else
 {
   sound.stop();
   ice.pop();
   snow="end.JPG"
   santa.destroy();
   swing.destroy();
   gift.destroy();
   child.destroy();
   snowman.destroy();
   
 }
  bg=loadImage(snow);

  console.log(minute,second);
 
}
 function sprites()
{
  child=createSprite(10, 300, 50, 50);
  child.addAnimation("child",childImg);
  child.scale=1.5;
  child.velocityX=1.5;
 
  snowman=createSprite(400,200,50,50)
  snowman.addAnimation("man",manImg1);
  snowman.addAnimation("man still",manImg2);
  snowman.velocityY=0.3
  snowman.scale=0.8
  snowman.depth = child.depth;
  child.depth = child.depth + 1;
 
 // console.log(snowfall1)
  swing=createSprite(200,180);
  swing.addImage(swingImg);
  swing.scale=0.5
  swing.depth = child.depth;
  child.depth = child.depth + 1;

  santa=createSprite(600,100);
 // santa.addAnimation("santa1",santaImg2);
  santa.addAnimation("santa2",santaImg);
  santa.visible=false;
  
  santa.scale=0.6
 
  gift=createSprite(600,250);
  gift.addImage(giftImg);
  gift.scale=0.5
}