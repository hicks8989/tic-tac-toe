// Run all code once the DOM has finished loading.
// Had to put js and jquery in head because of changing snippits.
$( document ).ready( () => {

    // Load the startup page.
    $( 'body' ).html(
        `<div class="screen screen-start" id="start">
            <header>
                <h1>Tic Tac Toe</h1>
                <p class="name">Enter your name:</p>
                <input type="text" name="name" id="name"><br><br>
                <a href="#" class="button">Start game</a>
            </header>
        </div>`
    );

    // Load the game page if the button is pressed.
    $( 'a' ).click( () => {
        // Get the value of the name input and store it in a variable.
        // If no name is provided, call the user 'player one'.
        const playerName = $( 'input' )[0].value || 'Player one';
        // Next load the board game page.
        $( 'body' ).html(
            `<div class="board" id="board">
                <header>
                    <h1>Tic Tac Toe</h1>
                    <ul>
                        <li class="players active" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
                        <li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
                    </ul>
                </header>
                <ul class="boxes">
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li> 
                    <li class="box"></li>
                </ul>
            </div>`
        );
        // Get the value of the board and store it in a variable.
        const board = $( '.box' );
        // Create a boardState array that will be changed later.
        // 1 for human player, -1 for ai, 0 for empty.
        let boardState = [0,0,0,0,0,0,0,0,0];
        // Create an object for the player and the ai.
        // A boolean to represent whos turn it is.
        const HUMAN = true;
        // The player object.
        const HUMVAL = {
            // The players board state piece.
            val: 1,
            // The players space class.
            spaceClass: 'box-filled-1',
            // The players background color for its active state.
            color: '#FFA000',
            // The players win display.
            display: playerName + ' wins!',
            // The class of the win screen div.
            win: 'screen-win-one'
        };
        // A boolean to represent whos turn it is.
        const COMPUTER = false;
        // The computer object.
        const COMVAL = {
            // The computers board state piece.
            val: -1,
            // The computers space class.
            spaceClass: 'box-filled-2',
            // The computers background color for its active state.
            color: '#3688C3',
            // The ais win display.
            display: 'You lose.',
            // The class for the win screen div.
            win: 'screen-win-two'
        };
        // Create a function to allow users to set a piece.
        function setPiece (index, player) {
            // Get the players value.
            const value = player === HUMAN ? HUMVAL : COMVAL;
            // Change the board state to represent that the piece has been changed.
            boardState[index] = value.val;
            // Create the piece on the board.
            $( board[index] ).addClass(value.spaceClass);
        }
        // Create a function to change turns.
        function togglePlayer (player) {
            // Get the opposite player to get their color instead.
            value = player === HUMAN ? COMVAL : HUMVAL;
            // Change which player is active and remove color from both players.
            $( '.players' ).toggleClass('active').css({ backgroundColor: 'white' });
            // Set the current players background to their color.
            $( '.active' ).css({ backgroundColor: value.color });
        }
        // Create a function to determine if a player has won the game.
        function isWinner (board, player) {
            // Get the value of the player.
            value = player === HUMAN ? HUMVAL : COMVAL;
            // Create a matrix of all possible ways to win the game.
            const winMatrix = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            // Iterate through the matrix.
            for (let i = 0; i < winMatrix.length; i++) {
                // Create a boolean to determine if the player has won.
                let win = true;
                // Iterate though each matrix.
                for (let j = 0; j < winMatrix[i].length; j++) {
                    // Check if the player does not own that spot in the board.
                    if (board[winMatrix[i][j]] != value.val) {
                        // They did not win via this matrix.
                        win = false;
                        // Break out of the for loop and iterate though the next matrix
                        break;
                    }
                }
                // Check the status of win.
                if (win) {
                    // If win is true, return that the player won the game.
                    return true;
                }
            }
            // If they get through all of the matrices without a win, return that they did not win.
            return false;
        }
        // Create a function to determine if the game is a draw.
        function isDraw (board) {
            // Iterate through the board state and see if any spaces are open.
            for (let i = 0; i < board.length; i++) {
                // Check if the board state at the given index is 0, if it is return false.
                if (board[i] === 0) {
                    // Return that the game is not a draw.
                    return false;
                }
            }
            // If the board is completely iterated through without one free space, return true.
            return true;
        }
        // Create the ai player.
        // The ai is point based and chooses the path with the most points, a loss subtracts points,
        // a win adds points, and a draw awards no points.
        function computerMove (board, depth, player) {
            // Check if the opposite player has won.
            if (isWinner(board, !player)) {
                // If they have return a negative amount of points.
                return 10 - depth;
            }
            // Check if the game is a draw.
            if (isDraw(board)) {
                // Return that no one has won.
                return 0;
            }
            // Get the value of the player and store it in a variable.
            const value = player === HUMAN ? HUMVAL : COMVAL;
            // Create a variable to track the highest possible move.
            let max = -Infinity;
            // Declare the index variable.
            let index = 0;
            // Iterate through the board.
            for(let i = 0; i < 9; i++) {
                // Make sure the move is a legal move.
                if (board[i] == 0) {
                    // Clone the old board state.
                    let newBoardState = board.slice();
                    // On the cloned board check the value of the player taking the space at i.
                    newBoardState[i] = value.val;
                    // Run the code again using the new board and the opposite player.
                    const moveVal = computerMove (newBoardState, depth + 1, !player);
                    // Check if the current move is better than the last greatest move.
                    if (moveVal > max) {
                        // Update the max to become moveVal.
                        max = moveVal;
                        // Save the moves index.
                        index = i;
                    }
                }
            }
            // Make sure that the function is out of the reccursive loop.
            if (depth === 0) {
                // Make the best possible move.
                setPiece(index, COMPUTER);
                togglePlayer(COMPUTER);
            }
            // Return the best possible outcome.
            return max;
        }
        // Create a function to display the win screen if a player wins.
        function winner(player) {
            // Get the value of the winner.
            const value = player === HUMAN ? HUMVAL : COMVAL;
            // Change the pages html using a template literal.
            $( 'body' ).html(
                `<div class="screen screen-win ${value.win}" id="finish">
                    <header>
                        <h1>Tic Tac Toe</h1>
                        <p class="message">${value.display}</p>
                        <a href="index.html" class="button">New game</a>
                    </header>
                </div>`
            );
        }
        // Create a function to display if the game is a draw.
        function draw() {
            // Change the pages html.
            $( 'body' ).html(
                `<div class="screen screen-win screen-win-tie" id="finish">
                    <header>
                        <h1>Tic Tac Toe</h1>
                        <p class="message">It's a tie!</p>
                        <a href="index.html" class="button">New game</a>
                    </header>
                </div>`
            );
        }
        // Create the click handler event to be called if a player clicks on a piece.
        board.click( e => {
            // First make sure that the player is active.
            if ($( '#player1' ).attr('class').includes('active')) {
                // Get the click event and store it in a variable.
                const space = e.target;
                // Iterate through the board to see which one is the same as the event target.
                for (let i = 0; i < board.length; i++) {
                    // Check if the board at index i is the same as the event.target.
                    if (board[i] == space) {
                        // Next make sure that the space has not been taken.
                        if (boardState[i] == 0) {
                            // Make the move.
                            setPiece(i, HUMAN);
                            // Toggle whos turn it is.
                            togglePlayer(HUMAN);
                            // Check if the human player has won.
                            if (isWinner(boardState, HUMAN)) {
                                // Bring up the winner screen for the human player.
                                winner(HUMAN);
                                // Break out of the function.
                                return;
                            }
                            // Check if the game is a draw.
                            if (isDraw(boardState)) {
                                // Bring up the draw screen.
                                draw();
                                // Break out of the function.
                                return;
                            }
                            // Make the ai take its turn.
                            computerMove(boardState, 0, COMPUTER);
                            // Check if the ai player has won.
                            if (isWinner(boardState, COMPUTER)) {
                                // Bring up the winner screen for the computer player.
                                winner(COMPUTER);
                                // Break out of the function.
                                return;
                            }
                            // Check if the game is a draw.
                            if (isDraw(boardState)) {
                                // Bring up the draw screen.
                                draw();
                                // Break out of the function.
                                return;
                            }
                            // If no one has won or the game is not a draw, return.
                            return;
                        }
                    }
                }
            }
        })
    });
});