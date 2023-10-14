let row1 = document.querySelectorAll(".row1");
let row2 = document.querySelectorAll(".row2");
let row3 = document.querySelectorAll(".row3");
let turn1 = document.querySelector(".turns");
let winner1 = document.querySelector(".winner");
let container = document.querySelectorAll(".game");

let rows = [row1, row2, row3];

let Player2 = "O";
let Player1 = "X";
let turn = "X";
let game = true;
let gameboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const coordinates = (first, second) => {
    let coordinate = rows[first][second];
    let x = (gameboard[first][second] = `${turn}`);
    let winner = whowinner(x);
    draw(coordinate, x, winner);
    gameloop(winner);
};

const draw = (coordinate, x) => {
    let allowed =
        coordinate.classList[1] == "not-allowed"
            ? null
            : (coordinate.innerHTML = turn);
    coordinate.classList.add("not-allowed");
    turns(allowed, x);
};

const turns = (allowed, x) => {
    turn = x == "X" ? Player2 : Player1;
    allowed != null ? (turn1.innerHTML = `${turn}'s turn`) : null;
    return turn;
};

const whowinner = (x) => {
    for (let i in gameboard) {
        if (
            gameboard[i][0] == x &&
            gameboard[i][1] == x &&
            gameboard[i][2] == x
        ) {
            return `Winner ${x}`;
        } else if (
            gameboard[0][i] == x &&
            gameboard[1][i] == x &&
            gameboard[2][i] == x
        ) {
            return `Winner ${x}`;
        } else if (
            (gameboard[0][0] == x &&
                gameboard[1][1] == x &&
                gameboard[2][2] == x) ||
            (gameboard[0][2] == x &&
                gameboard[1][1] == x &&
                gameboard[2][0] == x)
        ) {
            return `Winner ${x}`;
        }
    }
};
const gameloop = (winner) => {
    game = winner != undefined ? false : true;
    container.forEach((e) => {
        if (game == false) {
            e.style.visibility = "hidden";
            winner1.classList.add("active");
            winner1.innerHTML = `${winner}`;
        } else {
            e.style.visibility = "visible";
            winner1.classList.remove("active");
            winner1.innerHTML != `${winner}`;
        }
    });
};
const resetgame = () => {
    game = true;
    turn = "X";
    gameboard = gameboard.map((e) => (gameboard[e] = [0, 0, 0]));
    rows.map((e) => {
        for (i of e) {
            i.classList.remove("not-allowed");
            i.innerHTML = "";
        }
    });
    turn1.innerHTML = `${turn}'s turn`;
    gameloop();
};
