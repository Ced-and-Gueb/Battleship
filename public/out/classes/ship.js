"use strict";
class Ship {
    constructor(type, initialPosition) {
        // The type of the ship, simply refers to one of the following:
        //      Carrier     :  Size:     5
        //      Battleship  :            4
        //      Destroyer   :            3
        //      Submarine   :            3
        //      Patrol Boat :            2
        this.type = type;
        this.initialPosition = initialPosition;
        // Coordinates always refer to the "head" of the ship, the whole "body" is calculated depending on its orientation and its size.
        // These values are just there to initialize, they will be changed once the ship is positioned on the grid.
        this.gridCoordinates = { column: "-1", row: -1 };
        this.orientation = "VERTICAL";
        this.size = 2; // Min: 2; Max: 5
        // This value will be changed once the ship is set on the grid.
        this.isSet = false;
    }
    translateGridCoordinates() {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    }
    show() {
        const scale = size / (10 * 2);
        push();
        fill(255, 0, 0);
        if (this.orientation === "VERTICAL") {
            rect(this.initialPosition.x, this.initialPosition.y, scale, this.size * scale);
        }
        else
            rect(this.initialPosition.x, this.initialPosition.y, this.size * scale, scale);
        pop();
    }
}
class Carrier extends Ship {
    constructor() {
        super("carrier", { x: 500, y: 500 });
        this.type = "carrier";
        this.size = 5;
    }
}
class Battleship extends Ship {
    constructor() {
        super("battleship", { x: 500, y: 300 });
        this.type = "battleship";
        this.size = 4;
    }
}
class Destroyer extends Ship {
    constructor() {
        super("destroyer", { x: 600, y: 500 });
        this.type = "destroyer";
        this.size = 3;
    }
}
class Submarine extends Ship {
    constructor() {
        super("submarine", { x: 600, y: 300 });
        this.type = "submarine";
        this.size = 3;
    }
}
class PatrolBoat extends Ship {
    constructor() {
        super("patrolBoat", { x: 700, y: 500 });
        this.type = "patrolBoat";
        this.size = 2;
    }
}
