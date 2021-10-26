var gameBoardDiv = document.getElementById('game-board');

const Player = name => {
    const sayName = () => {
        console.log(name)
    }

    return { sayName }
}