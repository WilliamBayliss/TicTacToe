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
        if (cells[0].value !== EMPTY) {
            return cells.every(cell => cell.dataset.value === cells[0].value);
        } else {
            return false;
        };
    };

    const rowScan = () => {
        let rows = Array.from(document.querySelectorAll('.row'));
        for (let i = 0; i < rows.length; i++) {
            let cells = Array.from(rows[i].childNodes);
            if (winningArray(cells)) {
                return true;
            };
        };
        return false;
    };

    const colScan = (cells) => {
        for (let i = 0; i< 3; i++) {
            let column = [];
            cells.forEach(cell => {
                if (cell.dataset.coordinate[2] == i) {
                    column.push(cell);
                };
            });
            if (winningArray(column)) {
                return true;
            };
        };
        return false;
    };

    const diagonalScan = (cells) => {
        let diagonalOne = [cells[0], cells[4], cells[8]];
        let diagonalTwo = [cells[2], cells[4], cells[6]];

        if ((winningArray(diagonalOne) ) || winningArray(diagonalTwo)) {
            return true;
        } else {
            return false;
        };
    };

    const winCondition = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        if ( (rowScan()) || (colScan(cells)) || (diagonalScan(cells)) ) {
            return true;
        };
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

    const setCellOnClicks = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        cells.forEach(cell => {
            cell.addEventListener('click', event => {
                if (cell.dataset.value == "null") {
                    modifyCellValue(cell);
                    setTimeout(() => { cpu.randomMove(); }, 500);
                }

            });
        });
    };

    const winState = () => {

    }

    createBoard();
    setCellOnClicks();
}

const tictactoe = (() => {
    let setupDisplay = document.getElementById('game-setup');
    let boardDisplay = document.getElementById('game-board');
    

    document.getElementById('start-button').addEventListener('click', event => {
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