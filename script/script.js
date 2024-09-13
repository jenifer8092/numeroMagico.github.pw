// Variables iniciales
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 1;
const maxAttempts = 10;
let previousGuesses = [];
let resultsTable = Array(1).fill().map(() => Array(5).fill(null)); // Inicializa la tabla con valores null

// Elementos de la interfaz
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submitGuess');
const feedback = document.getElementById('feedback');
const remaining = document.getElementById('remaining');
const previousGuessesDisplay = document.getElementById('previousGuesses');
const restartButton = document.getElementById('restart');
const results = document.getElementById('results-container');

// Función para verificar el número ingresado
function checkGuess() {
  const guess = Number(guessInput.value);
  
  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = 'Por favor, ingresa un número válido entre 1 y 100.';
    return;
  }

  previousGuesses.push(guess);
  previousGuessesDisplay.textContent = previousGuesses.join(', ');

  if (guess === randomNumber) {
    feedback.textContent = '¡Felicidades! Adivinaste el número correcto.';
    endGame();
  } else if (attempts < maxAttempts) {
    feedback.textContent = guess < randomNumber ? 'El número es mayor.' : 'El número es menor.';
    attempts++;
    remaining.textContent = maxAttempts - attempts + 1;
  } else {
    feedback.textContent = `Has agotado tus intentos. El número correcto era ${randomNumber}.`;
    endGame();
  }

  guessInput.value = '';
}

// Función para manejar los resultados en la tabla
function tableResults(guess) {
  let alternNumber = 0;

  for(let i = 0; i < 1; i++) {
    for(let j = 0; j < 5; j++) {
      // Si el lugar está vacío, agregamos el número
      if (resultsTable[i][j] === null) {
        resultsTable[i][j] = guess;
        break;
      }
      // Si el número es mayor al existente, lo reemplazamos
      if (guess > resultsTable[i][j]) {
        alternNumber = resultsTable[i][j];
        resultsTable[i][j] = guess; 
        guess = alternNumber; // El número anterior sigue siendo candidato a ser comparado
      }
    }
  }

  console.log(resultsTable); // Solo para mostrar los resultados en la consola (puedes renderizar esto en la interfaz si lo deseas)
}

// Función para finalizar el juego
function endGame() {
  guessInput.disabled = true;
  submitButton.disabled = true;
  restartButton.style.display = 'block';
}

// Función para reiniciar el juego
function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 1;
  previousGuesses = [];
  guessInput.disabled = false;
  submitButton.disabled = false;
  feedback.textContent = '';
  remaining.textContent = maxAttempts;
  previousGuessesDisplay.textContent = '';
  guessInput.value = '';
  restartButton.style.display = 'none';
}

// Eventos
submitButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', restartGame);
