const INITIAL_ROW = 16;
const INITIAL_COLUMN = 16;
const MAX_ROW_COLUMN = 64;
const MIN_ROW_COLUMN = 1;
const DEFAULT_COLOR = "#000000"
const ERASER_COLOR = "#ebe8dd";
const RANDOM_MODE = "random";
const DEFAULT_MODE = "default";
const CUSTOM_MODE = "custom";
const ERASER_MODE = "eraser";

const container = document.querySelector('.container');
const sketchBoard = document.querySelector('.sketchBoard');
const sizeButton = document.querySelector('#sizeButton')
const rowInput = document.querySelector('#row');
const opacity = document.querySelector('#opacity')
const color = document.querySelector('#color');
const randomColor = document.querySelector('.randomColor');
const defaultColor = document.querySelector('.defaultColor');
const customColor = document.querySelector('.customColor');
const eraser = document.querySelector('.eraser');
const gridSizeString = document.querySelector('.gridSizeString');

let opacityValueString = document.querySelector('.opacityValue');
let isHoldingMouseButton = false;
let numberOfGrid = INITIAL_ROW;
let maxColumnAndRow = MAX_ROW_COLUMN;
let minColumnAndRow = MIN_ROW_COLUMN;
let selectedColorMode = "default"
let selectedOpacity = 0.5;
opacityValueString.innerText = opacity.value;


function createSketchBoard()
{
    for (let i = 0; i < numberOfGrid; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        for(let i = 0; i < numberOfGrid; i++)
        {
            const square = document.createElement("div");
            square.classList.add("square");
            
            let sizeX = 660 / numberOfGrid;
            let sizeY = 660 / numberOfGrid;
          
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
    numberOfGrid = rowInput.value;
}

function InitSquareMouseEvent()
{
    const squares = document.querySelectorAll(".square");
    for(let element of squares)
    {
        
        element.addEventListener("mouseenter", (e)=>{
            if(isHoldingMouseButton)
            {
               
                ChangeBackgroundColor(element);
            }
        })
       
        element.addEventListener("mousedown", ()=>{
            ChangeBackgroundColor(element);

        })
       
    }
}
function ChangeBackgroundColor(element)
{
    SetOpacity(element);
    switch (selectedColorMode) {
        case DEFAULT_MODE:
            element.style.backgroundColor = DEFAULT_COLOR;
            color.value = DEFAULT_COLOR;
            break;
        case RANDOM_MODE:
            let randomColor = GenerateRandomColor();
            element.style.backgroundColor = randomColor;
            color.value = randomColor;
            break;
        case CUSTOM_MODE:
            element.style.backgroundColor = color.value;
            break;
        case ERASER_MODE:
            element.style.backgroundColor = ERASER_COLOR;
            break;
        default:
            break;
    }
        
}

function SetOpacity(element)
{
    element.style.opacity = selectedOpacity;
}

function GenerateRandomColor()
{
    let r = parseInt(Math.floor(Math.random() * 255) + 1);
    let g = parseInt(Math.floor(Math.random() * 255) + 1);
    let b = parseInt(Math.floor(Math.random() * 255) + 1);

    return rgbToHex(r,g,b);
}

function componentToHex(component)
{
    const hex = component.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r,g,b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function printGridSize()
{
    gridSizeString.innerText = `${row.value} x ${row.value}`;
}

sizeButton.addEventListener("click", ()=>{

    removeSketchBoard();
    SendNewRowAndColumnValues();
    createSketchBoard();
})

rowInput.addEventListener("input", ()=> {
    limitSquareNumber(rowInput);
    printGridSize();
})



sketchBoard.addEventListener("mousedown", (e)=>{
    //Note: If you don't use preventDefault, sometimes mouseup event does not firing
    e.preventDefault();
    isHoldingMouseButton = true;    
})

sketchBoard.addEventListener("mouseup",(e)=>{
    isHoldingMouseButton = false;

})

opacity.addEventListener("input", (e)=>{
    opacityValueString.innerText = e.target.value;
    //Get number between 0 - 1
    selectedOpacity = e.target.value * 0.01;
})

randomColor.addEventListener("click", ()=>
{
    selectedColorMode = RANDOM_MODE;
})

defaultColor.addEventListener("click", ()=>{
    selectedColorMode = DEFAULT_MODE;
})

customColor.addEventListener("click", ()=>{
    selectedColorMode = CUSTOM_MODE;
})

eraser.addEventListener("click", ()=>{
    selectedColorMode = ERASER_MODE;
    selectedOpacity = 1;
    opacity.value = 100;
    opacityValueString.innerText= "100";
})

window.addEventListener("load", ()=>{

    createSketchBoard();
})

