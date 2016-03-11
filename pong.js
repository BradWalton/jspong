/**
 * Created by Brad on 2016-03-10.
 */

var animate = window.requestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

//Using the createElement method to create the canvas for the pong game field.

var canvas = document.createElement('canvas');
var width = 500;
var height = 650;
canvas.width= width;
canvas.height= height;
var context= canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

//step will update and render objects and animate.

var step = function() {
    update();
    render();
    animate(step);
};

var update = function() {
};

// Creating paddles and ball, giving them dimension and set speeds.

function paddle (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width= width;
    this.height= height;
    this.x_speed= 0;
    this.y_speed= 0;
}

paddle.prototype.render = function (){
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Player(){
    this.paddle = new paddle (230, 625, 50, 10);
}

function Computer() {
    this.paddle = new paddle(225, 10, 50, 10);
}


function Ball (x,y){
    this.x= x;
    this.y= y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

//adding properties to the render function on each object.

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

Ball.prototype.render = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle= "#000000";
    context.fill();
};

var Player = new Player();
var Computer = new Computer();
var Ball = new Ball (250, 300);

//render function used fillstyle and fillrect methods to make the background.

var render = function(){
    context.fillStyle = "#FFBF00";
    context.fillRect(0, 0, width, height);
    Player.render();
    Computer.render();
    Ball.render();
}
