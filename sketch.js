let stop = 0.5;     //pixels range for victory
                  //bigger number = victory is easier

let speed = 0.5;  //movement speed of the logo

let delay = 5;    //delay (in seconds) before logo moves

let flash = 5;    //how fast the victory screen flashes

let speedchange = 0.1; //how much the up/down arrow changes speed
/*
     'CONTROLS: \
............R - Reset to a random location \
............F - Fullscreen \
UP/DOWN ARROW - speed up/slow down logo \
..........ESC - Exit fullscreen \
............0 - Victory screen \
';
*/
let xspeed, yspeed, rm, x, y;
let win = false;
let is_cursor = true;
let begin = false;

let dvd, dvd2;
let dvds = [dvd, dvd2];

let r,g,b;

function preload()
{
  dvd = loadImage("nosigmund.png");
  dvd2 = loadImage("fullsigmund.png");
  dvd3 = loadImage("nosigmund.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  startLocation();
  //pickColor();
  startColor();
  //setTimeout(setSpeed,delay*1000);
  setSpeed();
  randomAngle();
  randomNegative();
}

function setSpeed()
{
  movespeed = speed;
  xspeed = movespeed;
  yspeed = movespeed;
}

function doubleClicked() {
  cursor(ARROW);
}

function keyPressed() {
  if (key === ESCAPE) {
    cursor(ARROW);
    resizeCanvas(1920, 1080);
  }
  
  if (key === 'f') 
  {
    resizeCanvas(displayWidth, displayHeight);
    let fs = fullscreen();
    fullscreen(!fs);
    noCursor();
    if (fs)
    {
      cursor(ARROW);
    }
  }

  if (key === 'r') 
  {
    win = false;
    randomNegative();
    startColor();
    startLocation();
    begin = false;
    frameRate(60);
  }
  if (keyCode === ESCAPE)
  { 
    cursor(ARROW);
  }
  
  if (key === 's') {
    begin = true;
    xspeed = movespeed;
    yspeed = movespeed;
  }
  
  if (key === '0')
  {
    begin = true;
    x = random([0, displayWidth - dvd.width]);
    y = random([0, displayHeight - dvd.height]);
  }
  if (key === '1') {
    if (dvd === dvd3) {
      x = x + ((dvd3.width - dvd2.width)/2);
      y = y + ((dvd3.height - dvd2.height)/2);
    }
    dvd = dvd2;
  }
  if (key === '2') {
    if (dvd === dvd2) {
      x = x + ((dvd2.width - dvd3.width)/2);
      y = y + ((dvd2.height - dvd3.height)/2);
    }
    dvd = dvd3;
  }
  if (keyCode === UP_ARROW) {
    if (xspeed > 0)
      xspeed += speedchange;
    else
      xspeed -= speedchange;
    if (yspeed > 0)
      yspeed += speedchange;
    else
      yspeed -= speedchange;
  }
  else if (keyCode === DOWN_ARROW) {
    if (xspeed > 0)
      xspeed -= speedchange;
    else
      xspeed += speedchange;
    if (yspeed > 0)
      yspeed -= speedchange;
    else
      yspeed += speedchange;
  }
}

function randomAngle()
{
  rm = random(0.4,0.9) * random([-1,1]);
}

function randomNegative()
{
  ranone = random([-1,1]);
}

function randomLocation()
{
  x = random(50,(displayWidth-(dvd.width))-50);
  y = random(50,(displayHeight-(dvd.height))-50);
  randomAngle();
  movespeed = speed;
  xspeed = movespeed;
  yspeed = movespeed;
}

function startColor() {
  r = 112;
  g = 177;
  b = 67;
}

function startLocation()
{
  x = displayWidth/2 - ((dvd.width)/2);
  y = displayHeight/2 - ((dvd.height)/2);
  randomAngle();
  movespeed = speed;
}
function winLocation()
{
  x = random(50,(width-dvd.width)-50);
  y = random(50,(height-dvd.height)-50);
}

function pickColor()
{
  r = random(50,200);
  g = random(201,255);
  b = random(50,200);
}

function winColor()
{
  r = random(50,180);
  g = random(50,180);
  b = random(50,180);
}

function draw() {
    background(15,22,14);
    image(dvd, x, y);
    tint(r,g,b);
  if (begin) {
    bouncingText();
  }
}


function bouncingText()
{ 
  x = x + rm*xspeed;//*ranone;
  y = y + (1/rm)*yspeed;
  
  if (x + dvd.width >= width)
    {
      xspeed = -xspeed;
      x = width - dvd.width;
      pickColor();
    }
  else if (x <= 0)
    {
      xspeed = -xspeed;
      x = 0;
      pickColor();
    }
  if (y + dvd.height >= height)
    {
      yspeed = -yspeed;
      y = height - dvd.height;
      pickColor();
    }
  else if (y <= 0)
    {
      yspeed = -yspeed;
      y = 0;
      pickColor();
    }
  if ((x <= stop && y <= stop) || 
      (x <= stop && y + dvd.height >= height -stop) ||
      (x + dvd.width >= width - stop && y <= stop) ||
      (x + dvd.width >= width - stop && y + dvd.height >= height - stop))
    {
      win = true;
    }
  if (win == true)
    {
      frameRate(flash);
      xspeed = 0;
      yspeed = 0;
      winColor();
    }
}
