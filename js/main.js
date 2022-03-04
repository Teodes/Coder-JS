/*TODO: En un futuro añadir la posibilidad de elegir entre vasos descartables o cristaleria para cocteleria
(actualmente solo esta disponible la cristaleria)

Ademas se deben añadir las instrucciones para la preparacion de cada trago.*/

let cuantosVasos;
let tamañoVasos;
let cocktailList = [];
let glassList = [];

//TODO: Crear clase ingredientes.
/*De momento se usaran arrays para realizar las comprobaciones,
  pero luego se utilizará una clase para definir si cada ingrediente es
  una bebida, jugo exprimido de fruta u otro tipo de ingrediente.*/

let botellas = [
  ["Vodka", 750],
  ["Licor de Café", 750],
  ["Jugo de Tomate", 1000],
  ["Cointreau", 700],
  ["Jugo de Arándano", 1500],
  ["Ron Blanco", 750],
  ["Cola", 2500],
  ["Tequila", 750],
  ["Triple Sec", 750],
  ["Ginebra", 750],
  ["Champagne", 750],
  ["Soda", 2000],
  ["Jugo de Naranja", 3000],
];

class Cocktail {
  constructor(nombre, ingredientes, proporcion, unidad, tamaño) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.proporcion = proporcion;
    this.unidad = unidad;
    this.tamaño = tamaño;
  }
}

class Glass {
  constructor(nombre, capacidad) {
    this.nombre = nombre;
    this.capacidad = capacidad;
  }
}

function addGlass(nombre, capacidad) {
  glassList.push(new Glass(nombre, capacidad));
}

