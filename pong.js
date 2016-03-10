/**
 * Created by Brad on 2016-03-10.
 */

var animate = window.requestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

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

var step = function() {
    update();
    render();
    animate(step);
};

var update = function() {
};

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

function player(){
    this.paddle = new paddle(175, 580, 50, 10);
}

function computer() {
    this.paddle = new paddle(175, 10, 50, 10);
}

player.prototype.render = function(){
    this.player.render();
};

computer.prototype.render = function(){
    this.player.render();
};

function ball (x,y){
    this.x= x;
    this.y= y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

ball.prototype.render = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle= "#000000";
    context.fill();
};

var player = new player();
var computer = new computer();
var ball = new ball (200, 300);

var render = function(){
    context.fillStyle = "#FFBF00";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
}
