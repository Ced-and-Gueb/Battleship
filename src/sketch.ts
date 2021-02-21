/// reference

const size = 650;
let myGrid: Grid;
let opponentGrid: Grid;

function setup() {
  createCanvas(size, size);
  myGrid = new Grid("mine");
  opponentGrid = new Grid("opponent");
}

function draw() {
  background(220);
  myGrid.show();
  opponentGrid.show();
}
