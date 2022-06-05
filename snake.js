'use strict'

const CANVAS_SIZE = 700;
const PIXEL_SIZE = 20;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Apple{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Segment{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Snake{
    direction = "N";
    length = 1
    segments = [];
    constructor(){
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function spawnApple(){
    var x = getRndInteger(0, CANVAS_SIZE/PIXEL_SIZE);
    var y = getRndInteger(0, CANVAS_SIZE/PIXEL_SIZE);
    var apple = new Apple((x*PIXEL_SIZE),(y*PIXEL_SIZE));
    return apple;
}
function drawApple(ctx, apple){
    ctx.fillStyle = "Red";
    ctx.fillRect(apple.x, apple.y, PIXEL_SIZE, PIXEL_SIZE);
}

function checkAppleCollision(apple, snake){
    if (apple.x == snake.segments[0].x && apple.y == snake.segments[0].y){
        snake.segments.push(snake.segments[snake.length]);
        snake.length += 1;
        return true;
    }
    return false;
}

function addSegment(segment,snake){
    snake.segments.unshift(segment);
    snake.segments.pop();
}

function drawCanvas(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawSnake(ctx,snake){
    for (let i = 0; i < snake.segments.length; i++) {
        drawSegment(ctx,snake.segments[i]);
    }
}

function drawSegment(ctx, segment){
    ctx.fillStyle = "White";
    ctx.fillRect(segment.x, segment.y, PIXEL_SIZE, PIXEL_SIZE);

}

function moveSnake(e){

    switch (e.key){
        case "ArrowDown":
            if (snake.direction != "N")
            snake.direction = "S";
            break;
        case "ArrowUp":
            if (snake.direction != "S")
            snake.direction = "N";
            break;
        case "ArrowLeft":
            if (snake.direction != "E")
            snake.direction = "W";
            break;
        case "ArrowRight":
            if (snake.direction != "W")
            snake.direction = "E";
            break;
    }
    console.log(snake.direction);
}
function checkOverflow(value){
    if (value > CANVAS_SIZE-PIXEL_SIZE){
        return 0;
    } 
    if (value < 0){
        return CANVAS_SIZE-PIXEL_SIZE;
    } 
    return value;
}

function applyMovement(snake){

    switch (snake.direction){
        case "N":
            var segment = new Segment(snake.segments[0].x, checkOverflow(snake.segments[0].y - PIXEL_SIZE));
            addSegment(segment,snake);

            break;
        case "S":
            var segment = new Segment(snake.segments[0].x, checkOverflow(snake.segments[0].y + PIXEL_SIZE));
            addSegment(segment,snake);
            break;
        case "E":
            var segment = new Segment(checkOverflow(snake.segments[0].x + PIXEL_SIZE), snake.segments[0].y);
            addSegment(segment,snake);
            break;
        case "W":
            var segment = new Segment(checkOverflow(snake.segments[0].x - PIXEL_SIZE), snake.segments[0].y);
            addSegment(segment,snake);
            break;
    }
}

var segment = new Segment(0,0)
var snake = new Snake();
var apple = spawnApple(ctx);

snake.segments.unshift(segment);

document.addEventListener('keydown', moveSnake);
window.setInterval(function(){
    drawCanvas(ctx);
    applyMovement(snake);
    drawSnake(ctx, snake);

    if (checkAppleCollision(apple,snake)){
        apple = spawnApple();
    }

    drawApple(ctx, apple);
    console.log(snake.segments);
    
}, 50);
