let fields = [null, null, "cross", "circle", null, null, null, null, null];

function init() {
    render();
}
function render() {
    const contentDiv = document.getElementById("content");
    let tableHtml = "<table>";
    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHtml += "<td>";
            if (fields[index] === "circle") {
                tableHtml += `<div class="circle">${generateCircleSVG()}</div>`;
            } else if (fields[index] === "cross") {
                tableHtml += `<div class="cross">${generateCrossSVG()}</div>`;
            }
            tableHtml += "</td>";
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";
    contentDiv.innerHTML = tableHtml;
}

// function generateCircleSVG() {
//     const circleColor = "#00B0EF";
//     const width = 70;
//     const height = 70;

//     const svgCode = `
//     <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="${width / 2}" cy="${height / 2}" r="${
//         width / 2 - 2
//     }" fill="none" stroke="${circleColor}" stroke-width="4">
//         <animate attributeName="r" from="0" to="${
//             width / 2 - 2
//         }" dur="200ms" fill="freeze" />
//         <animate attributeName="stroke-dasharray" values="0 1000;200 1000" dur="200ms" fill="freeze" />
//       </circle>
//     </svg>
//   `;

//     return svgCode;
// }

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
