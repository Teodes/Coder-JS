/*TODO: En un futuro añadir la posibilidad de elegir entre vasos descartables o cristaleria para cocteleria
(actualmente solo esta disponible la cristaleria)

Ademas se deben añadir las instrucciones para la preparacion de cada trago.*/

let cuantosVasos;
let tamañoVasos;
let cocktailList = [];
let glassList = [];
let bottleList = [];

//TODO: Crear clase ingredientes.
/*De momento se usaran arrays para realizar las comprobaciones,
  pero luego se utilizará una clase para definir si cada ingrediente es
  una bebida, jugo exprimido de fruta u otro tipo de ingrediente.*/
class Bottle {
  constructor(nombre, capacidad, volumenAlcohol, descripcion) {
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.volumenAlcohol = volumenAlcohol;
    this.descripcion = descripcion;
  }
}
function addBottle(nombre, capacidad, volumenAlcohol, descripcion) {
  bottleList.push(new Bottle(nombre, capacidad, volumenAlcohol, descripcion));
}
let botellas = [
  ["Jugo de Tomate", 1000],
  ["Jugo de Arándano", 1500],
  ["Cola", 2500],
  ["Soda", 2000],
  ["Jugo de Naranja", 3000],
];
addBottle(
  "Vodka",
  750,
  "40%",
  "Se trata de una simple mezcla de alcohol y agua. Todas las bebidas alcohólicas —salvo el vodka— se componen de alcohol, agua y algo más. En ocasiones en la botella de vodka se hace constar las materias primas de proveniencia; pero ello es irrelevante desde el punto de vista de la composición del vodka: agua y alcohol. A lo más está levísimamente aromatizado."
);
addBottle(
  "Licor de Café",
  750,
  "20%",
  "Apareció en Jamaica en el siglo XVII. Es muy popular en Galicia, pudiéndose considerar licor tradicional, al que comúnmente se le llama simplemente licor café. Los habitantes de la ciudad de Orense presumen de su autoría, siendo la bebida graduada más popular de la zona. Está amparada por la denominación de origen local protegida Orujo de Galicia."
);
addBottle(
  "Cointreau",
  700,
  "40%",
  "Obtenido a partir de la destilación de cáscaras de naranja de variedades y procedencias diversas, tanto dulces como amargas. Las cáscaras se secan al sol, se maceran y se destilan en alambiques de cobre dando por resultado un aceite esencial que confiere al licor un aroma intenso y muy natural, entre dulce y amargo. Este aceite esencial se mezcla con alcohol, agua y azúcar en forma de almíbar y especias"
);
addBottle(
  "Ron Blanco",
  750,
  "38%",
  "Elaborado a partir de la fermentación y destilación de la melaza o el jugo de la caña de azúcar. La mayoría de su producción se encuentra en las Américas, y concretamente el Caribe, aunque también se da en otros países como las Filipinas o la India."
);
addBottle(
  "Tequila",
  750,
  "40%",
  "Es reconocida como la bebida más representativa de México. Siendo el tequila una bebida distinta al mezcal, se cree que una bebida no tendría ninguna relación en aspectos de elaboración ni destilación con el tequila, pero es de gran importancia mencionar que el tequila es considerado como un tipo específico de mezcal, siendo este obtenido del Agave tequilana de la variedad Weber Azul, siendo que el mezcal en sus distintas variedades puede ser obtenido de catorce distintos tipos de agave. De ahí la frase popular «se llama Tequila, pero se apellida Mezcal»."
);
addBottle(
  "Triple Sec",
  750,
  "39%",
  "El triple seco es el resultado de la triple destilación de una mezcla de cáscaras de naranjas dulces y amargas, maceradas en un alcohol neutro. Las naranjas se recolectan cuando aún están verdes, lo que asegura que la esencia obtenida tenga un aroma más pronunciado. Se añade agua y azúcar así como hierbas y otros ingredientes aromáticos que varían según las marcas."
);
addBottle(
  "Ginebra",
  700,
  "40%",
  "La ginebra es una bebida alcohólica destilada que posee un sabor predominante a nebrinas, los frutos del enebro (Juniperus communis). La ginebra es una de las categorías de destilados más amplia, con diversas regiones de producción, estilos y perfiles de sabor, que tienen en común las gálbulas o nebrinas de enebro."
);
addBottle(
  "Champagne",
  750,
  "12%",
  "El champán es un vino blanco o rosado espumoso elaborado con una mezcla (coupage o ensamblaje) entre las uvas chardonnay, meunier, pinot noir, pinot gris, pinot blanc, arbanne y petit meslier. Aunque la denominación de champán es exclusiva de la región de Champaña protegida por regímenes de calidad en la Unión Europea, popularmente se utiliza el término champán para denominar a los vinos espumosos elaborados en muchas regiones del mundo."
);
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

