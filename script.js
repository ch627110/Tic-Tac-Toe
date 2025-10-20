const Player = (marker, name) => {
    return { marker, name }
}

const gameboard = (function() {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    const insert = (player, row, col) => {
        if(board[row][col] != '') {
            return 'Spot not empty'
        }
        board[row][col] = player.marker
    }
    return { board, insert }
})()

const game = (function() {
    const player1 = Player('X', 'Chris')
    const player2 = Player('O', 'Kris')

    do {
        gameboard.insert(player1, 2, 0)
        gameboard.insert(player1, 1, 1)
        gameboard.insert(player1, 0, 2)
                
    } while (checkForEnding())
        
    return { player1, player2 }
})()

const displayController = (function() {

})()

function checkForEnding() {
    let board = gameboard.board
    

}

function rowWin() {
    let board = gameboard.board
    for(let i = 0; i < 3; i++) {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            if(board[i][0] == '') {
                continue
            }
            return true
        }
    }
    return false
}

function colWin() {
    let board = gameboard.board
    for(let i = 0; i < 3; i++) {
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            if(board[0][i] == '') {
                continue
            }
            return true
        }
    }
    return false
}

function diagWin() {
    let board = gameboard.board
    if((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
        if(board[0][0] == '') {
            return false
        }
        return true
    } else if((board[2][0] == board[1][1]) && (board[1][1] == board[0][2])) {
        if(board[2][0] == '') {
            return false
        }
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
        if(gameboard.board[i].includes(game.player1.marker) || 
        gameboard.board[i].includes(game.player2.marker)) {
            containMarker = true
            break
        }
    }    
    if(containEmpty && !containMarker) {
        return 'not started'
    } else if (!containEmpty && containMarker) {
        return 'board full'
    } else { // !containEmpty && !containMarker
        return 'in progress'
    }
}