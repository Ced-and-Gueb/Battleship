/// <reference path="../../node_modules/@types/p5/global.d.ts" />
/// <reference path="../../node_modules/@types/socket.io/index.d.ts" />

const size = 900;
let myGrid: Grid;
let opponentGrid: Grid;
let socket;

function setup() {
  createCanvas(size, size);
  myGrid = new Grid("mine");
  opponentGrid = new Grid("opponent");

  // For this to work you have to be on your browser on http://localhost:3000
  // There is an issue, that's just because TypeScript can't find the types, but that's ok it exists
  socket = io.connect("http://localhost:3000");
}

function draw() {
  background(220);
  myGrid.show();
  opponentGrid.show();
}

function mousePressed() {
  opponentGrid.grid.forEach((column) => {
    column.forEach((sq) => {
      sq.clicked(mouseX, mouseY);
    });
  });
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
