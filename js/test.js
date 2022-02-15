alert("Intenta adivinar el numero.");
let num;
let intentos = 1;
let cantidadPartidas;
let input;

cantidadPartidas = parseInt(prompt("Ingrese cuantas veces quiere jugar."));

for (i = 1; i <= cantidadPartidas; i++) {
  num = Math.floor(Math.random() * 100) + 1;

  input = prompt("Ronda " + i + ": Ingresa un numero entre 1 y 100");

  while (num != input) {
    if (input < num) {
      input = prompt("Intenta con un numero mas grande.");
    } else if (input > num) {
      input = prompt("Intenta con un numero mas pequeño.");
    }
    intentos++;
  }
  alert("Ronda finalizada.");
  alert(
    "Ronda " +
      i +
      ": Felicidades, lograste dar con el numero en " +
      intentos +
      " intentos."
  );
  intentos = 1;
}
