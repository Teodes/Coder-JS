let cuantosVasos;
let tamañoVasos;
let cocktailList = [];

class cocktail {
  constructor(nombre, ingredientes, proporcion, unidad) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.proporcion = proporcion;
    this.unidad = unidad;
  }
}

function addCocktail(nombre, ingredientes, proporcion, unidad) {
  cocktailList.push(new cocktail(nombre, ingredientes, proporcion, unidad));
}

function glassQuantity() {
  cuantosVasos = parseInt(
    prompt("Ingrese la cantidad de vasos que desea preparar.")
  );
  while (isNaN(cuantosVasos) || cuantosVasos <= 0) {
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

function cantBotellas(bebida, numIngr) {
  let amountPerGlass;
  switch (bebida.unidad.toLowerCase()) {
    case "oz":
      amountPerGlass = bebida.proporcion[i] * 30;
      break;
    case "ml":
      amountPerGlass = bebida.proporcion[i];
      break;
    case "porcentaje":
      amountPerGlass = (tamañoVasos * bebida.proporcion[numIngr]) / 100;
      break;
    default:
      alert(
        "Lo sentimos mucho, ha habido un error de nuestra parte, intenta con otra bebida."
      );
      break;
  }
  return Math.ceil(
    (amountPerGlass * cuantosVasos) /
      bottleCapacity(bebida.ingredientes[numIngr])
  );
}

function bottleCapacity(ingr) {
  let capacidad = parseInt(
    prompt(
      `Ingrese la capacidad de la botella de ${ingr} en ml (Solo el número).`
    )
  );
  return capacidad;
}

function pickDrink() {
  let msg = prompt(
    "¿Qué bebida prepará?\n-Destornillador\n-Fernet\n-Campari"
  ).toLowerCase();
  for (let i = 0; i < cocktailList.length; i++) {
    if (cocktailList[i].nombre.toLowerCase() == msg) {
      return cocktailList[i];
    }
  }

  alert("Por favor seleccione una bebida de la lista.");
  return pickDrink();
}

addCocktail(
  "Destornillador",
  ["Vodka", "Jugo de Naranja"],
  [66.67, 33.3],
  "porcentaje"
);
addCocktail("Fernet", ["Fernet", "Coca-Cola"], [30, 70], "porcentaje");
addCocktail("Campari", ["Campari", "Jugo de Naranja"], [50, 50], "porcentaje");

alert("Bienvenido a la calculadora de cantidades para Bares.");
const bebida = pickDrink();
cuantosVasos = glassQuantity();
tamañoVasos = glassSize();

let resultado = `Para preparar ${cuantosVasos} vasos de ${tamañoVasos}ml de ${bebida.nombre} necesitaras la siguiente cantidad de botellas: `;

for (let i = 0; i < bebida.ingredientes.length; i++) {
  resultado = `${resultado}\n${bebida.ingredientes[i]}: ${cantBotellas(
    bebida,
    i
  )} botella/as.`;
}
alert(resultado);
