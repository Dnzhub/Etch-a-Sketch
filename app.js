const container = document.querySelector('.container');
const sketchBoard = document.querySelector('.sketchBoard');
const sizeButton = document.querySelector('#sizeButton')
const rowInput = document.querySelector('#row');
const columnInput = document.querySelector('#column');


let numberOfRows = 16;
let numberOfColumns = 16;

let maxColumnAndRow = 64;
let minColumnAndRow = 1;

function createSketchBoard()
{
    for (let i = 0; i < numberOfRows; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        for(let i = 0; i < numberOfColumns; i++)
        {
            const square = document.createElement("div");
            square.classList.add("square");
    
          
    
            row.appendChild(square);
    
        }
        sketchBoard.appendChild(row);
    }
}


function removeSketchBoard()
{
    const squares = document.querySelectorAll('.sketchBoard .square')
    squares.forEach((element) => element.remove());
}

function limitSquareNumber(direction)
{
    if(direction.value < minColumnAndRow) direction.value = ""

    if(direction.value >= maxColumnAndRow)   direction.value = maxColumnAndRow;
 
}

function SendNewRowAndColumnValues()
{
    numberOfRows = rowInput.value;
    numberOfColumns = columnInput.value;
}

sizeButton.addEventListener("click", ()=>{

    removeSketchBoard();
    SendNewRowAndColumnValues();
    createSketchBoard();
})

rowInput.addEventListener("input", ()=> {
    limitSquareNumber(rowInput);
})

columnInput.addEventListener("input", ()=>{
    limitSquareNumber(columnInput);
})

createSketchBoard();
