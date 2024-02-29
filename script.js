let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle";

function init() {
    render();
    currentPlayerCard();
}

function render() {
    const contentDiv = document.getElementById("content");
    let tableHtml = '<table id="table">';
    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHtml += `<td onclick="handleClick(${index}, this)"></td>`;
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";
    contentDiv.innerHTML = tableHtml;
}

function currentPlayerCard() {
    document.getElementById("currentPlayerCircle").innerHTML =
        generateCircleSVG();
    document.getElementById("currentPlayerCross").innerHTML =
        generateCrossSVG();
    if (currentPlayer == "circle") {
        document.getElementById("currentPlayerCircle").classList.add("active");
        document
            .getElementById("currentPlayerCross")
            .classList.remove("active");
    } else {
        document
            .getElementById("currentPlayerCircle")
            .classList.remove("active");
        document.getElementById("currentPlayerCross").classList.add("active");
    }
}

function neustartSpiel() {
    fields = [null, null, null, null, null, null, null, null, null];
    render();
}

function generateCircleSVG() {
    const circleColor = "#00B0EF";
    const width = 70;
    const height = 70;

    // Verringern des Radius um die Hälfte der Strichdicke, um sicherzustellen, dass der Kreis vollständig geschlossen ist
    const radius = width / 2 - 3;
    const svgCode = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <circle cx="${width / 2}" cy="${
        height / 2
    }" r="${radius}" fill="none" stroke="${circleColor}" stroke-width="4" stroke-linecap="round">
    <animate attributeName="r" from="0" to="${radius}" dur="200ms" fill="freeze" />
    <animate attributeName="stroke-dasharray" values="0 1000;200 1000" dur="200ms" fill="freeze" />
  </circle>
</svg>
`;
    return svgCode;
}

function generateCrossSVG() {
    const crossColor = "#FFC000";
    const width = 70;
    const height = 70;

    const svgCode = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="10" x2="60" y2="60" stroke="${crossColor}" stroke-width="4">
          <animate attributeName="x2" from="10" to="60" dur="200ms" fill="freeze" />
          <animate attributeName="y2" from="10" to="60" dur="200ms" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="${crossColor}" stroke-width="4">
          <animate attributeName="x2" from="60" to="10" dur="200ms" fill="freeze" />
          <animate attributeName="y2" from="10" to="60" dur="200ms" fill="freeze" />
        </line>
      </svg>
    `;

    return svgCode;
}

// Funktion, um zu überprüfen, ob das Spiel vorbei ist
function isGameOver() {
    const winningCombinations = [
        // Horizontale Gewinnkombinationen
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertikale Gewinnkombinationen
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonale Gewinnkombinationen
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return {isOver: true, combination: combination};
        }
    }

    // Überprüfen, ob es noch leere Felder gibt
    if (fields.includes(null)) {
        return {isOver: false};
    } else {
        return {isOver: true, isDraw: true}; // Unentschieden
    }
}

function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const tdElements = document.querySelectorAll("td");
    let contentDiv = document.getElementById("table");
    // Positionen der beteiligten td-Elemente
    const positions = [a, b, c];

    // Canvas-Element erstellen
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = contentDiv.offsetWidth;
    canvas.height = contentDiv.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.left = contentDiv.offsetLeft + "px";
    canvas.style.top = contentDiv.offsetTop + "px";

    // Canvas-Element zum "content"-Container hinzufügen
    contentDiv.appendChild(canvas);

    // Linie zwischen den beteiligten td-Elementen zeichnen
    ctx.beginPath();
    ctx.moveTo(
        tdElements[positions[0]].offsetLeft +
            tdElements[positions[0]].offsetWidth / 2,
        tdElements[positions[0]].offsetTop +
            tdElements[positions[0]].offsetHeight / 2
    );
    ctx.lineTo(
        tdElements[positions[1]].offsetLeft +
            tdElements[positions[1]].offsetWidth / 2,
        tdElements[positions[1]].offsetTop +
            tdElements[positions[1]].offsetHeight / 2
    );
    ctx.lineTo(
        tdElements[positions[2]].offsetLeft +
            tdElements[positions[2]].offsetWidth / 2,
        tdElements[positions[2]].offsetTop +
            tdElements[positions[2]].offsetHeight / 2
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();
}

// Funktion, um das Spiel zu aktualisieren und die Gewinnlinie zu zeichnen, falls das Spiel vorbei ist
function handleClick(index, tdElement) {
    if (!isGameOver().isOver && !fields[index]) {
        fields[index] = currentPlayer;
        if (currentPlayer === "circle") {
            tdElement.innerHTML = generateCircleSVG();
            currentPlayer = "cross";
        } else {
            tdElement.innerHTML = generateCrossSVG();
            currentPlayer = "circle";
        }
        tdElement.removeAttribute("onclick");

        const gameStatus = isGameOver();
        if (gameStatus.isOver) {
            if (gameStatus.isDraw) {
                console.log("Unentschieden!");
            } else {
                console.log("Spiel beendet! Gewinner: " + currentPlayer);
                drawWinningLine(gameStatus.combination);
            }
        }
    }
    currentPlayerCard();
}
