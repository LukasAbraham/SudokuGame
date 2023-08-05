var numSelected = null;
var titleSelected = null;
var numFilledCells = 0;
var timerID;
var errors = 0;

const board = generateUniqueSudoku();
console.log(checkValidSudoku(board));

console.table(board);

solutions = [];
solveSudoku(board, 0, 0);
// check if the generated sudoku table has unique solution
console.log(solutions.length);

var solution = solutions[0];
console.table(solution);

window.onload = function() {
    var duration = 60 * 20;
    var display = document.querySelector('#timer');
    timerID = startTimer(duration, display);
    setGame();
}

function startTimer(duration, display) {
    var timer = duration;
    return setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            determineResult(0);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerID);
}

function determineResult(choice) {
    stopTimer();
    const displayResult = document.querySelector('#displayResult');
    displayResult.style.display = 'flex';
    displayResult.style.color = choice ? "#d4af37" : "#a45ee9";
    displayResult.innerHTML = choice ? "You win" : "You lose";
    let div = document.createElement("div");
    displayResult.appendChild(div);
    let buttons = document.querySelector('#displayResult div');
    let button1 = document.createElement("button");
    button1.innerText = "New Game";
    buttons.appendChild(button1);
    let button2 = document.createElement("button");
    button2.innerText = "Try Again";
    buttons.appendChild(button2);
    button1.addEventListener("click", function() {
        location.reload();
    });
    button2.addEventListener("click", function() {
        displayResult.style.display = 'none';
        var duration = 60 * 20;
        var display = document.querySelector('#timer');
        startTimer(duration, display);
        errors = 0;
        document.getElementById("errors").innerText = "Errors: " + errors;
        var tiles = document.getElementsByClassName("tile")
        for(let i = 0; i < tiles.length; i++) {
            if(tiles[i].innerText != 0) {
                numFilledCells--;
            }
            tiles[i].innerText = "";
        }
    });
}


function setGame() {
    // Digits 1-9
    for(let i = 1; i <= 9; i++) {
        let number = document.createElement("button");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for(let r = 0; r < 9; r++) {
        for(let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if(r == 0) {
                tile.classList.add("top-line")
            } else if(r == 2 || r == 5 || r == 8) {
                tile.classList.add("bottom-line");
            }
            if(c == 0) {
                tile.classList.add("left-line")
            } else if(c == 2 || c == 5 || c == 8) {
                tile.classList.add("right-line");
            }

            if(board[r][c] != 0) {
                tile.innerText = board[r][c];
                numFilledCells++;
                tile.classList.add("tile-start");
            } else {
                tile.classList.add("tile");
            }

            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
        }
    }
}

function selectTile() {
    if(numSelected) {
        if(this.innerText != "")
            return;
        
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if(solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            numFilledCells++;
            if(numFilledCells === 81) {
                determineResult(1);
            }
        } else {
            errors += 1;
            document.getElementById("errors").innerText = "Errors: " + errors;
            this.classList.add("tile-false");
            setTimeout(() => {
                this.classList.remove("tile-false");
            }, 500);
            setTimeout(() => {
                if(errors > 3) {
                    determineResult(0);
                }
            }, 500);
        }
    }
}

function selectNumber() {
    if(numSelected != null) {
        numSelected.classList.remove("number-selected")
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
