const Player = (token) => {

    return { token }
}

const Board = () => {
    const X = "X";
    const O = "O"
    const EMPTY = null;

    const createBoard = () => {
        let gameBoard = document.getElementById('game-board')
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div')
            row.classList.add('row');
            gameBoard.appendChild(row)
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('div')
                cell.classList.add('cell')
                row.appendChild(cell);

                cell.value = EMPTY;
                cell.coordinate = [i, j]

            }
        }
    }

    const allEmptyCheck = () => {
        let cells = Array.from(document.querySelectorAll('.cell'))
        return cells.every(cell => cell.value == EMPTY)
        
    }

    const winningArray = (cells) => {
        if (cells[0].value !== EMPTY) {
            return cells.every(cell => cell.value === cells[0].value)
        } else {
            return false;
        }
    }

    const rowScan = () => {
        let rows = Array.from(document.querySelectorAll('.row'))
        for (let i = 0; i < rows.length; i++) {
            let cells = Array.from(rows[i].childNodes)
            if (winningArray(cells)) {
                return true;
            }
        }
        return false;
    }

    const colScan = () => {
        let cells = Array.from(document.querySelectorAll('.cell'))
        for (let i = 0; i< 3; i++) {
            let column = []
            cells.forEach(cell => {
                if (cell.coordinate[1] == i) {
                    column.push(cell)
                }
            })
            if (winningArray(column)) {
                return true
            }
        }
        return false;
    }

    const diagonalScan = () => {
        let cells = Array.from(document.querySelectorAll('.cell'))
        let diagonalOne = [cells[0], cells[4], cells[8]]
        let diagonalTwo = [cells[2], cells[4], cells[6]]

        if ((winningArray(diagonalOne) ) || winningArray(diagonalTwo)) {
            return true
        } else {
            return false
        }
    }

    const currentPlayer = () => {
        if (allEmptyCheck()) {
            return X;
        }
        else {
            let cells = Array.from(document.querySelectorAll('.cell'))
            let xCount = 0;
            let oCount = 0;
            cells.forEach(cell => {
                if (cell.value == X) {
                    xCount++;
                } else if (cell.value == O) {
                    oCount++;
                }
            })
            if (xCount > oCount) {
                return O;
            } else if (xCount == oCount) {
                return X;
            }
        }
    }

    createBoard();
    console.log(currentPlayer());
}

const tictactoe = (() => {
    document.getElementById('start-button').addEventListener('click', event => {
        let token = document.querySelector('input[name="token"]').value;
        let player = Player(token);
        document.getElementById('game-setup').classList.add('hidden');
        document.getElementById('game-board').classList.remove('hidden');
    
        let board = Board();
    })

})();