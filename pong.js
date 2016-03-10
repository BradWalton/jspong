/**
 * Created by Brad on 2016-03-10.
 */
var animate = window.requestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 600;
var hiegth = 800;
canvas.width= width;
canvas.hiegth= hiegth;
var context= canvas.getContext('2d');