"use strict";
class Square {
    constructor(scale, x, y, color, squaresGrid) {
        // The size of the square
        this.scale = scale;
        // The "coordinates" in the array, basically the indices
        this.coords = { x, y };
        // The color of the square
        this.color = color;
        // The grid in which the square is in, so either myGrid, or the opponent's
        this.squaresGrid = squaresGrid;
        // When the grid is translated, x and y coords are altered
        this.coordsWithTranslate = {
            x: this.coords.x * this.scale + this.squaresGrid.translate.x,
            y: this.coords.y * this.scale + this.squaresGrid.translate.y,
        };
        // This isPin only affects the opponent's grid, the grey one.
        this.isPin = false;
        // This only affects the client's own grid, when the opponent triggers the event "pinning", found in the pin method
        this.isPinned = false;
        // The x and y coordinates are translated in this format { column: string, row: number }
        this.gridCoordinates = this.translateToGridCoords();
    }
    translateToGridCoords() {
        const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
        ];
        // Find the proper letter
        const column = letters[this.coords.x];
        // Adds one to the y coord
        const row = (this.coords.y + 1);
        return { column, row };
    }
    // All the UI things must be in this method
    show() {
        // Draws the square
        if (this.color === "blue")
            fill(0, 150, 200);
        else
            fill(60, 60, 60);
        rect(this.coords.x * this.scale, this.coords.y * this.scale, this.scale, this.scale);
        // Draws the red circle onto the opponent's grid
        if (this.isPin) {
            push();
            fill(255, 0, 0);
            ellipseMode(CORNER);
            ellipse(this.coords.x * this.scale, this.coords.y * this.scale, this.scale);
            pop();
        }
        // Draws the red circle on the client's own grid.
        if (this.isPinned) {
            push();
            fill(255, 0, 0);
            ellipseMode(CORNER);
            ellipse(this.coords.x * this.scale, this.coords.y * this.scale, this.scale);
            pop();
        }
    }
    // Hitbox of the square
    hitbox(mX, mY) {
        return (mX > this.coords.x * this.scale &&
            mX < this.coords.x * this.scale + this.scale &&
            mY > this.coords.y * this.scale &&
            mY < this.coords.y * this.scale + this.scale);
    }
    // If the square is already pinned, just return
    // Or if the square is not, change isPin to true, which will trigger the drawing of the red circle in show method
    pin() {
        if (!this.isPin) {
            this.isPin = true;
            // SEND TO SERVER:
            // this.gridCoordinates
            socket.emit("pinning", Object.assign({}, this.gridCoordinates));
        }
        else
            return;
    }
    // If the opponent pinned on his canvas, the client's own grid will have a red circle
    pinned() {
        if (!this.isPinned)
            this.isPinned = true;
        console.log("yes");
    }
    // See if the mouse is in the hitbox of the square, if so calls the pin method
    clicked(mX, mY) {
        const hb = this.hitbox(mX, mY);
        if (hb) {
            this.pin();
        }
    }
}
// Two types of grid: mine which is the blue one, where the client's ships will go
// And the opponent's grid where the client pins
class Grid {
    constructor(whichIsIt) {
        // Establishes an empty grid of ten slots
        this.grid = new Array(10);
        // See if the grid created has to be for the client or the opponent
        this.whichIsIt = whichIsIt;
        // Fills the grid with 10 new Arrays of ten slots each
        for (let i = 0; i < 10; i++) {
            this.grid[i] = new Array(10);
        }
        // The scale of the grid
        const scale = size / 20;
        // For the color of the grid
        let color;
        // If the grid is for the client, then the color is blue and it is translated at the bottom
        // Else, it means it is for the opponent, then it is grey and not translated, meaning top left
        if (this.whichIsIt === "mine") {
            color = "blue";
            this.translate = { x: 0, y: height / 2 };
        }
        else {
            color = "grey";
            this.translate = { x: 0, y: 0 };
        }
        // For each slot of the matrice, creates a new square with the proper informations
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.grid[x][y] = new Square(scale, x, y, color, this);
                console.log(x, y);
            }
        }
    }
    // Show method which displays on the canvas
    show() {
        push();
        // if (this.whichIsIt === "mine") translate(width / 4, height / 2);
        // else translate(width / 4, 0);
        translate(this.translate.x, this.translate.y);
        // Calls each square own show method
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].show();
            }
        }
        pop();
    }
}