function addCocktail(nombre, ingredientes, cantidad, vaso) {
  let propArray = [];
  let unitArray = [];
  let prop = "";
  let unit = "";
  for (let i = 0; i < cantidad.length; i++) {
    for (let j = 0; j < cantidad[i].length; j++) {
      if (!isNaN(parseInt(cantidad[i][j]))) {
        prop = prop + cantidad[i][j];
      } else if (
        !isNaN(parseInt(cantidad[i][j - 1])) &&
        cantidad[i][j] == " "
      ) {
        continue;
      } else {
        unit = unit + cantidad[i][j];
      }
    }
    propArray.push(prop);
    prop = "";
    unitArray.push(unit);
    unit = "";
  }

  const tamaño = glassList.find((el) => el.nombre == vaso);

  cocktailList.push(
    new Cocktail(nombre, ingredientes, propArray, unitArray, tamaño.capacidad)
  );
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

//?El parseInt() funciona correctamente a pesar de darle como parametro un string con palabras.
//?Ej: parseInt("15ml") da como output 15.

function cantBotellas(bebida, numIngr) {
  let amountPerGlass = parseInt(bebida.proporcion[numIngr]);
  return Math.ceil(
    (amountPerGlass * cuantosVasos) /
      bottleCapacity(bebida.ingredientes[numIngr])
  );
}

//TODO: Esto debera ser modificado una vez que se implemente la clase ingredientes.
function bottleCapacity(ingr) {
  for (let i = 0; i < botellas.length; i++) {
    if (botellas[i][0] == ingr) {
      return parseInt(botellas[i][1]);
    }
  }
}

function pickDrink() {
  cocktailList.sort((a, b) => {
    if (a.nombre < b.nombre) {
      return -1;
    }
    if (a.nombre > b.nombre) {
      return 1;
    }
    return 0;
  });
  let msg = prompt(`¿Qué bebida preparará?${listofDrinks()}`).toLowerCase();
  for (let i = 0; i < cocktailList.length; i++) {
    if (cocktailList[i].nombre.toLowerCase() == msg) {
      return cocktailList[i];
    }
  }
  alert("Por favor seleccione una bebida de la lista.");
  return pickDrink();
}

function listofDrinks() {
  let list = "";
  for (let i = 0; i < cocktailList.length; i++) {
    list = `${list}\n-${cocktailList[i].nombre}`;
  }
  return list;
}

addGlass("Old Fashion", "250ml");
addGlass("Highball", "300ml");
addGlass("Copa Cóctel", "180ml");
addGlass("Copa Margarita", "250ml");
addGlass("Copa Flauta", "180ml");
addGlass("Copa Hurricane", "400ml");

addCocktail(
  "Ruso Negro",
  ["Vodka", "Licor de Café"],
  ["50ml", "20ml"],
  "Old Fashion"
);
addCocktail(
  "Bloody Mary",
  ["Vodka", "Jugo de Tomate", "Jugo de Limón", "Salsa Inglesa"],
  ["45ml", "90ml", "15ml", "2 dashes"],
  "Highball"
);
addCocktail(
  "Cosmopolitan",
  ["Vodka", "Cointreau", "Jugo de Limón", "Jugo de Arándano"],
  ["40ml", "15ml", "15ml", "30ml"],
  "Copa Cóctel"
);
addCocktail(
  "Cuba Libre",
  ["Ron Blanco", "Cola", "Jugo de Limón"],
  ["50ml", "120ml", "10ml"],
  "Highball"
);
addCocktail(
  "Long Island Iced Tea",
  [
    "Tequila",
    "Vodka",
    "Ron Blanco",
    "Triple Sec",
    "Ginebra",
    "Jugo de Limón",
    "Almíbar Simple",
    "Cola",
  ],
  ["15ml", "15ml", "15ml", "15ml", "15ml", "25ml", "30ml", "1 pizca"],
  "Highball"
);
addCocktail(
  "Margarita",
  ["Tequila", "Cointreau", "Jugo de Limón"],
  ["35ml", "20ml", "15ml"],
  "Copa Margarita"
);
addCocktail(
  "Mimosa",
  ["Champagne", "Jugo de Naranja"],
  ["75ml", "75ml"],
  "Copa Flauta"
);
//TODO: Añadir cantidad "Completar".
addCocktail(
  "Mojito",
  ["Ron Blanco", "Jugo de Limón", "Almíbar Simple", "Hojas de Menta", "Soda"],
  ["40ml", "15ml", "30ml", "6 hojas", "Completar"],
  "Highball"
);
addCocktail(
  "Piña Colada",
  ["Ron Blanco", "Jugo de Ananá", "Leche de Coco"],
  ["30ml", "90ml", "30ml"],
  "Copa Hurricane"
);
addCocktail(
  "Sex on the Beach",
  ["Vodka", "Licor de Durazno", "Jugo de Arándano", "Jugo de Naranja"],
  ["40ml", "20ml", "40ml", "40ml"],
  "Highball"
);
addCocktail(
  "Tequila Sunrise",
  ["Tequila", "Jugo de Naranja", "Granadina"],
  ["45ml", "90ml", "15ml"],
  "Highball"
);

alert("Bienvenido a la calculadora de cantidades para Bares.");
const bebida = pickDrink();
cuantosVasos = glassQuantity();

let resultado = document.createElement("h3");
resultado.innerHTML = `Para preparar ${cuantosVasos} vasos de ${bebida.tamaño} de ${bebida.nombre} necesitaras la siguiente cantidad de ingredientes:`;
document.querySelector(".resultado").appendChild(resultado);

let testing = document.querySelector(".ingredientes");

for (let i = 0; i < bebida.ingredientes.length; i++) {
  for (let j = 0; j < botellas.length; j++) {
    if (botellas[j][0] == bebida.ingredientes[i]) {
      let drink = document.createElement("li");
      drink.innerHTML = `<p>-${bebida.ingredientes[i]}: ${cantBotellas(
        bebida,
        i
      )} botella/as.</p>`;
      testing.appendChild(drink);
    }
    //TODO: Implementar demas ingredientes que no vienen en botella.
  }
}
