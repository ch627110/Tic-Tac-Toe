const Player = (marker, name) => {
    return { marker, name }
}

const players = (function() {
    // ask for player names
    const player1 = Player('X', 'Chris')
    const player2 = Player('O', 'Kris') 
    let curr_player = player1;
    const toggle_player = () => {
        curr_player = curr_player == player1 ?  player2 :  player1
    }
    return { 
        player1, player2, toggle_player, 
        get curr_player() {
            return curr_player
        } 
    } 
})()

const gameboard = (function() {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    const default_board = document.getElementById('container').innerHTML
    return { board, default_board }
})()

function insert (player, row, col) {
    if(gameboard.board[row][col] != '' && !isGameOver()) {
        console.log('That spot is taken. Try again.')
    } else if (isGameOver()) {
        return
    } else {
        gameboard.board[row][col] = player.marker
        displayController.updateDisplay()
    }
}

function insertOnClick() {
    
}

function rowWin() {
    const board = gameboard.board
    for(let i = 0; i < 3; i++) {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            if(board[i][0] == '') {
                continue
            }
            console.log('A row win has been detected.')
            return true
        }
    }
    return false
}

function colWin() {
    const board = gameboard.board
    for(let i = 0; i < 3; i++) {
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            if(board[0][i] == '') {
                continue
            }
            console.log('A column win has been detected.')
            return true
        }
    }
    return false
}

function diagWin() {
    const board = gameboard.board
    if((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
        if(board[0][0] == '') {
            return false
        }
        console.log('A diagonal win has been detected.')
        return true
    } else if((board[2][0] == board[1][1]) && (board[1][1] == board[0][2])) {
        if(board[2][0] == '') {
            return false
        }
        console.log('A diagonal win has been detected.')
        return true
    } else {
        return false
    }
}

function boardStatus() {
    let containEmpty = false
    let containMarker = false
    for(let i = 0; i < 3; i++) {
        if(gameboard.board[i].includes('')) {
            containEmpty = true
            break
        }
    }
    for(let i = 0; i < 3; i++) {
        if(gameboard.board[i].includes(players.player1.marker) || 
        gameboard.board[i].includes(players.player2.marker)) {
            containMarker = true
            break
        }
    }    
    if(containEmpty && !containMarker) {
        console.log('The gameboard is clear.')
        return 'not started'
    } else if (!containEmpty && containMarker) {
        console.log('The gameboard is full. No winners.')
        return 'board full'
    } else if (colWin() || rowWin() || diagWin()){
        console.log('A winner has been detected.')
        return
    } else { // containEmpty && containMarker
        console.log('The gameboard is not clear or full.')
        return 'in progress'
    }
}

function isGameOver() {
    if(colWin() || rowWin() || diagWin() || boardStatus() == 'board full') {
        console.log('The game is now over.')
        console.log(JSON.parse(JSON.stringify(gameboard.board)))
        return true
    }
    return false
}

const displayController = (function() {
    const board = document.querySelector('#container')
    const updateDisplay = () => {
        board.innerHTML = gameboard.default_board
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                const box = document.createElement('div')
                box.textContent = gameboard.board[row][col]
                board.appendChild(box)
            }
        }
    }
    return { updateDisplay }
})()

const game = (function() {    
    // loop until the game is over
    displayController.updateDisplay()
})()