class Square {
  scale: number;
  coords: { x: number; y: number };
  color: string;
  gridCoordinates: { column: column; row: row };
  squaresGrid: Grid;
  isPin: boolean;
  coordsWithTranslate: { x: number; y: number };
  constructor(
    scale: number,
    x: number,
    y: number,
    color: string,
    squaresGrid: Grid
  ) {
    this.scale = scale;

    this.coords = { x, y };
    this.color = color;

    this.squaresGrid = squaresGrid;
    this.coordsWithTranslate = {
      x: this.coords.x * this.scale + this.squaresGrid.translate.x,
      y: this.coords.y * this.scale + this.squaresGrid.translate.y,
    };
    this.isPin = false;

    this.gridCoordinates = this.translateToGridCoords();
  }

  translateToGridCoords() {
    const letters: Array<column> = [
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

    const column = letters[this.coords.x];
    const row = (this.coords.y + 1) as row;

    return { column, row };
  }

  show() {
    if (this.color === "blue") fill(0, 150, 200);
    else fill(60, 60, 60);
    rect(
      this.coords.x * this.scale,
      this.coords.y * this.scale,
      this.scale,
      this.scale
    );

    if (this.isPin) {
      push();
      fill(255, 0, 0);
      ellipseMode(CORNER);
      ellipse(
        this.coords.x * this.scale,
        this.coords.y * this.scale,
        this.scale
      );
      pop();
    }
  }

  hitbox(mX: number, mY: number) {
    return (
      mX > this.coords.x * this.scale &&
      mX < this.coords.x * this.scale + this.scale &&
      mY > this.coords.y * this.scale &&
      mY < this.coords.y * this.scale + this.scale
    );
  }

  pin() {
    if (this.squaresGrid.whichIsIt !== "mine" && this.isPin) return;

    this.isPin = true;

    // SEND TO SERVER:
    // this.gridCoordinates
  }

  clicked(mX: number, mY: number) {
    const hb = this.hitbox(mX, mY);

    if (hb) {
      this.pin();
    }
  }
}

class Grid {
  grid: Array<Array<Square>>;
  whichIsIt: "mine" | "opponent";
  translate: { x: number; y: number };
  constructor(whichIsIt: "mine" | "opponent") {
    this.grid = new Array(10);
    this.whichIsIt = whichIsIt;

    for (let i = 0; i < 10; i++) {
      this.grid[i] = new Array(10);
    }

    const scale = size / 20;

    let color: string;

    if (this.whichIsIt === "mine") {
      color = "blue";
      this.translate = { x: 0, y: height / 2 };
    } else {
      color = "grey";
      this.translate = { x: 0, y: 0 };
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        this.grid[x][y] = new Square(scale, x, y, color, this);
        console.log(x, y);
      }
    }
  }

  show() {
    push();

    // if (this.whichIsIt === "mine") translate(width / 4, height / 2);
    // else translate(width / 4, 0);

    translate(this.translate.x, this.translate.y);

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].show();
      }
    }
    pop();
  }
}
