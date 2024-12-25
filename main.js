//Global settings
var maxGenerations = 10;

var density = 155; // 0(full density) -> 255(nothing)
var treeMode = true;

//These get set in the setup or mousePressed function
var root;
var paintBorder;

var patternColors;
var colorChoose;


document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('site-title');
    const text = "Sam Rowe's Experiments";
    let index = 0;

    // Typewriter effect
    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Adjust speed if needed
        }
    }

    typeWriter();
});



function setup() {
    const sketchDiv = document.getElementById('dynamic-sketch');
    const canvas = createCanvas(sketchDiv.offsetWidth, 500); // Match container size
    canvas.parent('dynamic-sketch'); // Attach canvas to the correct container
    paintBorder = width * 0.05;
    background(0); // Black background

    angleMode(DEGREES);
    strokeCap(ROUND);
    noiseDetail(5, 0.2);

    noFill();

    patternColors = new Array();
    patternColors.push(color('#FFFFFF')); // White
    colorChoose = 0;
}

function windowResized() {
    const sketchDiv = document.getElementById('dynamic-sketch');
    resizeCanvas(sketchDiv.offsetWidth, 500); // Resize canvas dynamically
    background(0); // Adjust background on resize
}


function draw() {
	//draw the tree/pattern, if existing
	if (root != null) {
		root.growAndDraw();
	}
}


function mousePressed(event) {
    if (!root) {
        root = new Branch(
            createVector(width / 2, height), // Start at the center bottom
            270, // Initial rotation (upwards)
            random(15, 30), // Branch rotation
            random(100, 150), // Initial branch size
            0 // Start generation
        );
    }
}


function keyTyped() {
	//save a picture
	if (key === 's') {
		save('myCanvas.jpg');
	}
	//erase the drawing
	if (key === 'e') {
		background(250, 250, 230);
	}

	//tree drawing
	if (key === 't') {
		treeMode = true;
	}
	//pattern drawing
	if (key === 'p') {
		treeMode = false;
	}

	//Color choosing
	if (key === '1') {
		colorChoose = 0;
	}
	if (key === '2') {
		colorChoose = 1;
	}
	if (key === '3') {
		colorChoose = 2;
	}
}
