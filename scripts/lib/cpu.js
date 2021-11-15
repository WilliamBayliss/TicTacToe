
const cpu = (token) => {
    
    var X = "X";
    var O = "O";
    var EMPTY = null;

    // returns initial state of the board
    const initialState = () => {
        return [[EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY]]
    };

    // Returns the current player
    const currentPlayer = () => {
        if (board == initialState) {
            return X
        }
        else {
            let x_count = 0;
            let o_count = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == X) {
                        x_count++;
                    }
                    else if (board[i][j] == O) {
                        o_count++
                    };
                };
            };

            if (x_count > o_count) {
                return O;
            }
            else if (x_count == o_count) {
                return X;
            };
        };
    };

    // Returns a set of all possible actions
    const actions = (board) => {
        let actions = new Set();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == EMPTY) {
                    let action = (i, j);
                    actions.add(action);
                };
            };
        };

        return actions
    };

    // returns the board state after taking an action
    const result = (board, action) => {
        // Create a deepcopy of the board
        newBoardState = _.clone(board);

        if (board[action[0]][action[1]] !== EMPTY) {
            console.log("Error, invalid action on board");
        }
        else {
            token = currentPlayer(board);
            newBoardState[action[0]][action[1]] = token;
            return newBoardState;
        };
    };


    const rowScan = (row) => {
        if (row.every(value => value == row[0])) {
            if (row[0] == X) {
                return X;
            }
            else if (row[0] == O) {
                return O;
            }
            else if (row[0] == EMPTY) {
                return null;
            };
        };
    };

    const columnScan = (column) => {
        if (column.every(value => value == columns[0])) {
            if (column[0] == X) {
                return X;
            }
            else if (column[0] == O) {
                return O;
            }
            else if (column[0] == EMPTY) {
                return null;
            };
        };
    };

    const diagonalScanOne = (board) => {
        let diagonal = [board[0][0], board[1][1], board[2][2]]
        if (diagonal.every(value => value == diagonal[0])) {
            if (diagonal[0] == X) {
                return X;
            }
            else if (diagonal[0] == O) {
                return O;
            }
            else if (diagonal[0] == EMPTY) {
                return null
            };
        };
    };

    const diagonalScanTwo = (board) => {
        let diagonal = [board[2][0], board[1][1], board[0][2]]
        if (diagonal.every(value => value == diagonal[0])) {
            if (diagonal[0] == X) {
                return X;
            }
            else if (diagonal[0] == O) {
                return O;
            }
            else if (diagonal[0] == EMPTY) {
                return null
            };
        };
    };

    // Returns the winner of the game if there is one
    const winner = (board) => {
        for (let i = 0; i < 3; i++) {
            winningRow = rowScan(board[i])
            if (winningRow !== null) {
                return winningRow;
            }
        };

        for (let j = 0; j < 3; j++) {
            column = [board[0][i], board[1][i], board[2][i]];
            winningColumn = columnScan(column);
            if (winningColumn !== null) {
                return winningColumn;
            }
        };

        winningDiagonalOne = diagonalScanOne(board);
        if (winningDiagonalOne !== null) {
            return winningDiagonal
        };

        winningDiagonalTwo = diagonalScanTwo(board);
        if (winningDiagonalTwo !== null) {
            return winningDiagonalTwo
        };
    }

    const anyEmptyCells = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == EMTPY) {
                    return true;
                }
            }
        }

        return false;
    }

    const terminal = (board) => {
        if (winner(board) !== undefined) {
            return true;
        }
        else if ((winner(board) == undefined) && (anyEmptyCells(board) == false)) {
            return true;
        }
        else {
            return false
        }
    }

    const utility = (board) => {
        win = winner(board);
        if (win == X) {
            return 1;
        }
        else if (win == O) {
            return -1;
        }
        else {
            return 0;
        }
    }

    const minimumScore = (board, alpha, beta) => {
        
        if (terminal(board)) {
            return utility(board)
        }

        let baseValue = Infinity;
        
        for (var action in actions(board)) {
            baseValue = Math.min(baseValue, maximumScore(result(board, action)), alpha, beta)
        
            if (baseValue <= alpha) {
                return baseValue;
            }
            else if (baseValue < beta) {
                beta = baseValue;
            };
        };

        return baseValue;
    };

    const maximumScore = (board, alpha, beta) => {
        if (terminal(board)) {
            return utility(board);
        };

        let baseValue = -Infinity;

        for (var action in actions(board)) {
            baseValue = Math.max(baseValue, minimumScore(result(board, action), alpha, beta))

            if (baseValue >= beta) {
                return baseValue;
            }
            else if (baseValue > alpha) {
                alpha = baseValue;
            };
        };
        return baseValue;
    };

    const minimax = (board) => {
        if (terminal(board)) {
            return null;
        }

        var alpha = -Infinity;
        var beta = Infinity;
        var bestMove;
        player = currentPlayer(board);

        if (player == X) {
            for (var action in actions(board)) {
                let bestWorstOption = minimumScore(result(board, action), alpha, beta);

                if (bestWorstOption > alpha) {
                    alpha = bestWorstOption;
                    bestMove = action;
                } 
            }
        }
        else {
            for (var action in actions(board)) {
                let worstBestOption = maximumScore(result(board, action), alpha, beta);

                if (worstBestOption < beta) {
                    beta = worstBestOption;
                    bestMove = action;
                }
            }
        }

        return bestMove;
    }

    return { currentPlayer, actions, result, terminal, utility }
}