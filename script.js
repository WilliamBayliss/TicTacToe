
const Player = name => {
    const sayName = () => {
        console.log(name);
    }

    return { sayName };
};

const Cell = (value, element) => {
    
    const initialize = () => {
        element.innerHTML = value;

        element.addEventListener("click", function(event) {
            changeValue("X")
        })
    };

    const changeValue = (token) => {
        value = token;
        element.innerHTML = token
    };

    initialize();
    return { changeValue, value }
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
 

                // Create a cell element and append it to the html row element
                let cell = document.createElement("button");
                cell.classList.add("cell-container");
                row.appendChild(cell);
                // Create a cell at the coordinate in the board array
                board[i][j] = Cell(" ", cell);
            };
        };

    };
    return { initializeBoard }
})();

gameBoard.initializeBoard();



