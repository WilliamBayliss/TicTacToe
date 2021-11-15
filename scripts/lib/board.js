
const board = () => {
    var X = "X";
    var O = "O";
    var EMTPY = null;
    var board;

    const initialState = () => {
        return [
            [EMTPY, EMTPY, EMTPY],
            [EMTPY, EMTPY, EMTPY],
            [EMTPY, EMTPY, EMTPY]
        ]
    }

    const createWindow = (board) => {
        // Get container element
        let gameBoardContainer = document.getElementsById('gameBoard');
        for (let i = 0; i < 3; i++) {
            // Create three rows, give them row class and append to container
            row = document.createElement('div');
            row.classList.add('row');
            gameBoardContainer.appendChild(row);

            for (let j = 0; j < 3; j++) {
                // For each row create three cells, associate them to the correct spot on the board,
                // Give them cell class and append to row
                cell = document.createElement('div');
                cell.sourceNode = board[i][j];
                cell.classList.add('cell');
                row.appendChild(cell);
            }

            
        }
    }

    const initializeBoard = () => {
        board = initialState;
    }
}