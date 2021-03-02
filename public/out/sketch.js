"use strict";
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
/// <reference path="../../node_modules/@types/socket.io/index.d.ts" />
const size = 900;
let myGrid;
let opponentGrid;
let socket;
let carrier;
let battleship;
let destroyer;
let submarine;
let patrolBoat;
let shipClickedOn = null;
let ships = [];
function setup() {
    createCanvas(size, size);
    myGrid = new Grid("mine");
    opponentGrid = new Grid("opponent");
    // For this to work you have to be on your browser on http://localhost:3000
    // There is an issue, that's just because TypeScript can't find the types, but that's ok it exists
    socket = io.connect("http://localhost:3000");
    carrier = new Carrier();
    battleship = new Battleship();
    destroyer = new Destroyer();
    submarine = new Submarine();
    patrolBoat = new PatrolBoat();
    ships.push(carrier);
    ships.push(battleship);
    ships.push(destroyer);
    ships.push(submarine);
    ships.push(patrolBoat);
    // I think all the events received from the server should go in setup.
    socket.on("pinned", (pinnedCoords) => {
        // Listen for the event "pinned", triggered when the opponent cicks on a square to pin.
        // Looking for the corresponding square on the client's own grid. (Where the ships are)
        for (let column of myGrid.grid) {
            let found = column.find((sq) => sq.gridCoordinates.column === pinnedCoords.column &&
                sq.gridCoordinates.row === pinnedCoords.row);
            if (found) {
                // When found, stops the loop, and calls the function pinned
                found.pinned();
                break;
            }
        }
    });
}
function draw() {
    background(220);
    myGrid.show();
    opponentGrid.show();
    for (let ship of ships)
        ship.show();
}
function mousePressed() {
    opponentGrid.grid.forEach((column) => {
        column.forEach((sq) => {
            sq.clicked(mouseX, mouseY);
        });
    });
    for (let ship of ships) {
        ship.clicked(mouseX, mouseY);
    }
}
function mouseDragged() {
    for (let ship of ships)
        ship.drag(mouseX, mouseY);
}
function mouseReleased() {
    if (shipClickedOn !== null)
        shipClickedOn = null;
}
function mouseWheel(event) {
    if (shipClickedOn !== null)
        shipClickedOn.changeOrientation();
}
function keyPressed() {
    switch (keyCode) {
        case 79:
            if (shipClickedOn !== null)
                shipClickedOn.changeOrientation();
            break;
        default:
            return;
    }
}
