var numSelected = null;
var titleSelected = null;

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
    setGame();
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
        } else {
            errors += 1;
            document.getElementById("errors").innerText = "Errors: " + errors;
            this.classList.add("tile-false");
            setTimeout(() => {
                this.classList.remove("tile-false");
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
