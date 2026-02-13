const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Temporary “game is working” message
ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.fillText("Game engine loaded!", 20, 50);
