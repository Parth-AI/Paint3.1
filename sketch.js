var drawing = [];
var database;
var position;
var ref;
var data;
var point;
var draw1;

var clear;

var currentPath = [];

function setup()
{
    database = firebase.database();
    console.log(database);

    ref = database.ref('Points');
    ref.on('value',gotData,errData);

    var canvas = createCanvas(700,450);
    canvas.mousePressed(startPath);
   //canvas.mouseReleased(endPath);


   /*var drawingPosition = database.ref('drawing');
    drawingPosition.on("value",readPosition,showError);*/

    draw1 = drawing;

    clear = createButton('Clear Screen');
    clear.position(displayWidth/2-20,displayHeight/1.5);
}

function startPath(){
    currentPath = [];
    drawing.push(currentPath);
}

function draw()
{
    background(0);

    stroke(255);
    strokeWeight(8);
    noFill();
    for(var i = 0;i<drawing.length;i++){
        var path = drawing[i];
        beginShape();
        for(var j = 0;j<path.length;j++){
        vertex(path[j].x,path[j].y);
    }
    endShape();

    clear.mousePressed(function(){
        drawing = [];
    })
}
data = {
    point : drawing
}

ref.push(data);
}

function mouseDragged(){
    var point = {
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

function keyPressed(){
    if(keyCode === 32){
        drawing = [];
    }
}

function gotData(data){
  var drawings = data.val();
  var keys = Object.keys(drawings);
  for(var i = 0;i < keys.length;i++){
    var key = keys[i];
    console.log(keys)
  }
}

function errData(err){
  console.log(err);
}

