startButton = document.getElementById('start-game-button');
resetButton = document.getElementById('reset-button');
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

const Cell = (value, element) => {


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


    const addCellClickEvents = () => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', event => {
                if (cell.source.value == null) {
                    player.placeToken(cell.source);
                    if (cell.source.value == "X") {
                        console.log("X")
                        cell.classList.add('x-cell');
                    }
                    else if (cell.source.value == "O") {
                        console.log("O")
                        cell.classList.add('o-cell');
                    }
                }
            })
        })
    }


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

    const countTokens = (board) => {
        xCount = 0;
        oCount = 0;
        nullCount = 0;
        document.querySelectorAll('.cell').forEach(cell => {
            console.log(cell.source)
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

    const getPlayerTurn = (board) => {
        tokenCounts = countTokens(board);
        console.log(tokenCounts)
    }

    const initializeBoard = () => {
        var board = [];
        populateBoard(board);
        addCellClickEvents();


        return board;
    }

    initializeBoard();

    return {getPlayerTurn, countTokens, resetBoard}
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



