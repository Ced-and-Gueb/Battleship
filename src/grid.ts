
class Square {
  constructor(scale, x, y, color) {
    this.scale = scale
    
    this.coords = {x, y}
    this.color = color;
    // this.translate()
  }
  
//   translate() {
//     const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    
//     this.coords.x = letters[this.column]
//     this.coords.y = this.row - 1
    
//     return {x: letters[this.column], y: this.row - 1}
//   }
  
  show() {
    if (this.color === "blue")
      fill(0, 150, 200)
    else fill(27, 27, 27)
    rect(this.coords.x * this.scale, this.coords.y* this.scale, this.scale)
    
  }
}

class Grid {
  constructor(whichIsIt) {
    
    this.grid = new Array(10)
    this.whichIsIt = whichIsIt
    
    for( let i = 0; i < 10; i++) {
      this.grid[i] = new Array(10)
    }
    
    const scale = size / 20
    
    let color;
    
    if (this.whichIsIt === "mine")
      color = "blue"
    
    for (let x = 0; x < 10; x++) {
      for(let y = 0; y < 10; y++) {
        this.grid[x][y] = new Square(scale, x, y, color)
        console.log(x, y)
      }
    }
  }
  
  show() {
    push()
    
    if (this.whichIsIt === "mine")
        translate(width / 4, height / 2)
    else
      translate(width / 4, 0)
      
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        
        this.grid[i][j].show()
      }
    }
    pop()
  }
  
  
}