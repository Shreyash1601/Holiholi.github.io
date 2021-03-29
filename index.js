alert("Kindly rotate your phone's screen to play");
const C = document.getElementById("center");
const R = document.getElementById("right");
const L = document.getElementById("left");
const btn = document.querySelector(".buttons");
const box = document.querySelector(".box");
const score = document.getElementById("score")
const mess = document.getElementById("Message");
const Balloon = {
    0: `url("GWB.png")`,
    1: `url("PWB.png")`,
    2: `url("BWB.png")`,
    3: `url("RWB.png")`,
    4: `url("GdWB.png")`,
    5: `url("YWB.png")`,
    6: `url("CWB.png")`,
}
let M = {
    1: "You are going Great",
    2: "Wow!!! Fabulous!!",
    3: "You have got magic in your moves!!",
    4: "Your swag is tremendously cool",
    5: "Haiitttt.... Gazab!!",
    6: "Kya Baat hai",
    7: "You are so swift dude!!",
    8: "Ohh Rang Barse.. Bheege chunar waali....",
    9: "Bachke rehna re Baba..",
    10: "Your charisma of playing is worth watching",
    11: "Those balloons can never get hold of you"
};
var GO = new Audio("GO.mp3");
var splash = new Audio("Splash.mp3");
splash.volume = 0.9;
var Music = new Audio("Music.mp3");
Music.volume = 0.05;
Music.loop = true;
var Score = 1;
var B = document.querySelector(".Ballon");
var BI = 1;
var i, h, bl = 0,
    k = 0;
var yB = 0;

var O = `<i class="fas fa-play" style="color:rgb(236, 227, 229)"></i>`;
var N = `<i class="fas fa-pause" style="color:rgb(236,227,229)"></i>`;
var Ch = document.querySelector(".Ch");
var PB = Number(B.style.left);
var PBT = Number(B.style.top);

var PCh = Number(Ch.style.left);

function balloons() {
    if(bl>=7)
    bl=0;
    B.style.backgroundImage = Balloon[`${bl}`];
    bl++;
}

function Message() {
    if(k>=11)
    k=0;
    k++;
    mess.innerText = M[`${k}`];
}

function BallonP() {
    B.style.left = ((Ch.offsetLeft + (Ch.offsetWidth / 2) - 12)).toString() + "px";
}

function Collision() {
    let b = document.getElementById("Ballon");
    let xChmin = Ch.offsetLeft;
    let xChmax = Ch.offsetLeft + Ch.offsetWidth;
    let yCh = Ch.offsetTop;
    yB = yB + b.offsetTop + B.clientHeight;
    let xB = B.offsetLeft + (B.offsetWidth / 2);
    if (yB > (yCh + 20)) {
        if (xB > xChmin && xB < xChmax) {
            clearInterval(i);
            clearInterval(h);
            Music.pause();
            GO.play();
            mess.innerText = "Bura na maano Holi hai yrr!! Better luck next time"
            box.style.backgroundImage = `url("GO.png")`;
            btn.style.display = "none";
            Ch.style.display = "none";
            B.style.display = "none";
        }
        score.innerText = `Score=${Score}`;
    }
    yB = 3;
}

function BallonFall() {
    if (PBT < 80) {
        PBT = PBT + BI;
        B.style.top = PBT.toString() + "vh";
    } else {
        B.style.top = "0vh";
        BallonP();
        balloons();
        PBT = 0;
        splash.play();
        Score++;
        if (BI <= 7)
            BI = BI + 0.25;
    }
    Collision();
}

function moveL() {
    if (PCh > 0) {
        PCh = Number(PCh) - 5;
        PCh = PCh.toString();
        Ch.style.left = PCh + "vw";
    }
}

function moveR() {
    if (PCh < 55) {
        PCh = Number(PCh) + 5;
        PCh = PCh.toString();
        Ch.style.left = PCh + "vw";
    }
}

function Control() {
    if (C.innerHTML != N) {
        C.innerHTML = N;
        Music.play();
        i = setInterval(BallonFall, 90);
        h = setInterval(Message, 5000);
        document.onkeydown = function(e) {
            if (e.keyCode == 37)
                moveL();
            else if (e.keyCode == 39)
                moveR();
        }
        R.addEventListener('click', moveR);
        L.addEventListener('click', moveL);
    } else {
        C.innerHTML = O;
        clearInterval(i);
        clearInterval(h);
        document.onkeydown = null;
        R.removeEventListener('click', moveR);
        L.removeEventListener('click', moveL);
        Music.pause();
        return
    }
}
C.addEventListener('click', Control);
document.onkeypress = function(e) {
    if (e.keyCode == 13) {
        Control();
    }
}