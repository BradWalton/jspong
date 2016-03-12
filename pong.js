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

//Update function

var update = function() {
    Player.update();
    Computer.update(Ball);
    Ball.update(Player.paddle, Computer.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    if(this.x - 5 < 0) { // hitting the left wall
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 500) { // hitting the right wall
        this.x = 395;
        this.x_speed = -this.x_speed;
    }

    if(this.y < 0 || this.y > 650) { // a point was scored
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 300;
    }

    if(top_y > 300) {
        if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            // hit the player's paddle
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            // hit the computer's paddle
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2);
            this.y += this.y_speed;
        }
    }
};

Player.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 37) { // left arrow
            this.paddle.move(-4, 0);
        } else if (value == 39) { // right arrow
            this.paddle.move(4, 0);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 500) { // all the way to the right
        this.x = 500 - this.width;
        this.x_speed = 0;
    }
}

Computer.prototype.update = function(ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
        diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed right
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 500) {
        this.paddle.x = 500 - this.paddle.width;
    }
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

//Controls

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});
