const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyPressed);
var ship = new Ship();
var enemies = [];
var shots = [];

var xv = 1;

for(var i = 0; i < 10; i++) {
    for(var j = 0; j < 4; j++) {
        enemies.push(new Enemy(i * 60 + 30, j * 40 + 20));
    }
}

function keyDownHandler(e) {
    if(e.keyCode === 37) {
        ship.left = true;
    } else if(e.keyCode === 39) {
        ship.right = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 37) {
        ship.left = false;
    } else if(e.keyCode === 39) {
        ship.right = false;
    }
}

function keyPressed(e) {
    if(e.code === "Space") {
        shoot();
    }
}
var time = 1;
function shoot() {
    if(time === 1) {
        shots.push(new Shot());
        time = 0;
        setTimeout(function() {
            time = 1;
        }, 250)
    }
}
function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ship.show();
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].show();
        // Lose
        if(enemies[i].y + enemies[i].r >= ship.y) {
            document.getElementById("win").innerHTML = "You Lose!"
            document.getElementById("win").style.display = "block"
        }
        // Wall collision
        if( enemies[enemies.length-1].x >= c.width ||
            enemies[0].x <= 0) {
            enemies[i].xv = -enemies[i].xv;
            enemies[i].y += 10;
        } 
    }
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].x += enemies[i].xv;
        // Bullet detection 
        for(var j = 0; j < shots.length; j++) {
            if(i < enemies.length && enemies[i].touching(shots[j].x, shots[j].y)) {
                enemies.splice(i, 1);
                shots.splice(j, 1);
            }
        }
    }
    for(var i = 0; i < shots.length; i++) {
        shots[i].show();
        shots[i].y -= 5;
    }
    if(ship.left) {
        ship.x -= 3;
    } else if(ship.right) {
        ship.x += 3;
    }
    if(enemies.length === 0) {
        document.getElementById("win").style.display = "block";
    }
    requestAnimationFrame(draw);
}
draw();