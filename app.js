const container = document.querySelector(".container");
let numberOfRows = 16;
let numberOfColumns = 16;

//Create div called row 
//row has 16 another div in it
//To make them together add flex box to each row

for (let i = 0; i < numberOfRows; i++) {
    const row = document.createElement('div');
    row.classList.add("row");
    for(let i = 0; i < numberOfColumns; i++)
    {
        const square = document.createElement("div");
        square.classList.add("square");
        row.appendChild(square);

    }
    container.appendChild(row);
}



