const game = () => {
    const setup = () => {
        let setupDisplay = document.getElementsById('game-setup')
        let boardDisplay = document.getElementsById('game-board')
        let startButton = document.getElementsById('start-game-button');
        startButton.addEventListener('click', function(event) {
            playerSelection = document.querySelector('input[name="token"]:checked').value;
            setupDisplay.classList.add('hidden')
            boardDisplay.classList.remove('hidden');
        })

    }
    setup();
}
