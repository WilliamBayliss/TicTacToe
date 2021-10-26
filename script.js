var gameBoardDiv = document.getElementById('game-board');

const gameBoard = (() => {
    var board = [
        [["X"], ["x"], ["X"]],
        [["X"], ["X"], ["X"]],
        [["X"], ["X"], ["X"]]
    ];

    const displayBoard = () => {
        for (let i = 0; i < board.length; i++) {
            subArray = board[i]
            for (let j = 0;  j < subArray.length; j++) {
                console.log(board[i][j])
            }
        }
    };

    return { displayBoard }
})();

const Player = name => {
    const sayName = () => {
        console.log(name)
    }

    return { sayName }
};

gameBoard.displayBoard()
