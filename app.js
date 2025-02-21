const container = document.querySelector('.container');
const sketchBoard = document.querySelector('.sketchBoard');
const sizeButton = document.querySelector('#sizeButton')
const rowInput = document.querySelector('#row');
const columnInput = document.querySelector('#column');
const body = document.querySelector('body');
let isHoldingMouseButton = false;

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
            
            let sizeX = 660 / numberOfRows;
            let sizeY = 660 / numberOfColumns;
          
            square.style.width = `${sizeX}px`;
            square.style.height = `${sizeY}px`;
            row.appendChild(square);
            
    
        }
        sketchBoard.appendChild(row);
    }
    InitSquareMouseEvent();
}


function removeSketchBoard()
{
    const rows = document.querySelectorAll(".sketchBoard .row");
    rows.forEach((element) => element.remove());
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

function InitSquareMouseEvent()
{
    const squares = document.querySelectorAll(".square");
    for(let element of squares)
    {
        element.addEventListener("mouseenter", ()=>{
            if(isHoldingMouseButton)
            {
                element.classList.add("penColor");
            }
        })
    }
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

body.addEventListener("mousedown", ()=>{
    isHoldingMouseButton = true;
})

body.addEventListener("mouseup",()=>{
    isHoldingMouseButton = false;
})

createSketchBoard();