//?El parseInt() funciona correctamente a pesar de darle como parametro un string con palabras.
//?Ej: parseInt("15ml") da como output 15.

function cantBotellas(bebida, numIngr, cantVasos) {
  let amountPerGlass = parseInt(bebida.proporcion[numIngr]);
  return Math.ceil(
    (amountPerGlass * cantVasos) / bottleCapacity(bebida.ingredientes[numIngr])
  );
}

//TODO: Esto debera ser modificado una vez que se implemente la clase ingredientes.
function bottleCapacity(ingr) {
  for (let i = 0; i < bottleList.length; i++) {
    if (bottleList[i].nombre == ingr) {
      return parseInt(bottleList[i].capacidad);
    }
  }
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

function convertirNombre(nombre) {
  return nombre.replaceAll(" ", "-").toLowerCase();
}
function previewSection() {
  let randomBottle = Math.floor(Math.random() * botellas.length);
  const { nombre, volumenAlcohol, capacidad, descripcion } =
    bottleList[randomBottle];

  document.querySelector("#preview").innerHTML = `<div>
    <img src="./img/botellas/${convertirNombre(
      nombre
    )}.png" height="700px" alt="" />
    </div>
    <div class="info">
    <ul>
      <li><h2>${nombre}</h2></li>
      <li>
        <ul>
        <li>${volumenAlcohol}</li>
        <li>${capacidad} ml</li>
        <li>${descripcion}</li>
        </ul>
      </li>
    </ul>
    </div>`;
}

previewSection();

let cocktailCard = document.createElement("div");

let favedCards = JSON.parse(localStorage.getItem("Favoritos")) ?? [];

document.querySelector(".btn--ingredientes").onclick = () =>
  cardGenerator(bottleList);
document.querySelector(".btn--cocteles").onclick = () =>
  cardGenerator(cocktailList);

function cardGenerator(arr) {
  !!document.querySelector("#DOM .sort-container") &&
    document.querySelector("#DOM").firstChild.remove();

  generateButtons(arr);

  cocktailCard.innerHTML = "";
  arr.forEach((el) => {
    let folder = "";
    if (el instanceof Cocktail) {
      folder = "cocteles";
    } else if (el instanceof Bottle) {
      folder = "botellas";
    }

    cocktailCard.innerHTML += `<div>
    <button class="card" style="width: 18rem;">
    <img src="./img/${folder}/${convertirNombre(
      el.nombre
    )}.png" class="card-img-top" alt="..." style="height: 18rem;">
      
      <div class="card-body">
      <h5 class="card-title">${el.nombre}</h5>
      </div>
      
      </button>
      <div class="pretty p-image p-toggle p-plain p-tada">
        <input type="checkbox"${isFaved(el)}/>
        <div class="state p-off">
            <img class="image" src="./img/star-no-fill.png">
            <label></label>
        </div>
        <div class="state p-on">
            
            <img class="image" src="./img/star-yellow.png">
            <label></label>
        </div>
    </div>
      </div>
      `;
  });

  document.querySelector("#DOM").appendChild(cocktailCard);

  let botonFav = document.querySelectorAll("div .pretty");
  let botonCard = document.querySelectorAll("button.card");
  for (let i = 0; i < arr.length; i++) {
    botonFav[i].onclick = () =>
      changeState(botonFav[i].getElementsByTagName("input")[0], arr[i]);

    botonCard[i].onclick = () => calculo(arr[i]);
  }
}

function changeState(btn, arrEl) {
  if (btn.checked) {
    favedCards.push(arrEl);
  } else {
    favedCards = favedCards.filter(
      (el) => JSON.stringify(el) != JSON.stringify(arrEl)
    );
  }
  localStorage.setItem("Favoritos", JSON.stringify(favedCards));
}

function isFaved(el) {
  for (let i = 0; i < favedCards.length; i++) {
    if (JSON.stringify(favedCards[i]) === JSON.stringify(el)) {
      return " checked";
    }
  }
  return "";
}

function calculo(coctel) {
  if (coctel instanceof Cocktail) {
    (async () => {
      const { value: vasos } = await Swal.fire({
        title: `${coctel.nombre}`,
        text: "¿Cuántos vasos desea preparar?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        backdrop: `rgba(0,0,0,0.6)`,
        imageHeight: 250,
        imageUrl: `./img/${"cocteles"}/${convertirNombre(coctel.nombre)}.png`,
        input: "text",
        inputPlaceholder: "Ingrese un número",
        customClass: {
          validationMessage: "validationMsg",
        },
        //Input Validation
        preConfirm: (num) => {
          if (!num || isNaN(parseInt(num))) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Ingrese un número.'
            );
          } else if (num < 1) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Ingrese un número mayor a 0'
            );
          }
        },
      });

      //Mostrar Ingredientes.
      if (vasos) {
        let ingrList = `Para preparar ${vasos} vasos de ${coctel.tamaño} de ${coctel.nombre} necesitaras la siguiente cantidad de ingredientes:<br><div>`;

        for (let i = 0; i < coctel.ingredientes.length; i++) {
          let numBotellas = cantBotellas(coctel, i, vasos);
          let numGramatical = numBotellas > 1 ? "botellas." : "botella.";

          ingrList += `<br>-${coctel.ingredientes[i]}: ${numBotellas} ${numGramatical}`;
        }

        Swal.fire({
          title: `${coctel.nombre}`,
          html: `${ingrList}</div>`,
          backdrop: `rgba(0,0,0,0.6)`,
          imageHeight: 250,
          imageUrl: `./img/${"cocteles"}/${convertirNombre(coctel.nombre)}.png`,
        });
      }
    })();
  }
}

