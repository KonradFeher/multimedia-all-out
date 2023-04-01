// CONSTANTS:
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = CANVAS_WIDTH * (480 / 720);

const blink_frequency_mean = 80;
const blink_length = [2, 6];

let devil_images = [];
let blink_frames = 0;
let blink_at;
let bottom_bar;
let lit_light;
let unlit_light;
let midlit_light;

let start_millis = 0;
let seconds_elapsed;
let minutes_elapsed;
let time_elapsed;
let moves_made = 0;


function prop(a) {
    return (a / 720) * CANVAS_WIDTH;
}

let font_bold;
let font_italic;
let font_regular;

function preload() {
    devil_images.push(loadImage('./static/frame0.png'));
    devil_images.push(loadImage('./static/frame1.png'));
    bottom_bar = loadImage('./static/bottom_bar.png');
    lit_light = loadImage('./static/lit_light.png');
    unlit_light = loadImage('./static/unlit_light.png');
    midlit_light = loadImage('./static/midlit_light.png');
}

let lights;

function setup() {

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(30);
    blink_at = floor(randomGaussian(blink_frequency_mean, 10));
    lights = new Lights(2);

}

function draw() {
    drawBase();
}

class Lights {
    constructor(level = 1, x = 5, y = 5) {
        this.x = x;
        this.y = y;

        this.lights = [];
        for (let i = 0; i < x; i++) {
            this.lights.push([]);
            for (let j = 0; j < y; j++) {
                this.lights[i].push(false);
            }
        }

        switch (level) {
            case 0:
                this.presses_needed = [
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false]
                ];
                break;
            case 1:
                this.presses_needed = [
                    [true, false, false, false, true],
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [false, false, false, false, false],
                    [true, false, false, false, true]
                ];

                break;
            case 2:
                this.presses_needed = [
                    [true, false, true, false, true],
                    [false, true, false, true, false],
                    [true, false, false, false, true],
                    [false, true, false, true, false],
                    [true, false, true, false, true]
                ];

                break;
        }

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (this.presses_needed[i][j])
                    this.press(i, j, true);
            }
        }
    }

    at(x, y) {
        return this.lights[x][y];
    }

    press(x, y, setup = false) {

        if (!setup) this.presses_needed[x][y] == !this.presses_needed[x][y];

        if (x >= 0 && x < this.x && y >= 0 && y < this.y) this.lights[x][y] = !this.lights[x][y];
        if (x + 1 >= 0 && x + 1 < this.x && y >= 0 && y < this.y) this.lights[x + 1][y] = !this.lights[x + 1][y];
        if (x - 1 >= 0 && x - 1 < this.x && y >= 0 && y < this.y) this.lights[x - 1][y] = !this.lights[x - 1][y];
        if (x >= 0 && x < this.x && y + 1 >= 0 && y + 1 < this.y) this.lights[x][y + 1] = !this.lights[x][y + 1];
        if (x >= 0 && x < this.x && y - 1 >= 0 && y - 1 < this.y) this.lights[x][y - 1] = !this.lights[x][y - 1];

    }


}

