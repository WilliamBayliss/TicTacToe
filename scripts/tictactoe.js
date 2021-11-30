const Player = (token) => {

    return { token }
}

const ComputerPlayer = () => {
    const getBoardFromWindow = () => {
        let board = [[], [], []]
        let cells = Array.from(document.querySelectorAll('.cell'))
        cells.forEach(cell => {
            board[cell.coordinate[0]][cell.coordinate[1]] = cell.value
        })

        return board
    }
}

const Board = () => {
    const X = "X";
    const O = "O"
    const EMPTY = null;

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

                cell.value = EMPTY;
                cell.coordinate = [i, j]

            };
        };
    };

    const modifyCellValue = (cell, token) => {
        cell.value = token
        cell.innerHTML = token
        if (cell.value == X) {
            cell.classList.add('x-cell');
        } else if (cell.value == O) {
            cell.classList.add('o-cell');
        };
    };

    const initialBoardState = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        return cells.every(cell => cell.value == EMPTY);
        
    };

    const anyEmptyCheck = () => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        return cells.every(cell => cell.value !== EMPTY);
        
    };

    const winningArray = (cells) => {
        if (cells[0].value !== EMPTY) {
            return cells.every(cell => cell.value === cells[0].value);
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
                if (cell.coordinate[1] == i) {
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

    const terminalBoardState = () => {
        if (winCondition()) {
            return true;    // If win condition, true
        } else if (anyEmptyCheck()){
            return false;   // If no win condition and empty cells, false
        } else {
            return true;    // If no win condition and no empty cells, true
        };
    };

    const currentPlayer = () => {
        if (initialBoardState()) {
            return X;
        }
        else {
            let cells = Array.from(document.querySelectorAll('.cell'));
            let xCount = 0;
            let oCount = 0;
            cells.forEach(cell => {
                if (cell.value == X) {
                    xCount++;
                } else if (cell.value == O) {
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
        let cells = Array.from(document.querySelectorAll('.cell'))
        cells.forEach(cell => {
            cell.addEventListener('click', event => {
                modifyCellValue(cell, currentPlayer());

            });
        });
    };

    createBoard();
    setCellOnClicks();
}

const tictactoe = (() => {

    document.getElementById('start-button').addEventListener('click', event => {
        let token = document.querySelector('input[name="token"]').value;
        let player = Player(token);
        document.getElementById('game-setup').classList.add('hidden');
        document.getElementById('game-board').classList.remove('hidden');
    
        let board = Board();
        let cpu = ComputerPlayer();
    })

})();