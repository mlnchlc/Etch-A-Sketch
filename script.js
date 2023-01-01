class Grid {
  node;
  brushMode = "black";
  size = 12;
  brushColor = "rgb(0, 0, 0)";

  constructor(node) {
    this.node = node;
  }

  getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${blue}, ${green})`;
  }

  shade(color) {
   //TODO
    return color;
  }
  
  colorCell(target) {
    if (this.brushMode === "rainbow")
      this.brushColor = this.getRandomColor();
    else if (this.brushMode === "black")
      this.brushColor = "black";
    else if (this.brushMode === "shade")
      this.brushColor = shade(this.brushColor);

    target.style.backgroundColor = this.brushColor;

  }

  draw() {
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }
    for (let i = 0; i < this.size; i++) {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("gridRow");
      for (let j = 0; j < this.size; j++) {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell")
        cellDiv.classList.add("border-bottom-right");
        if (i === 0)
          cellDiv.classList.add("border-top");
        if (j === 0)
          cellDiv.classList.add("border-left");
        cellDiv.addEventListener("mouseover", (e) => this.colorCell(e.target)
        rowDiv.appendChild(cellDiv);
      }
      this.node.appendChild(rowDiv);
    }
  }
}

let rangeInput = document.querySelector(".rangeInput");
let rangeValue = document.querySelector(".rangeValue");
let gridNode = document.querySelector(".grid");
let grid = new Grid(gridNode);
let rainbowInput = document.querySelector(".rainbow-brush");
rangeValue.innerHTML = +grid.size;
rangeInput.value = grid.size;

rangeInput.addEventListener("input", (e) => {
  grid.size = Number(e.target.value);
  rangeValue.innerText = rangeInput.value;
  grid.draw();
});

grid.draw();