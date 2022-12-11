var gameboard = null;
var scoreboard = null;
var points = 0;
var startingPosition = 0;

var zombieSpeed = [40, 50, 60, 70, 80];

function startMoving(imgObj, speed) {
    var left = startingPosition;

    console.log(zombieSpeed[speed]);

    animation = setInterval(() => {
        left -= 5;
        imgObj.style.left = left + 'px';
        console.log("XD");

        if (left <= -300) {
            clearInterval(this.animation);
            imgObj.remove();
        }
    }, zombieSpeed[speed]);
}

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}


function shot(object) {
    scoreboard.innerHTML = addLeadingZeros(points + 12, 5);
    points += 12;
    object.remove();
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function spawnZoombie() {
    var zoombie = document.createElement("div");
    zoombie.className = "zombie";
    zoombie.style.left = startingPosition + "px";

    gameboard.appendChild(zoombie);

    zoombie.addEventListener("click", () => {
        shot(zoombie)
    });

    var speed = randomIntFromInterval(0, 4);
    zoombie.style.animation = "back " + 0.5 * (zombieSpeed[speed] / 80) + "s steps(10, end) infinite;"

    startMoving(zoombie, speed);
}

function startGame() {
    spawnZoombie();
    setTimeout(startGame, Math.random() * 6000);
}


function main() {
    gameboard = document.getElementById("game");
    scoreboard = document.getElementById("score");
    points = 0;
    startingPosition = window.innerWidth * 1.1;
    startGame();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
})