function drawBase() {

    (function drawBackground() {

        background("#002f66");

        push();
        noFill();
        stroke("#5187c1");
        strokeWeight(prop(3));
        rect(width * 0.037, 1, width * 0.92, height - 2);
        pop();

        // background
        push();
        fill("#a867a5");
        rect(width * 0.05, height * 0.07, width * 0.88, height * 0.8, 0, 0, 10, 10);

        fill("#343031");
        noStroke();

        beginShape();
        vertex(width * 0.05, height * 0.07);
        vertex(width * 0.05, height * 0.15);
        bezierVertex(width * 0.2, height * 0.9, width * 0.5, height * 0.45, width * 0.93, height * 0.07);
        endShape(CLOSE);

        fill("black");
        rect(width * 0.05, height * 0.07 - 10, width * 0.88, height * 0.04 - 10, 10, 10, 0, 0);
        beginShape();
        vertex(width * 0.05, height * 0.07);
        vertex(width * 0.05, height * 0.07);
        bezierVertex(width * 0.2, height * 0.9, width * 0.5, height * 0.25, width * 0.93, height * 0.07);
        endShape(CLOSE);
        pop();

        // floor
        push();
        fill('#512350AA');
        rect(width * 0.05, height * 0.74, width * 0.88, height * 0.13, 0, 0, 10, 10);
        pop();
    })();

    (function drawMenu() {

        // menu
        push();
        translate(width * 0.087, height * 0.1);
        push();
        stroke("#e3a10f");
        strokeWeight(3);
        fill("#FFF3");
        rect(0, 0, width * 0.35, height * .67, 15, 0, 15, 0);
        pop();

        //buttons
        push();
        translate(width * 0.01, height * 0.024);
        fill("#ffa700");
        stroke("#0004");
        rect(0, 0, width * .245, height * 0.08, 17);

        noStroke();
        fill("#a517a9");
        triangle(width * 0.03, height * 0.01, width * 0.03, height * 0.07, width * 0.017, height * 0.04);
        triangle(width * 0.043, height * 0.01, width * 0.043, height * 0.07, width * 0.030, height * 0.04);
        triangle(width * 0.08, height * 0.01, width * 0.08, height * 0.07, width * 0.055, height * 0.04);

        let d = width * .245;
        triangle(d - width * 0.03, height * 0.01, d - width * 0.03, height * 0.07, d - width * 0.017, height * 0.04);
        triangle(d - width * 0.043, height * 0.01, d - width * 0.043, height * 0.07, d - width * 0.030, height * 0.04);
        triangle(d - width * 0.08, height * 0.01, d - width * 0.08, height * 0.07, d - width * 0.055, height * 0.04);

        stroke("#0004");
        fill("#EEE");
        rect(width * 0.0925, height * 0.01, width * 0.06, height * 0.06, 10);

        // TODO: numbers with funky font

        textStyle(BOLD);
        textSize(16);
        stroke("#fff3");
        strokeWeight(2);
        fill("#cd39ca");
        rect(width * 0.0925, height * 0.12, width * 0.15, height * 0.06, 10);
        rect(width * 0.0925, height * 0.19, width * 0.15, height * 0.06, 10);
        rect(width * 0.0925, height * 0.26, width * 0.15, height * 0.06, 10);
        rect(width * 0.0925, height * 0.33, width * 0.15, height * 0.06, 10);
        translate(width * 0.012, height * 0.013);
        fill("#ffb82e");
        stroke("#5259");
        text("SOLVE", width * 0.118, height * 0.125, width * 0.15, height * 0.06);
        text("RESET", width * 0.118, height * 0.195, width * 0.15, height * 0.06, 10);
        text("RANDOM", width * 0.105, height * 0.265, width * 0.15, height * 0.06, 10);
        text("HELP", width * 0.124, height * 0.335, width * 0.15, height * 0.06, 10);

        textSize(17);
        text("time:", width * 0.0925, height * 0.39, width * 0.15, height * 0.06);
        text("moves:", width * 0.067, height * 0.43, width * 0.15, height * 0.06);

        textSize(19);
        fill("#eeb");
        minutes_elapsed = floor((millis() - start_millis) / 60000);
        seconds_elapsed = floor(((millis() - start_millis) / 1000) % 60);
        time_elapsed = `${minutes_elapsed}:${(seconds_elapsed <= 9 ? "0" : "") + seconds_elapsed} `;
        text(time_elapsed, width * 0.16, height * 0.39, width * 0.15, height * 0.06);
        text(moves_made, width * 0.16, height * 0.43, width * 0.15, height * 0.06);

        pop();

        pop();
    })();

    (function drawBoard() {
        // board
        push();
        fill("#492347");
        push();
        noStroke();
        translate(width * 0.02, height * 0.02);
        rect(width * 0.35, height * 0.075, width * .55, height * .73, 22);
        pop();
        fill("#c86cc4");
        stroke("#d689d2");
        strokeWeight(3);
        rect(width * 0.35, height * 0.075, width * .55, height * .73, 22);
        pop();
    })();


    (function drawDevil() {
        push();
        stroke("#570f54");
        fill("#82367b");
        rect(width * 0.039, height * 0.807, width * 0.27, height * 0.06, 0, 0, 0, 10);
        noStroke();
        fill("#570f54");
        ellipse(width * 0.173, height * 0.807, width * 0.27, height * 0.11);

        if (blink_frames) {
            image(devil_images[1], width * 0.05, height * 0.4, width * 0.24, height * 0.45);
            blink_frames -= 1;
        } else
            image(devil_images[0], width * 0.05, height * 0.4, width * 0.24, height * 0.45);
        if (frameCount == blink_at) {
            blink_frames = random(blink_length);
            blink_at += floor(randomGaussian(blink_frequency_mean, 20));
        }

        pop();
    })();


    (function drawTopBar() {
        push();
        noStroke();
        fill("#4c94c8");
        textFont('Kanit');
        textStyle(BOLD);
        text("developed by C649Q1 Student", width * 0.05, height * 0.02, width * 0.40, height * 0.04);

        push();
        strokeWeight(1);
        stroke("#002558");
        fill("#03356a");
        rect(width * 0.75, height * 0.012, width * 0.18, height * 0.03);
        pop();

        textSize(10);
        textStyle(NORMAL);
        text("copyright and legal", width * 0.78, height * 0.02, width * 0.40, height * 0.04);

        pop();
    })();

    // bottom bar
    image(bottom_bar, width * 0.05, height * 0.89, width * 0.88, height * 0.1);

    (function drawLights() {
        push();
        rectMode(CENTER);
        translate(width * 0.35, height * 0.075);

        stroke("#411a13");
        fill("yellow");

        let rad = prop(35);

        translate(width * .55 / 6, height * .73 / 6);
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                push();
                translate(i * width * .55 / 6, j * height * .73 / 6);
                push();
                noStroke();
                fill("#0003");
                translate(0.01 * width, 0.01 * height);
                circle(0, 0, rad);
                pop();


                push();
                noFill();
                stroke("#a12f92");
                strokeWeight(prop(2));
                circle(0, 0, prop(45));
                strokeWeight(prop(3));
                circle(0, 0, prop(52));
                (function drawHoverGlow() {
                    push();
                    let x = width * 0.35;
                    let y = height * 0.075;
                    x += width * .55 / 6;
                    y += height * .73 / 6;

                    fill("#FA31");
                    noStroke();
                    // for (let i = 0; i < 5; ++i) {
                    //     for (let j = 0; j < 5; ++j) {
                    let tx = x + i * width * .55 / 6;
                    let ty = y + j * height * .73 / 6;
                    if (dist(tx, ty, mouseX, mouseY) < prop(20))
                        for (let i = 0; i < 10; i++) {
                            circle(0, 0, prop(40 + i * 3));
                        }
                    //     }
                    // }
                    pop();
                })();


                // TEMP
                // if (!lights.at(i, j))
                //     fill("brown")
                // circle(0, 0, rad);
                let hovered = false;
                push();
                let x = width * 0.35;
                let y = height * 0.075;
                x += width * .55 / 6;
                y += height * .73 / 6;

                fill("#FA31");
                noStroke();
                let tx = x + i * width * .55 / 6;
                let ty = y + j * height * .73 / 6;
                if (dist(tx, ty, mouseX, mouseY) < prop(20)) {
                    hovered = true;
                    for (let i = 0; i < 10; i++) {
                        circle(0, 0, prop(40 + i * 3));

                    }
                }

                pop();
                if (hovered)
                    image(midlit_light, -rad / 2, -rad / 2, rad, rad);

                else if (!lights.at(i, j))
                    image(lit_light, -rad / 2, -rad / 2, rad, rad);

                else
                    image(unlit_light, -rad / 2, -rad / 2, rad, rad);

                pop();
                pop();
            }
        }
        pop();
    })();

}

