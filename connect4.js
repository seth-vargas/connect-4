/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

const currentPlayerElement = document.getElementById("currentPlayer");

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const board = document.getElementById("board");

  // TODO: add comment for this code

  const top = document.createElement("tr"); // Creating the top row where we can drop pieces
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); // Adding an event listener to listen out for clicks on the top row
  currentPlayerElement.classList.add("player1");

  // for loop that creates each cell in the top column. and provides an ID that is dynamically created
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  board.append(top); // appeniding the top row to the board element

  // TODO: add comment for this code
  // Creating rows dynamically using a for loop
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // nested for loop creates the cells in each level of the y loop
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // dynamically create a unique (x, y) pair of coordinates
      cell.setAttribute("id", `${x}, ${y}`);
      row.append(cell);
    }
    // append each row as it is finished being created
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newPiece = document.createElement("div");
  newPiece.classList.add("piece", `player${currPlayer}`);

  const currentSpot = document.getElementById(`${x}, ${y}`);
  currentSpot.append(newPiece);
}

/** endGame: announce game end */

const endGame = (msg) => alert(msg);

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked top row cell
  const x = parseInt(evt.target.id);

  // get next spot in column (if the column is full, then we ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer = currPlayer === 1 ? 2 : 1;
  currentPlayerElement.innerText =
    currentPlayerElement.innerHTML === "Blue" ? "Red" : "Blue";
  currentPlayerElement.classList.toggle("player2");
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four (x, y) cells to see if they're all color of current player

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
