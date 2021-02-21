"use strict";
class Ship {
    constructor(type) {
        // The type of the ship, simply refers to one of the following:
        //      Carrier     :  Size:     5
        //      Battleship  :            4
        //      Destroyer   :            3
        //      Submarine   :            3
        //      Patrol Boat :            2
        this.type = type;
        // Coordinates always refer to the "head" of the ship, the whole "body" is calculated depending on its orientation and its size.
        // These values are just there to initialize, they will be changed once the ship is positioned on the grid.
        this.gridCoordinates = { column: "-1", row: -1 };
        this.orientation = "VERTICAL";
        this.size = 0; // Min: 2; Max: 5
        // This value will be changed once the ship is set on the grid.
        this.isSet = false;
    }
    translateGridCoordinates() {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    }
    show() {
        const scale = size / 10;
        if (this.orientation === "VERTICAL") {
        }
    }
}
