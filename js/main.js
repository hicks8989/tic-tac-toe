// Run all code once the DOM has finished loading.
// Had to put js and jquery in head because of changing snippits.
$( document ).ready( () => {

    // Create variables for each players piece.
    const player1 = '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#FFFFFF"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"></path></g></g></g></svg>';
    const player2 = '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#FFFFFF"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"></path></g></g></g></svg>';

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

    // Create the logic for the game.

    // Create a funcion to determine if the game is a draw.
    function isDraw () {
        // Get the board.
        const board = $( '.box' ); 
        // Iterate through the board.
        for (let i = 0; i < board.length; i++) {
            // Check if the space is not taken, if it isn't the game is not a draw.
            if ($(board[i]).attr('class') === 'box') {
                return false;
            }
        }
        // If the whole board is iterated through and none of the spaces are empty, return true.
        return true;
    }
    // Create a function to determine if a player has won the game.
    function isWinner (cls) {
        // Create a multidimensional array to hold each row of the board.
        let boardArray = [];
        boardArray.push($( '.box' ).slice(0, 3));
        boardArray.push($( '.box' ).slice(3, 6));
        boardArray.push($( '.box' ).slice(6, 9));
        // Iterate through each row
        for (let row = 0; row < 3; row++) {
            // Create variables to determine the amount of pieces in a row.
            let rowCount = 0;
            let colCount = 0;
            let diagCount = 0;
            // Iterate through each column.
            for (let col = 0; col < 3; col++) {
                // Check to see if the piece is at that space.
                if ($(boardArray[row][col]).attr('class').includes(cls)) {
                    // Increment the row counter.
                    rowCount++;
                }
                if ($(boardArray[col][row]).attr('class').includes(cls)) {
                    // Increment the col Counter.
                    colCount++;
                }
                if ($(boardArray[col][col]).attr('class').includes(cls)) {
                    // Increment the diag Counter.
                    diagCount++;
                }
                // Check to see if any of the counts are 3.
                if (rowCount === 3 || colCount === 3 || diagCount === 3) {
                    // Return that the player has won the game.
                    return true;
                }
            }
        }
        // Finally test the other diagonal pattern.
        let row = 2;
        // Iterate through each column.
        for (let col = 0; col < boardArray.length; col++) {
            if (!$(boardArray[row][col]).attr('class').includes(cls)) {
                // Return that the player did not win.
                return false;
            }
            row--;
        }
        // Return that the player won the game.
        return true;
    }

    // If the start button is pressed get the name, change the page, and start the game.
    $( 'a' ).on('click', function startGame() {
        // Get the value of the players name.
        // If no name is provided use "player one" instead.
        const playerName = $( '#name' )[0].value || "player one";
        // Load the board page.
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
        // Get the board and store it in a variable.
        const board = $( '.box' );
        // Create the clickhandler for the board to allow players to make moves.
        board.click( (e) => {
            // Get the space as a jquery object.
            const $space = $(e.target);
            // Declare the player here.
            let player;
            let color;
            let otherColor;
            // Check which player is active and store that in a variable.
            if ($( '.active' ).attr('id').includes('player1')) {
                player = player1;
                color = '#FFA000';
                otherColor = '#3688C3';
                cls = 'box-filled-1';
            } else {
                player = player2;
                color = '#3688C3';
                otherColor = '#FFA000';
                cls = 'box-filled-2';
            }
            // Check if the space has not already been taken.
            if ($space.attr('class') === 'box') {
                $space.html();
                $space.css({ backgroundColor: color });
                $space.addClass( cls );
                $( '.players' ).toggleClass( 'active' ).css({ backgroundColor: 'white' });
                $( '.active' ).css({ backgroundColor: otherColor });
                // Check if the player has won the game.
                if (isWinner(cls)) {
                    // Check which player has won.
                    if (player === player1) {
                        // If they have, load the win screen.
                        $( 'body' ).html(
                            `<div style="background-color: orange;" class="screen screen-win screen-win-one" id="finish">
                                <header>
                                    <h1>Tic Tac Toe</h1>
                                    <p class="message">${playerName} wins!</p>
                                    <a href="index.html" id="start" class="button">New game</a>
                                </header>
                            </div>`
                        );
                        return;
                    } else {
                        $( 'body' ).html(
                            `<div class="screen screen-win screen-win-two" id="finish">
                                <header>
                                    <h1>Tic Tac Toe</h1>
                                    <p class="message">You lose.</p>
                                    <a href="index.html" id="start" class="button">New game</a>
                                </header>
                            </div>`
                        );
                        return;
                    }
                }
                // Check if the game is a draw.
                if (isDraw()) {
                    // If it is, load the draw screen.
                    $( 'body' ).html(
                        `<div class="screen screen-win screen-win-tie" id="finish">
                            <header>
                                <h1>Tic Tac Toe</h1>
                                <p class="message">It's a Tie.</p>
                                <a href="index.html" class="button">New game</a>
                            </header>
                        </div>`
                    );
                    return;
                }
            }
        });
    });
});