
const Player = (token) => {

    const setToken = (string) => {
        token = string;
    }

    return { setToken };
};

const Cell = (value, element) => {
    
    const initialize = () => {
        element.innerHTML = value;

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
                board[i][j] = Cell(null, cell);
            };
        };
        return board;
    };

    var board = initializeBoard();

    // Helper functions to assess board state
    // 
    // Returns true if a cell value is null
    const emptyCell = (cell) => {
        if (cell.value !== null) {
            return false
        };
        return true;
    };


    // Only returns true if all cells on the board are empty
    const emptyBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (!emptyCell(board[i][j])) {
                    return false;
                }
            }
        }
        return true;
    };


    // Gets an array of vertical cells from the board
    const getColumnFromBoard = (index) => {
        column = [board[0][index], board[1][index], board[2][index]]
        return column;
    };

    // Returns true if all cells in an array have the same value
    const allCellsSameValue = array => {
        array.every( value => value === arr [0] );
    };


    return { initializeBoard }
})();



