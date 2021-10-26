
const Player = name => {
    const sayName = () => {
        console.log(name);
    }

    return { sayName };
};

const Cell = (value) => {
    
    const setValue = (token) => {
        value = token;
    };

    return { setValue, value }
}

const gameBoard = (() => {

    const initializeBoard = () => {
        var board = [
            [],
            [],
            [],

        ];
        // Select the div for the board display
        boardDisplay = document.getElementById("game-board")
        // For each "row":
        for (let i = 0; i <= 2; i++) {
            // Create a row and append it to the board display
            let row = document.createElement("div");
            row.classList.add("row");
            boardDisplay.appendChild(row);
            // For each "cell":
            for (let j = 0; j <= 2; j++) {
                // Create a cell at the coordinate in the board array
                board[i][j] = Cell("X");

                // Create a cell element and append it to the html row element
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.innerHTML = board[i][j].value; 
                row.appendChild(cell);
            }
        }
        return board
    };

    return { initializeBoard }
})();

gameBoard.initializeBoard();


