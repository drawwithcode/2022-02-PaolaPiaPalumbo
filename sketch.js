let circles = [];

//create two different color palettes
let palette1 = ["#ffc842", "#fff541", "#b1f76f", "#6bfcb8", "#6fc5da", "#728dfb", "#b86bfc"];
let palette2 = ["#efc100", "#f2821b", "#f44336", "#b71c1c", "#173776", "#0c285f", "#001848"];
//set global variable for the color of the ellipses
let col;

//set the starting situation
let colorStart = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	//it's necessary to put the bg in setup to create the overlapping effect
	background ("black");

	//distance from the top left corner
	const dist = 20;
	//distance between each ellipses
	const inc = 30;

	//create the grid of ellipses
	for (let x = dist; x < windowWidth; x += inc){
		for (let y = dist; y < windowHeight-45; y += inc){
			circles.push(new Circle(x, y));
		}
	}
}	

function draw() {	
	for (let i = 0; i < circles.length; i++) {
		circles[i].show();
	}

	//rect under the text
	push();
	fill("black");
	rect(0, windowHeight-45, windowWidth, 45);
	pop();

	//text instruction
	push();
	fill("white");
	textSize(16);
	textAlign(CENTER);
	textFont("Inter");
	text("CLICK TO CHANGE COLORS, PRESS S TO SAVE THE PATTERN AND R TO RESTART", width/2 , height-22);
	pop();
}

function Circle(x, y) {
	this.x = x;
	this.y = y;
	this.show = function() {

	//when mouse gets closer increase diameter and change color from palette 1
	let d = dist(mouseX, mouseY, x, y,);
	if (d < 150 && colorStart === true){
		diam = map(d, 0, 200, 25, 6);
		col = random(palette1);
	}

	//palette2
	else if (d < 150 && colorStart === false){
		diam = map(d, 0, 200, 25, 6);
		col = random(palette2);
	}

	//normal state
	else {
		diam = 6;
		col = color("white");
	}

	fill(color(col));
    noStroke();
    ellipse(this.x, this.y, diam);
 	}
}

function mouseClicked() {
	//change color palette on mouse click
	if (colorStart === true) {
	  colorStart = false;
	  console.log("palette1");
    }
	else {
	  colorStart = true;
	  console.log("palette2");
	}
}

function keyTyped(){
	//save the pattern when "s" is typed
	if (key === "s" || key === "S") {
		save("Texture.png");
	}

	//start again from the setup function when "r" is typed
	if (key === "r" || key === "R") {
		setup();
	}
}

function windowResized(){
	//adjust the canvas when the window size changes
	resizeCanvas (windowWidth, windowHeight);
}