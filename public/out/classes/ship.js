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
        this.position = initialPosition;
        // Coordinates always refer to the "head" of the ship, the whole "body" is calculated depending on its orientation and its size.
        // These values are just there to initialize, they will be changed once the ship is positioned on the grid.
        this.gridCoordinates = { column: "-1", row: -1 };
        this.orientation = "VERTICAL";
        this.size = 2; // Min: 2; Max: 5
        // This value will be changed once the ship is set on the grid.
        this.isSet = false;
        this.scale = size / (10 * 2);
    }
    translateGridCoordinates() {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    }
    show() {
        push();
        fill(255, 0, 0);
        if (this.orientation === "VERTICAL") {
            rect(this.position.x, this.position.y, this.scale, this.size * this.scale);
        }
        else
            rect(this.position.x, this.position.y, this.size * this.scale, this.scale);
        pop();
    }
    // Hitbox of the ship
    hitbox(mX, mY) {
        if (this.orientation === "VERTICAL") {
            return (mX > this.position.x &&
                mX < this.position.x + this.scale &&
                mY > this.position.y &&
                mY < this.position.y + this.size * this.scale);
        }
        else {
            return (mX > this.position.x &&
                mX < this.position.x + this.scale * this.size &&
                mY > this.position.y &&
                mY < this.position.y + this.scale);
        }
    }
    changeOrientation() {
        this.orientation =
            this.orientation === "HORIZONTAL" ? "VERTICAL" : "HORIZONTAL";
    }
    changePosition(mX, mY) {
        [this.position.x, this.position.y] = [mX, mY];
    }
    clicked(mX, mY) {
        const hb = this.hitbox(mX, mY);
        if (hb)
            shipClickedOn = this;
    }
    drag(mX, mY) {
        if (shipClickedOn === this) {
            this.changePosition(mX, mY);
        }
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
