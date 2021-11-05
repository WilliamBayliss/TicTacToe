startButton = document.getElementById('start-game-button');
resetButton = document.getElementById('reset-button');
gameSetupContainer = document.getElementById('game-setup');
gameBoardContainer = document.getElementById('game-board');


const Player = (token) => {


    return { token }
};

const ComputerPlayer = (token) => {

    return { token }
};

const Cell = (value, element) => {

    return { value, element }
};

const Board = (player) => {    

    // Creates board window and array and associates elements
    const populateBoard = (board) => {
        for (let i = 0; i <= 2; i++) {
            // Create an empty array and add it to the board
            emptyArray = []
            board.push(emptyArray)

            // Create cell row and append it to the game board display
            row = document.createElement('div');
            row.classList.add('row');
            gameBoardContainer.appendChild(row);
            for (let j = 0; j <= 2; j++) {
                // Create three cell elements and append them to the row on the game board
                cell = document.createElement('button');
                cell.classList.add('cell');
                row.appendChild(cell);

                // Add 3 cells to each empty array on the board
                emptyArray.push(Cell(null, cell))
                // Associate 
                cell.source = board[i][j];
            };
        };
    };

    // Modifies a cell on the board
    const placeToken = (cell) => {
        token = getPlayerTurn();
        cell.source.value = token;
        cell.innerHTML = token;
    }

    // Gets all cell elements from window and adds on click event to each
    // Where cell values are modified depending on player turn value
    const addCellClickEvents = (board) => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', event => {
                if (cell.source.value == null) {
                    placeToken(cell);
                    if (cell.source.value == "X") {
                        cell.classList.add('x-cell');
                    }
                    else if (cell.source.value == "O") {
                        cell.classList.add('o-cell');
                    }
                }
                if (winCondition(board)) {
                    winState();
                }
            })
        })
    }

    // Resets the board to initial state
    const resetBoard = (board) => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.source.value = null;
            cell.innerHTML = "";
            if (cell.classList.contains('o-cell')) {
                cell.classList.remove('o-cell');
            };
            if (cell.classList.contains('x-cell')) {
                cell.classList.remove('x-cell');
            };
        })
    };

    // Returns an array of cell value counts in the form [X, O, EMPTY]
    const countTokens = () => {
        xCount = 0;
        oCount = 0;
        nullCount = 0;
        document.querySelectorAll('.cell').forEach(cell => {
            if (cell.source.value == null) {
                nullCount++;
            }
            else if (cell.source.value == "O") {
                oCount++;
            }
            else if (cell.source.value == "X") {
                xCount++;
            }
        })
        return [xCount, oCount, nullCount];
    }

    // Uses the cell counts to determine whose turn it is and returns that value
    const getPlayerTurn = (board) => {
        tokenCounts = countTokens(board);
        if (tokenCounts[2] == 9) {
            return "X";
        }
        else if (tokenCounts[0] == tokenCounts[1]) {
            return "X";
        }
        else if (tokenCounts[0] > tokenCounts[1]) {
            return "O"
        }
    }

    // Helper functions for assessing win condition
    const allEqual = (array) => {
        if (array.includes(null)) {
            return false;
        }
        else {
            return array.every(value => value == array[0]); 
        }
    }

    const horizonalLine = (board) => {
        for (let i = 0; i < board.length; i++) {
            line = [board[i][0].value, board[i][1].value, board[i][2].value];
            if (allEqual(line)) {
                return true;
            }
        }
        return false;
    }

    const verticalLine = (board) => {
        for (let i = 0; i < board.length; i++) {
            line = [board[0][i].value, board[1][i].value, board[2][i].value];
            if (allEqual(line)) {
                return true;
            }
        }
        return false;
    }

    const downRightDiagonalLine = (board) => {
        line = [board[0][0].value, board[1][1].value, board[2][2].value];
        return allEqual(line);
    }

    const upRightDiagonalLine = (board) => {
        line = [board[2][0].value, board[1][1].value, board[0][2].value]
        return allEqual(line);
    }

    const diagonalLine = (board) => {
        if ((upRightDiagonalLine(board)) || (downRightDiagonalLine(board))) {
            return true;
        }    
        return false;
    }
    
    // Uses helper functions to assess if any vertical, horizontal or diagonal line on the board has equal, non-null values
    const winCondition = (board) => {
        if (horizonalLine(board)) {
            return true;
        } else if (verticalLine(board)) {
            return true;
        } else if (diagonalLine(board)) {
            return true;
        } else {
            return false
        }
    }

    const winState = () => {
        gameBoardContainer.classList.add('win-state');
    }

    // Creates the board and populates it with cells, adds on click events to cells and returns board
    const initializeBoard = () => {
        var board = [];
        populateBoard(board);
        addCellClickEvents(board);


        return board;
    }

    initializeBoard();

    return { getPlayerTurn, countTokens, resetBoard }
};


function startGame() {
    let token = document.querySelector('input[name="token"]:checked').value
    gameSetupContainer.classList.add('hidden');
    gameBoardContainer.classList.toggle('hidden');
    resetButton.classList.toggle('hidden')
    // Create player with selected token
    var player = Player(token);
    // Create computer player with token depending on player selection
    if (token == "X") {
        var computerPlayer = ComputerPlayer("O")
    }
    else if (token == "O") {
        var computerPlayer = ComputerPlayer("X")
    }

    // Create game board
    var board = Board(player);
    resetButton.addEventListener('click', event => {
        board.resetBoard(board);
    })
    
};

startButton.addEventListener('click', function(event) {
    startGame();
})