function mouseClicked(e) {
    console.log("X: " + mouseX + " - Y: " + mouseY);
    
    // LEGAL
    if (prop(541) < mouseX && mouseX < prop(668)) {
        if (prop(5) < mouseY && mouseY < prop(17)) {
            window.open("https://onesquareminesweeper.com/", '_blank');
            return;
        }
    }
    if (dist(prop(120), prop(78), mouseX, mouseY) < prop(15)) {
        console.log("◀️");
        return;
    }
    if (dist(prop(195), prop(78), mouseX, mouseY) < prop(15)) {
        console.log("▶️");
        return;
    }
    if (dist(prop(90), prop(78), mouseX, mouseY) < prop(15)) {
        console.log("◀️◀️");
        return;
    }
    if (dist(prop(225), prop(78), mouseX, mouseY) < prop(15)) {
        console.log("▶️▶️");
        return;
    }
    // SOLVE
    if (prop(135) < mouseX && mouseX < prop(244)) {
        if (prop(116) < mouseY && mouseY < prop(144)) {
            console.log("SOLVE clicked");
            return;
        }
    }
    // RESET
    if (prop(135) < mouseX && mouseX < prop(244)) {
        if (prop(150) < mouseY && mouseY < prop(179)) {
            console.log("RESET clicked");
            return;
        }
    }
    // RANDOM
    if (prop(135) < mouseX && mouseX < prop(244)) {
        if (prop(183) < mouseY && mouseY < prop(211)) {
            console.log("RANDOM clicked");
            return;
        }
    }
    // HELP
    if (prop(135) < mouseX && mouseX < prop(244)) {
        if (prop(217) < mouseY && mouseY < prop(248)) {
            console.log("HELP clicked");
            return;
        }
    }



    // lights clicked?
    let x = width * 0.35;
    let y = height * 0.075;
    x += width * .55 / 6;
    y += height * .73 / 6;

    for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
            let tx = x + i * width * .55 / 6;
            let ty = y + j * height * .73 / 6;
            if (dist(tx, ty, mouseX, mouseY) < prop(20)) {
                lights.press(i, j);
                moves_made++;
                return;
            }
            // console.log("pushed: " + i + " - " + j);
        }
    }


}