function generateButtons(arr) {
  let orderButtons = document.createElement("div");
  let btnType = [];
  if (arr[0] instanceof Cocktail) {
    btnType = ["Más Ingredientes", "Menos Ingredientes"];
  } else if (arr[0] instanceof Bottle) {
    btnType = ["Más Usado", "Menos Usado"];
  }
  orderButtons.innerHTML = `<div class="sort-container">
    <label>Ordenar por:</label>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Seleccionar
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <button
            type="button"
            class="dropdown-item"
            data-mdb-ripple-color="dark"
          >Nombre (A-Z)</button>
        </li>
        <li>
          <button
            type="button"
            class="dropdown-item"
            data-mdb-ripple-color="dark"
          >Nombre (Z-A)</button>
        </li>
        <li>
          <button
            type="button"
            class="dropdown-item"
            data-mdb-ripple-color="dark"
          >${btnType[0]}</button>
        </li>
        <li>
          <button
            type="button"
            class="dropdown-item"
            data-mdb-ripple-color="dark"
          >${btnType[1]}</button>
        </li>
      </ul>
    </div>
  </div>`;
  document.querySelector("#DOM").appendChild(orderButtons);

  document.querySelectorAll(".dropdown-menu button").forEach((btn) => {
    btn.onclick = () => {
      switch (btn.textContent) {
        case "Nombre (A-Z)":
          arr.sort(sortByName());
          break;
        case "Nombre (Z-A)":
          arr.sort(sortByName()).reverse();
          break;
        case "Más Ingredientes":
          arr.sort(sortByIngrQty()).reverse();
          break;
        case "Menos Ingredientes":
          arr.sort(sortByIngrQty());
          break;
        case "Más Usado":
          arr.sort(sortByUsage()).reverse();
          break;
        case "Menos Usado":
          arr.sort(sortByUsage());
          break;
      }
      cardGenerator(arr);
    };
  });
}
// Filtros de Ordenamiento

//Por Nombre
function sortByName() {
  return function (a, b) {
    return a.nombre < b.nombre ? -1 : 1;
  };
}

//Por Cantidad de Ingredientes
function sortByIngrQty() {
  return function (a, b) {
    return a.ingredientes.length < b.ingredientes.length ? -1 : 1;
  };
}

//Por cantidad de tragos en los que se usa
function sortByUsage() {
  return function (a, b) {
    return inHowMany(a) < inHowMany(b) ? -1 : 1;
  };
}
function inHowMany(ingr) {
  let howMany = 0;

  cocktailList.forEach((coctel) => {
    coctel.ingredientes.includes(ingr.nombre) && howMany++;
  });
  return howMany;
}
