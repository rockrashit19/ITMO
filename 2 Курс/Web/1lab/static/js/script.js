function validateInput(value, fieldName, lowLimit, highLimit) {
  if (value === "" || value === null || value === undefined) {
    alert(`${fieldName} cannot be empty`);
    return false;
  }

  const num = Number(value);

  if (isNaN(num)) {
    alert(`${fieldName} must be a valid number`);
    return false;
  }

  if (num < lowLimit || num > highLimit) {
    alert(`${fieldName} must be between ${lowLimit} and ${highLimit}`);
    return false;
  }

  if (!Number.isInteger(num)) {
    alert(`${fieldName} must be an integer`);
    return false;
  }

  return true;
}

function submitForm() {
  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;
  const r = document.getElementById("r").value;

  if (!validateInput(x, "X", -3, 3)) return;
  if (!validateInput(y, "Y", -3, 5)) return;
  if (!validateInput(r, "R", 1, 5)) return;

  //AJAX request
  const url = `http://localhost:9000/check?x=${x}&y=${y}&r=${r}`;
  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        updateTable(data.results);
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

function updateTable(results) {
  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${result.x}</td>
                <td>${result.y}</td>
                <td>${result.r}</td>
                <td>${result.inArea ? "Yes" : "No"}</td>
                <td>${result.time}</td>
                <td>${result.executionTime}</td>
            `;
    tbody.appendChild(row);
  });
}
