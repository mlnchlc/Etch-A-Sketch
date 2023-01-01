class Grid {
  node;
  brushMode = "black";
  size = 12;
  brushColor = "rgb(0, 0, 0)";

  constructor(node) {
    this.node = node;
  }

  setBrushMode(mode) { this.brushMode = mode; }

  getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${blue}, ${green})`;
  }

  shade(color) {
    if (!color) //takes care of uncolored cells which have undefined bgcolor
      color = "rgb(255, 255, 255)";
    console.log(color);
    let rgb = color.substring(color.indexOf('(') + 1, color.length - 1).split(', ').map(c => Number(c) * 0.9);
    let col = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    return col;
  }

  colorCell(target) {
    if (this.brushMode === "rainbow")
      this.brushColor = this.getRandomColor();
    else if (this.brushMode === "black")
      this.brushColor = "rgb(0, 0, 0)";
    else if (this.brushMode === "shade")
      this.brushColor = this.shade(target.style.backgroundColor);
    console.log(this.brushColor);
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
        cellDiv.addEventListener("mouseover", e => this.colorCell(e.target));
        rowDiv.appendChild(cellDiv);
      }
      this.node.appendChild(rowDiv);
    }
  }
}

//create Grid
let gridNode = document.querySelector(".grid");
let grid = new Grid(gridNode);
grid.draw();
console.log(grid.brushColor);

//Setup Control Panel
let rangeInput = document.querySelector(".range-input");
let rangeValue = document.querySelector(".range-value");
let brushModes = document.querySelectorAll('input[name="brush-mode"]')
let resetButton = document.querySelector("#reset");
rangeValue.innerHTML = +grid.size;
rangeInput.value = grid.size;

rangeInput.addEventListener("input", (e) => {
  grid.size = Number(e.target.value);
  rangeValue.innerText = rangeInput.value;
  grid.draw();
});

brushModes[0].checked = "checked";
brushModes.forEach(brushMode => brushMode.addEventListener("change", e => grid.setBrushMode(e.target.value)));
resetButton.addEventListener("click", e => grid.draw());