var c = document.getElementById("ball");
var ctx = c.getContext("2d");

var radius = 10;
var x = c.width / 2;
var y = c.height - radius;
var dx = 2;
var dy = -2;

var paddlex = c.width / 2 - 30;
var paddley = c.height - 10;
var paddlew = 60;
var paddleh = 12;

var rightMove = false;
var leftMove = false;

var bricksRews = 3;
var bricksCols = 5;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 12;
var brickOffsetTop = 30;
var brickOffsetLeft = 100;

var score = 0;
var lives = 3;

var bricks = [];
for (var i = 0; i < bricksCols; i++) {
    bricks[i] = [];
    for (var j = 0; j < bricksRews; j++) {
        bricks[i][j] = { x: 0, y: 0, drawBrik: true };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 37) {
        leftMove = true;
    } else if (e.keyCode == 39) {
        rightMove = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 37) {
        leftMove = false;
    } else if (e.keyCode == 39) {
        rightMove = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - c.offsetLeft;
    if (relativeX > 0 && relativeX < c.width) {
        paddlex = relativeX - paddlew / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlex, paddley, paddlew, paddleh);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var i = 0; i < bricksCols; i++) {
        for (var j = 0; j < bricksRews; j++) {
            if (bricks[i][j].drawBrik) {
                var brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function detectHits() {
    for (var i = 0; i < bricksCols; i++) {
        for (var j = 0; j < bricksRews; j++) {
            var b = bricks[i][j];
            if (b.drawBrik) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.drawBrik = false;
                    score++;
                    if (score == bricksCols * bricksRews) {
                        alert("You Win, Congratulation!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, c.width - 65, 20);
}

function gameover() {
    document.getElementById("canvasGoOver").style.display = "block";
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Over", c.width / 2 - 30, c.height / 2);
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawPaddle();
    drawBall();
    drawBricks();
    detectHits();
    drawScore();
    drawLives();

    if (x + dx > c.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy < radius) {
        dy = -dy;
    } else if (y + dy > c.height - radius) {
        if (x > paddlex && x < paddlex + paddlew) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                gameover();
                return;
            } else {
                x = c.width / 2;
                y = c.height - radius;
                dx = 2;
                dy = -2;
                paddlex = c.width / 2 - 30;
            }
        }
    }

    if (leftMove && paddlex > 0) {
        paddlex -= 8;
    }
    if (rightMove && paddlex < c.width - paddlew) {
        paddlex += 8;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);
