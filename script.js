
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
        element.innerHTML = token
        element.boardCell.value = token;
    };

    initialize();
    return { changeValue, value, element }
}

const Board = () => {
    // Helper functions to assess board state
    // 
    // Gets an array of vertical cells from the board
    const getColumnFromBoard = (board, index) => {
        column = [board[0][index], board[1][index], board[2][index]]
        return column;
    };

    // Returns true if all cells in an array have the same value
    const allCellsSameValue = array => {
        array.every( value => value === arr [0] );
    };

    // Iterates over the board and counts the number of squares marked X, O, and left empty.
    // Returns an array of the three counts
    const countBoardTokens = (board) => {
        let xCount = 0;
        let oCount = 0;
        let nullCount = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].value == "X") {
                    xCount++;
                }
                else if (board[i][j].value == "O") {
                    oCount++;
                }
                else if (board[i][j].value == null) {
                    nullCount++;
                }
            };
        };
        return [xCount, oCount, nullCount];
    };

    // Gets the token counts to assess whose turn it is
    const getPlayerTurn = (board) => {
        tokenCount = countBoardTokens(board);
        console.log(tokenCount)
        // if all 9 squares are empty it is player X turn
        if (tokenCount[2] == 9) {
            return "X";
        }
        // If player X has more tokens on the board, it is player O turn
        else if (tokenCount[0] > tokenCount[1]) {
            return "O";
        }
        // If X and O have equal # of tokens it is player X turn
        else if (tokenCount[0] == tokenCount[1]) {
            return "X";
        }
    };


    const initializeBoard = () => {
        var board = [
            [],
            [],
            [],

        ];
        // Select the div for the board display
        boardDisplay = document.getElementById("game-board");

        for (let i = 0; i <= 2; i++) {
            // Create a row and append it to the board display
            let row = document.createElement("div");
            row.classList.add("row");
            boardDisplay.appendChild(row);
            for (let j = 0; j <= 2; j++) {
                // Create a cell HTML element and append it to the html row element
                let cell = document.createElement("button");
                cell.classList.add("cell-container");
                // Create a cell at the coordinate in the board array
                board[i][j] = Cell(null, cell);
                // Associate the board array cell with the HTML object
                cell.boardCell = board[i][j];
                row.appendChild(cell);
                cell.addEventListener('click', function(event) {
                    token = getPlayerTurn(board);
                    cell.boardCell.changeValue(token);
                })
            };
        };

        return board;
    };
    
    return { getPlayerTurn, initializeBoard }

    
};

let board = Board();
board.initializeBoard();



