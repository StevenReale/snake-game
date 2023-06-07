/**
*    Code adapted from a lesson/presentation by 
*    Michael Lambert (linkedin.com/in/michael-lambert-5714044)
*/

const GAME_SPEED = 150;

let canvas;
let ctx;

let imgApple = new Image();
imgApple.src = 'assets/apple.png';

let imgSnake = new Image();
imgSnake.src = 'assets/snake.png';

let imgWall = new Image();
imgWall.src = 'assets/wall.png';

let imgBg1 = new Image();
imgBg1.src = 'assets/bg1.png';

let imgBg2 = new Image();
imgBg2.src = 'assets/bg2.png';


let keyState;
let gameState;

function gameInit() {
    keyState = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    }

    gameState = {
        level: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        apple: { x: 10, y: 10 },
        snake: [{ x: 1, y: 1 }],
        direction: 'down',
        score: 0,
        titleScreen: true,
        previousScore: 0,
        bgFrame: 0
    }
}


/**
 * Runs when the game is loaded
 **/
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    gameInit();
    draw();
    update();
});


addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        keyState.left = true;
    }
    if (event.key === 'ArrowRight') {
        keyState.right = true;
    }
    if (event.key === 'ArrowUp') {
        keyState.up = true;
    }
    if (event.key === 'ArrowDown') {
        keyState.down = true;
    }
    if (event.key === ' ') {
        keyState.space = true;
    }
});

addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keyState.left = false;
    }
    if (event.key === 'ArrowRight') {
        keyState.right = false;
    }
    if (event.key === 'ArrowUp') {
        keyState.up = false;
    }
    if (event.key === 'ArrowDown') {
        keyState.down = false;
    }
    if (event.key === ' ') {
        keyState.space = false;
    }
});

/**
 * Runs on intervals set by GAME_SPEED and updates when game starts
 */
function update() {

    gameState.bgFrame += 1;
    if (gameState.bgFrame == 6) {
        gameState.bgFrame = 0;
    }

    if (gameState.titleScreen) {
        if (keyState.space) {
            gameState.titleScreen = false;
        }
        setTimeout(update, GAME_SPEED);
        return;
    }

    //update snake direction based on key state
    if (keyState.left && gameState.direction != 'right') {
        gameState.direction = 'left';
    }

    if (keyState.right && gameState.direction != 'left') {
        gameState.direction = 'right';
    }

    if (keyState.up && gameState.direction != 'down') {
        gameState.direction = 'up';
    }

    if (keyState.down && gameState.direction != 'up') {
        gameState.direction = 'down';
    }

    //update all snake positions
    let prevLoc = { x: gameState.snake[0].x, y: gameState.snake[0].y };
    let nextLoc = { x: prevLoc.x, y: prevLoc.y };

    let lastNode = gameState.snake.length - 1;
    if (gameState.direction == 'left') {
        nextLoc.x -= 1;
    } else if (gameState.direction == 'right') {
        nextLoc.x += 1;
    } else if (gameState.direction == 'up') {
        nextLoc.y -= 1;
    } else if (gameState.direction == 'down') {
        nextLoc.y += 1;
    }

    gameState.snake[lastNode].x = nextLoc.x;
    gameState.snake[lastNode].y = nextLoc.y;

    gameState.snake.unshift(gameState.snake.pop());

    // for (let i = 1; i < gameState.snake.length; i++) {
    //     let temp = { x: gameState.snake[i].x, y: gameState.snake[i].y };
    //     gameState.snake[i].x = prevLoc.x;
    //     gameState.snake[i].y = prevLoc.y;
    //     prevLoc = temp;
    // }

    //check if the snake has eaten an apple
    if (gameState.snake[0].x == gameState.apple.x && gameState.snake[0].y == gameState.apple.y) {
        gameState.snake.push({ x: prevLoc.x, y: prevLoc.y });

        do {
            gameState.apple.x = Math.floor(Math.random() * 40);
            gameState.apple.y = Math.floor(Math.random() * 40);
        } while (gameState.level[gameState.apple.y][gameState.apple.x] === 1);
        gameState.score += 1;
    }

    //check if the snake has hit a wall
    if (gameState.level[gameState.snake[0].y][gameState.snake[0].x] == 1) {
        gameOver();
    }

    //check if the snake has hit itself
    for (let i = 1; i < gameState.snake.length; i++) {
        if (gameState.snake[0].x == gameState.snake[i].x && gameState.snake[0].y == gameState.snake[i].y) {
            gameOver();
            break;
        }
    }

    setTimeout(update, GAME_SPEED);
}


/**
 * Draws the game state to the canvas
 */
function draw() {


    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState.titleScreen) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('SNAKE GAME', 290, 300);
        ctx.fillText('Press Space to Start', 250, 400);
        if (gameState.previousScore > 0) {
            ctx.fillText(`Previous Score: ${gameState.previousScore}`, 250, 500);
        }
        requestAnimationFrame(draw);
        return;
    }


    if (gameState.bgFrame < 3) {
        ctx.drawImage(imgBg1, 0, 0);
    } else {
        ctx.drawImage(imgBg2, 0, 0);
    }
    ctx.drawImage(imgApple, gameState.apple.x * 20, gameState.apple.y * 20);
    for (let i = 0; i < gameState.snake.length; i++) {
        ctx.drawImage(imgSnake, gameState.snake[i].x * 20, gameState.snake[i].y * 20);
    }

    for (let x = 0; x < 40; x++) {
        for (let y = 0; y < 40; y++) {
            if (gameState.level[y][x] === 1) {
                ctx.drawImage(imgWall, 20 * x, 20 * y);
            }
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${gameState.score}`, 600, 50);

    requestAnimationFrame(draw);
}

function gameOver() {
    let prev = gameState.score;
    gameInit();
    gameState.previousScore = prev;
}
