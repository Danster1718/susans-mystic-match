let level = 1;
const maxLevels = 1000;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-level");
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");
const levelLabel = document.getElementById("level-label");
const grid = document.getElementById("grid");

startBtn.onclick = startGame;
nextBtn.onclick = nextLevel;

function startGame() {
    titleScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    loadLevel();
}

function nextLevel() {
    level++;
    if (level > maxLevels) level = 1;
    nextBtn.classList.add("hidden");
    loadLevel();
}

function loadLevel() {
    levelLabel.textContent = "Level " + level;
    grid.innerHTML = "";

    const symbols = ["✨", "🔮", "💎", "🌙", "⭐", "🔥"];
    let tiles = [];

    for (let i = 0; i < 36; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        tile.textContent = tile.dataset.symbol;

        tile.onclick = () => selectTile(tile);
        tiles.push(tile);
        grid.appendChild(tile);
    }
}

let firstTile = null;
function selectTile(tile) {
    if (tile.classList.contains("matched")) return;

    if (!firstTile) {
        firstTile = tile;
        tile.style.background = "#ffffff80";
    } else {
        if (firstTile.dataset.symbol === tile.dataset.symbol) {
            firstTile.classList.add("matched");
            tile.classList.add("matched");

            if (document.querySelectorAll(".matched").length === 36) {
                nextBtn.classList.remove("hidden");
            }
        } else {
            firstTile.style.background = "#ffffff30";
        }
        firstTile = null;
    }
}
