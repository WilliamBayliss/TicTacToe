const X = "X";
const O = "O"
const EMPTY = "null";

const Player = (token) => {
    return { token }
}

const ComputerPlayer = (token) => {
    const getBoardFromWindow = () => {
        let board = [[], [], []]
        let cells = Array.from(document.querySelectorAll('.cell'))
        cells.forEach(cell => {
            board[cell.dataset.coordinate[0]][cell.dataset.coordinate[1]] = cell.dataset.value
        })

        return board
    }
    const getCell = () => {
        let cells = Array.from(document.querySelectorAll('.cell[data-value="null"]'))
        let cell = cells[Math.floor(Math.random() * cells.length)]
        return cell
    }

    const randomMove = () => {
        let cell = getCell();
        if (cell == null) {
            return;
        } else {
            cell.dataset.value = token;
            cell.innerHTML = token;
            
            if (token == X) {
                cell.classList.add('x-cell');
            } else if (token == O) {
                cell.classList.add('o-cell');
            };
        }
    }

    return { randomMove, token }
}

const Board = (player, cpu) => {

    const createBoard = () => {
        let gameBoard = document.getElementById('game-board');
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            gameBoard.appendChild(row);
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);

                cell.dataset.value = EMPTY;
                cell.dataset.coordinate = [i, j]

            };
        };
    };

    const modifyCellValue = (cell) => {
            cell.dataset.value = player.token
            cell.innerHTML = player.token
            if (cell.dataset.value == X) {
                cell.classList.add('x-cell');
            } else if (cell.dataset.value == O) {
                cell.classList.add('o-cell');
            };
    };

    const initialBoardState = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        return cells.every(cell => cell.dataset.value == EMPTY);
        
    };

    const anyEmptyCheck = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        return cells.some(cell => cell.dataset.value == EMPTY);
        
    };

    const winningArray = (cells) => {
        if (cells.some(cell => cell.dataset.value == EMPTY)) {
            return false;
        } else {
            return cells.every(cell => cell.dataset.value == cells[0].dataset.value);
        };
    };

    const rowScan = () => {
        for (let i = 0; i < 3; i++) {
            // Get all cells with an x coordinate of i to get all cells in a given row
            let cells = Array.from(document.querySelectorAll(`.cell[data-coordinate^="${i}"]`))
            if (winningArray(cells)) {
                return true;
            }
        };
        return false;
    };

    const colScan = () => {
        for (let i = 0; i< 3; i++) {
            let column = Array.from(document.querySelectorAll(`.cell[data-coordinate$="${i}"]`));
            if (winningArray(column)) {
                return true;
            };
        };
        return false;
    };

    const diagonalScan = () => {
        let cells = Array.from(document.querySelectorAll('.cell'))
        let diagonalOne = [cells[0], cells[4], cells[8]];
        let diagonalTwo = [cells[2], cells[4], cells[6]];

        if ((winningArray(diagonalOne) ) || winningArray(diagonalTwo)) {
            return true;
        } else {
            return false;
        };
    };

    const winCondition = () => {
        if ( (rowScan()) || (colScan()) || (diagonalScan()) ) {
            return true;
        } else {
            return false;
        }

    };

    const fullBoard = () => {
        if (anyEmptyCheck()){
            return false;   // If empty cells, false
        } else {
            return true;    // If no empty cells, true
        };
    };

    const terminalBoard = () => {

        if (winCondition() || fullBoard()) {
            return true;
        } else {
            return false;
        }
    }

    const currentPlayer = () => {
        if (initialBoardState()) {
            return X;
        }
        else {
            let cells = Array.from(document.querySelectorAll('.cell'));
            let xCount = 0;
            let oCount = 0;
            cells.forEach(cell => {
                if (cell.dataset.value == X) {
                    xCount++;
                } else if (cell.dataset.value == O) {
                    oCount++;
                };
            });
            if (xCount > oCount) {
                return O;
            } else if (xCount == oCount) {
                return X;
            };
        };
    };

    const winCheck = () => {
        if (terminalBoard()) {
            winState();
        }
    }

    const gameRound = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        cells.forEach(cell => {
            cell.addEventListener('click', cellClick = () => {
                if (cell.dataset.value == "null") {
                    // Allow player to move if board not terminal
                    if (!terminalBoard()) {
                        modifyCellValue(cell);
                        // Check for win condition after move and activate win state if true
                        winCheck();
                    }
                    // Perform CPU move if board not terminal
                    if (!terminalBoard()) {
                        cpu.randomMove();
                        // Check for win condition after move and activate win state if true
                        winCheck();
                    }
                }
            });
        });
    };

    // Reset the value, innerHTML and CSS classes of every cell on the board
    // Create new players based on updated token selection
    const newGame = () => {
        document.getElementById('title').innerHTML = "Tic Tac Toe!"
        let gameBoard = document.getElementById('game-board')    
        gameBoard.classList.remove('win-state');
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild)
        }
        createBoard();
        let token = document.querySelector('input[name="token"]:checked').value;
        player = Player(token);
        if (token == X) {
            cpu = ComputerPlayer(O);
        } else if (token == O) {
            cpu = ComputerPlayer(X);
            cpu.randomMove();
        };
        gameRound();
    };

    const winState = () => {
        if (winCondition()) {
            let current = currentPlayer();
            if (current == X) {
                var winner = O
            } else {
                var winner = X
            }
            document.getElementById('title').innerHTML = `Game Over! ${winner} is the winner!`;

        } else {
            document.getElementById('title').innerHTML = 'Game Over! Draw!'
        }
        document.getElementById('game-board').classList.add('win-state');
        document.getElementById('start-button').innerHTML = "Play Again";
        document.getElementById('game-setup').classList.remove('hidden');
        document.getElementById('start-button').addEventListener('click', startNewGame = () => {
            newGame();
        });

    };

    createBoard();
    gameRound();
    return { terminalBoard, winState }
}

const tictactoe = (() => {
    let setupDisplay = document.getElementById('game-setup');
    let boardDisplay = document.getElementById('game-board');
    

    document.getElementById('start-button').addEventListener('click', startGame = () => {
        let token = document.querySelector('input[name="token"]:checked').value;
        if (token == X) {
            var cpuToken = O;
        } else if (token == O) {
            var cpuToken = X;
        }
        let player = Player(token);
        let cpu = ComputerPlayer(cpuToken);
        setupDisplay.classList.add('hidden');
        boardDisplay.classList.remove('hidden');
    
        let board = Board(player, cpu);
        if (cpu.token == X) {
            cpu.randomMove();
        }


    });

})();