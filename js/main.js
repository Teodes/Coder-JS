let bebida;
let cuantosVasos;
let tamañoVasos;

alert("Bienvenido a la calculadora de cantidades para Bares.");

bebida = prompt("¿Qué bebida prepará?");
cuantosVasos = glassQuantity();
tamañoVasos = glassSize();
let resultado = `Para preparar ${cuantosVasos} vasos de ${tamañoVasos}ml de ${bebida} necesitaras la siguiente cantidad de botellas: `;

let cantIngredientes = parseInt(prompt("Ingrese la cantidad de ingredientes:"));
while (isNaN(cantIngredientes) || cantIngredientes < 0) {
  cantIngredientes = prompt(
    "Por favor, solo ingrese números enteros mayores a 0."
  );
}

for (let i = 1; i <= cantIngredientes; i++) {
  resultado = `${resultado}\n${prompt(
    "Nombre del ingrediente:"
  )}: ${cantBotellas(tamañoVasos)} botella/as.`;
}
alert(resultado);

function glassQuantity() {
  cuantosVasos = parseInt(
    prompt("Ingrese la cantidad de vasos que desea preparar.")
  );
  while (isNaN(cuantosVasos) || cuantosVasos < 0) {
    cuantosVasos = prompt(
      "Por favor, solo ingrese números enteros mayores a 0."
    );
  }
  return cuantosVasos;
}

function glassSize() {
  let capacidad = prompt(
    "Eliga el tamaño del vaso a usar.\na) 280 ml\nb) 500 ml\nc) 1000 ml"
  );
  switch (capacidad.toLowerCase()) {
    case "a": {
      return 280;
    }
    case "b": {
      return 500;
    }
    case "c": {
      return 1000;
    }
    default: {
      alert("El valor ingresado no es correcto.");
      return glassSize();
    }
  }
}

function cantBotellas(vasoML) {
  let unitIngredient = prompt("Unidad de medida: \n-OZ\n-ML\n-Porcentaje");
  let quantityIngredient = parseInt(
    prompt("¿Cuánta cantidad del ingrediente lleva?")
  );
  let amountPerGlass;
  if (unitIngredient.toLowerCase() == "oz") {
    amountPerGlass = quantityIngredient * 30;
  } else if (unitIngredient.toLowerCase() == "ml") {
    amountPerGlass = quantityIngredient;
  } else if (unitIngredient.toLowerCase() == "porcentaje") {
    amountPerGlass = (vasoML * quantityIngredient) / 100;
  } else {
    alert("Los datos ingresados no son correctos, intente de nuevo.");
    cantBotellas(vasoML);
  }

  return Math.ceil((amountPerGlass * cuantosVasos) / bottleCapacity());
}

function bottleCapacity() {
  let capacidad = parseInt(
    prompt("Ingrese la capacidad de la botella en ml (Solo el número).")
  );
  return capacidad;
}
