startButton = document.getElementById('start-game-button');
gameSetupContainer = document.getElementById('game-setup');
gameBoardContainer = document.getElementById('game-board');


const Player = (token) => {

    const placeToken = (cell) => {
        cell.value = token;
        cell.element.innerHTML = token
    }

    return { placeToken }
};

const ComputerPlayer = (token) => {
    const {placeToken} = Player(token);

    return {placeToken}
};

const Cell = (value, element=null) => {

    return { value, element }
};

const Board = (player) => {    

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
                // Add 3 cells to each empty array on the board
                emptyArray.push(Cell(null))
                // Create three cell elements and append them to the row on the game board
                cell = document.createElement('button');
                cell.classList.add('cell');
                row.appendChild(cell);

                // Associate the two objects
                cell.cell = board[i][j];
                cell.cell.element = cell;
            };
        };
    };

    const addCellClickEvents = () => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', event => {
                if (cell.cell.value == null) {
                    player.placeToken(cell.cell);
                    if (cell.cell.value == "X") {
                        cell.classList.add('x-cell');
                    }
                    else if (cell.cell.value == "O") {
                        cell.classList.add('o-cell');
                    }
                }
            })
        })
    }

    const initializeBoard = () => {
        var board = [];
        populateBoard(board);
        addCellClickEvents();


        return board;
    }

    initializeBoard();


};


function startGame() {
    let token = document.querySelector('input[name="token"]:checked').value
    gameSetupContainer.classList.add('hidden');
    gameBoardContainer.classList.toggle('hidden');

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
};

startButton.addEventListener('click', function(event) {
    startGame();
})



