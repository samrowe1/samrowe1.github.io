const crosswordContainer = document.getElementById('crossword-container');
const acrossClues = document.getElementById('across-clues');
const downClues = document.getElementById('down-clues');

// Sample Crossword Data
const crossword = {
    grid: [
        ["H", "E", "L", "L", "O", null, null, null, null, null],
        [null, null, null, "O", null, null, null, null, null, null],
        ["W", "O", "R", "L", "D", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
    ],
    clues: {
        across: [
            { number: 1, clue: "Greeting (5)" },
            { number: 2, clue: "Planet (5)" },
        ],
        down: [
            { number: 1, clue: "Opposite of goodbye (5)" },
        ]
    }
};

// Populate Crossword Grid
function renderGrid() {
    crossword.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            if (cell) {
                cellDiv.contentEditable = true;
            } else {
                cellDiv.style.backgroundColor = "#eee";
            }
            crosswordContainer.appendChild(cellDiv);
        });
    });
}

// Populate Clues
function renderClues() {
    crossword.clues.across.forEach(clue => {
        const listItem = document.createElement('li');
        listItem.textContent = `${clue.number}. ${clue.clue}`;
        acrossClues.appendChild(listItem);
    });

    crossword.clues.down.forEach(clue => {
        const listItem = document.createElement('li');
        listItem.textContent = `${clue.number}. ${clue.clue}`;
        downClues.appendChild(listItem);
    });
}

// Initialize
renderGrid();
renderClues();
