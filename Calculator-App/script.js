const historyEl = document.getElementById("history");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operation = null;

function updateDisplay() {
  resultEl.textContent = current || "0";
  historyEl.textContent = previous + (operation ? ` ${operation}` : "");
}

function appendNumber(num) {
  if (num === "." && current.includes(".")) return;
  current += num;
}

function chooseOperation(op) {
  if (current === "") return;
  if (previous !== "") {
    compute();
  }
  operation = op;
  previous = current;
  current = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }
  current = computation.toString();
  operation = null;
  previous = "";
}

function clearAll() {
  current = "";
  previous = "";
  operation = null;
}

function backspace() {
  current = current.toString().slice(0, -1);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.getAttribute("data-value");
    const action = btn.getAttribute("data-action");

    if (val) {
      if (["+", "-", "*", "/"].includes(val)) {
        chooseOperation(val);
      } else {
        appendNumber(val);
      }
      updateDisplay();
    }

    if (action === "clear") {
      clearAll();
      updateDisplay();
    }
    if (action === "back") {
      backspace();
      updateDisplay();
    }
    if (action === "evaluate") {
      compute();
      updateDisplay();
    }
  });
});


document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    appendNumber(e.key);
    updateDisplay();
  }
  if (["+", "-", "*", "/"].includes(e.key)) {
    chooseOperation(e.key);
    updateDisplay();
  }
  if (e.key === "Enter" || e.key === "=") {
    compute();
    updateDisplay();
  }
  if (e.key === "Backspace") {
    backspace();
    updateDisplay();
  }
  if (e.key.toLowerCase() === "c") {
    clearAll();
    updateDisplay();
  }
});
