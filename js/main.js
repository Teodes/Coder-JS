/*TODO: En un futuro añadir la posibilidad de elegir entre vasos descartables o cristaleria para cocteleria
(actualmente solo esta disponible la cristaleria)

Ademas se deben añadir las instrucciones para la preparacion de cada trago.*/

let cuantosVasos;
let tamañoVasos;
let cocktailList = [];
let glassList = [];
let bottleList = [];
let ingredientList = [];

//Implementar un filtro de cocteles en base a ingredientes.
let theUnforgettables = [
  "alexander",
  "americano",
  "angel face",
  "aviation",
  "between the sheets",
  "boulevardier",
  "brandy crusta",
  "casino",
  "clover club",
  "daiquiri",
  "dry martini",
  "gin fizz",
  "hanky panky",
  "john collins",
  "last word",
  "manhattan",
  "martinez",
  "mary pickford",
  "monkey gland",
  "negroni",
  "old fashioned",
  "paradise",
  "planter's punch",
  "porto flip",
  "ramos gin fizz",
  "rusty nail",
  "sazerac",
  "sidecar",
  "stinger",
  "tuxedo",
  "vieux carrè",
  "whiskey sour",
  "white lady",
];
let contemporaryClassics = [
  "bellini",
  "black russian",
  "bloody mary",
  "caipirinha",
  "champagne cocktail",
  "corpse reviver",
  "cosmopolitan",
  "cuba libre",
  "french 75",
  "french connection",
  "golden dream",
  "grasshopper",
  "hemingway special",
  "horse's neck",
  "irish coffee",
  "kir",
  "long island iced tea",
  "mai tai",
  "margarita",
  "mimosa",
  "mint julep",
  "mojito",
  "moscow mule",
  "pina colada",
  "pisco sour",
  "sea breeze",
  "sex on the beach",
  "singapore sling",
  "tequila sunrise",
  "vesper",
  "zombie",
];
let newEraDrinks = [
  "trinidad sour",
  "barracuda",
  "bee's knees",
  "bramble",
  "canchanchara",
  "dark and stormy",
  "espresso martini",
  "fernandito",
  "french martini",
  "illegal",
  "lemon drop martini",
  "naked and famous",
  "new york sour",
  "old cuban",
  "paloma",
  "paper plane",
  "penicillin",
  "russian spring punch",
  "southside",
  "spicy fifty",
  "spritz",
  "suffering bastard",
  "tipperary",
  "tommy's margarita",
  "ve.n.to",
  "yellow bird",
];

class Ingredient {
  constructor(nombre, imgURL, volumenAlcohol, descripcion) {
    this.nombre = nombre;
    this.imgURL = imgURL;
    this.volumenAlcohol = volumenAlcohol;
    this.descripcion = descripcion;
  }
}

function addIngredient(
  nombre,
  imgURL,
  containsAlcohol,
  volumenAlcohol,
  descripcion
) {
  let alcohol;
  if (containsAlcohol == null || containsAlcohol != "Yes") {
    alcohol = null;
  } else if (containsAlcohol == "Yes" && volumenAlcohol == null) {
    alcohol = "Depending on the brand.";
  } else {
    alcohol = volumenAlcohol;
  }
  ingredientList.push(new Ingredient(nombre, imgURL, alcohol, descripcion));
}

class Bottle {
  constructor(nombre, capacidad, volumenAlcohol, descripcion) {
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.volumenAlcohol = volumenAlcohol;
    this.descripcion = descripcion;
  }
}
function addBottle(nombre, volumenAlcohol, descripcion) {
  let alreadyExist = false;

  for (let i = 0; i < bottleList.length; i++) {
    if (bottleList[i].nombre == nombre) {
      alreadyExist = true;
    }
  }

  if (!alreadyExist) {
    bottleList.push(new Bottle(nombre, volumenAlcohol, descripcion));
  }
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
  constructor(nombre, ingredientes, proporcion, unidad, imgURL) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.proporcion = proporcion;
    this.unidad = unidad;
    //this.tamaño = tamaño;
    this.imgURL = imgURL;
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

//TODO: Borrar luego, sin uso.
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

function convertirNombre(nombre) {
  return nombre.replaceAll(" ", "-").toLowerCase();
}
function previewSection() {
  let randomBottle;
  do {
    randomBottle = Math.floor(Math.random() * ingredientList.length);
  } while (
    ingredientList[randomBottle].volumenAlcohol == null ||
    ingredientList[randomBottle].descripcion == null
  );

  const { nombre, imgURL, volumenAlcohol, descripcion } =
    ingredientList[randomBottle];

  document.querySelector("#preview").innerHTML = `<div>
    <img src="${imgURL.replace("-Medium", "")}" height="700px" alt="" />
    </div>
    <div class="info">
    <ul>
      <li><h2>${nombre}</h2></li>
      <li>
        <ul>
        <li>${
          isNaN(volumenAlcohol) ? volumenAlcohol : volumenAlcohol + "%"
        }</li>
        <li>${descripcion}</li>
        </ul>
      </li>
    </ul>
    </div>`;
}

const fetchCocktails = async (name) => {
  const resp = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name.replace(
      " ",
      "_"
    )}`
  );
  const data = await resp.json();

  if (data.drinks == null) {
  } else if (data.drinks.length >= 1) {
    for (const drink of data.drinks) {
      if (drink.strDrink.toLowerCase() === name.toLowerCase()) {
        addCocktailFromAPI(drink);
      }
    }
  }
  //? Hasta aca funciona.
  return data;
};

//setTimeout(previewSection, 3000);

async function fetchDrinks() {
  let promesas = [];
  const arr = theUnforgettables
    .concat(contemporaryClassics)
    .concat(newEraDrinks);

  for (let i = 0; i < arr.length; i++) {
    promesas.push(fetchCocktails(arr[i]));
  }

  const finished = Promise.all(promesas);
  return finished;
}

function addCocktailFromAPI(drink) {
  let ingredientes = [];
  let proporcion = [];
  let unidad = [];

  for (let i = 0; i < Object.entries(drink).length; i++) {
    let propertieName = Object.entries(drink)[i][0];
    let propertieValue = Object.entries(drink)[i][1];

    //continuar creando la logica para añadir los ingredientes
    //y su proporcion poara ser usados en la funcion
    //que se encarga de crear los cocteles desde la api.
    //luego modificar la clase para agregar la foto como propiedad.

    if (propertieName.includes("strIngredient") && propertieValue != null) {
      ingredientes.push(propertieValue);
    } else if (propertieName.includes("strMeasure") && propertieValue != null) {
      //TODO: Añadir la logica necesaria para realizar el parseFloat
      proporcion.push(propertieValue);
      //TODO: Ampliar luego, de momento usare Oz para todo.
      unidad.push("Oz");
    }
  }

  cocktailList.push(
    new Cocktail(
      drink.strDrink,
      ingredientes,
      proporcion,
      unidad,
      drink.strDrinkThumb
    )
  );
}

//! Llamada a la API. !//
fetchDrinks().then(async () => {
  let ingrArr = [];
  for (const cocktail of cocktailList) {
    for (const ingr of cocktail.ingredientes) {
      if (ingr != "") {
        ingrArr.push(ingr.toLowerCase());
      }
    }
  }
  //Elimina Repetidos.
  let filteredIngrArr = ingrArr.filter(
    (nombre, i, a) => a.indexOf(nombre) === i
  );

  let promesas = [];
  for (const ingr of filteredIngrArr) {
    promesas.push(fetchIngr(ingr));
  }
  await Promise.all(promesas);
  previewSection();
  //console.log(cocktailList);
});
//.then(previewSection());

async function fetchIngr(name) {
  const ingr = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name.replace(
      " ",
      "_"
    )}`
  );
  const data = await ingr.json();
  let nameIngr = data.ingredients[0].strIngredient;
  addIngredient(
    capitalizeFirstLetter(nameIngr),
    `https://www.thecocktaildb.com/images/ingredients/${nameIngr}-Medium.png`,
    data.ingredients[0].strAlcohol,
    data.ingredients[0].strABV,
    data.ingredients[0].strDescription
  );
  return data;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//previewSection();

let cocktailCard = document.createElement("div");
cocktailCard.setAttribute("id", "cards");

let favedCards = JSON.parse(localStorage.getItem("Favoritos")) ?? [];

const btnIngredientes = document.querySelector(".btn--ingredientes");
const btnCocteles = document.querySelector(".btn--cocteles");

btnIngredientes.addEventListener("click", () => {
  cardGenerator(ingredientList);
  removeActive(btnCocteles);
  setActive(btnIngredientes);
});
btnCocteles.addEventListener("click", () => {
  cardGenerator(cocktailList);
  removeActive(btnIngredientes);
  setActive(btnCocteles);
});

function setActive(node) {
  node.setAttribute("class", node.getAttribute("class") + " active");
}
function removeActive(node) {
  node.classList.remove("active");
}

//! Cambios en progreso (Pagination)
function cardGenerator(arr, pagination) {
  !!document.querySelector("#DOM #sort-filter") &&
    document.querySelector("#DOM #sort-filter").remove();

  !!document.querySelector("#DOM #pagination") &&
    document.querySelector("#DOM #pagination").remove();
  generateButtons(arr);

  cocktailCard.innerHTML = "";
  arr.forEach((el) => {
    cocktailCard.innerHTML += `<div>
    <button class="card" style="width: 18rem;">
    <img src="${
      el.imgURL
    }" class="card-img-top" alt="..." style="height: 18rem;">
      
      <div class="card-body">
      <h5 class="card-title">${el.nombre}</h5>
      </div>
      
      </button>
      <div class="pretty p-image p-toggle p-plain p-tada star">
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

  let botonFav = document.querySelectorAll("div .pretty.star");
  let botonCard = document.querySelectorAll("button.card");
  for (let i = 0; i < arr.length; i++) {
    botonFav[i].onclick = () =>
      changeState(botonFav[i].getElementsByTagName("input")[0], arr[i]);
    if (arr[i] instanceof Ingredient) {
      botonCard[i].onclick = () => filterByIngr(arr[i]);
    } else if (arr[i] instanceof Cocktail) {
      botonCard[i].onclick = () => calculo(arr[i]);
    }
  }
  generatePagesBtn(arr);
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
function filterByIngr(ingr) {
  let resultado = cocktailList.filter((cocktail) => {
    let lowerCaseIngrList = [];
    for (const ingr of cocktail.ingredientes) {
      lowerCaseIngrList.push(ingr.toLowerCase());
    }
    return lowerCaseIngrList.includes(ingr.nombre.toLowerCase());
  });
  cardGenerator(resultado);
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
        imageUrl: coctel.imgURL,
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
          imageUrl: coctel.imgURL,
        });
      }
    })();
  }
}

function generateButtons(arr) {
  let orderButtons = document.createElement("div");
  orderButtons.setAttribute("id", "sort-filter");

  let favsOnly = document.createElement("div");
  favsOnly.setAttribute("id", "favSwitch");
  let btnType = [];
  if (arr[0] instanceof Cocktail) {
    btnType = ["Más Ingredientes", "Menos Ingredientes"];
  } else if (arr[0] instanceof Ingredient) {
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
      <ul class="dropdown-menu order-btns" aria-labelledby="dropdownMenuButton">
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

  favsOnly.innerHTML = `<div class="pretty p-switch p-slim">
  <input type="checkbox" />
  <div class="state p-warning">
      <label>Ver solo Favoritos</label>
  </div>
</div>`;

  document.querySelector("#DOM").appendChild(orderButtons);
  orderButtons.appendChild(favsOnly);

  document
    .querySelectorAll(".dropdown-menu.order-btns button")
    .forEach((btn) => {
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
        if (document.querySelector("#favSwitch input").checked) {
          cardGenerator(arr);
          document.querySelector("#favSwitch input").checked = true;
          favSwitch();
        } else {
          cardGenerator(arr);
        }
      };
    });

  document
    .querySelector(".pretty.p-switch.p-slim")
    .addEventListener("change", favSwitch);
}

//Botones creados.
//TODO: Añadir la funcionalidad de los mismos.
function generatePagesBtn(arr) {
  let pagesBtn = document.createElement("div");
  pagesBtn.setAttribute("id", "pagination");
  pagesBtn.innerHTML = "";

  if (arr.length > 24) {
    pagesBtn.innerHTML = `<nav aria-label="Page navigation">
    <ul class="pagination pagination-lg">
    <li class="page-item"><a class="page-link" href="#DOM">Previous</a></li>
    <li class="page-item"><a class="page-link active" href="#DOM">1</a></li>
    <li class="page-item"><a class="page-link" href="#DOM">2</a></li>
    </ul>
    </nav>`;

    let pagesQty = Math.ceil(arr.length / 24);
    console.log(pagesQty);
    for (let i = 3; i <= pagesQty; i++) {
      let page = document.createElement("li");
      page.setAttribute("class", "page-item");
      page.innerHTML = `<a class="page-link" href="#DOM">${i}</a>`;
      pagesBtn.querySelector("ul").appendChild(page);
    }

    let next = document.createElement("li");
    next.setAttribute("class", "page-item");
    next.innerHTML = `<a class="page-link" href="#DOM">Next</a>`;
    pagesBtn.querySelector("ul").appendChild(next);
  }
  document.querySelector("#DOM").appendChild(pagesBtn);

  return { offset: 0, limit: 24 };
}

function pagesNumber() {
  const pagination = document.querySelector("pagination ul");
  //Crear Dropdown para cantidad de cartas
  //Hacer uso de la class active
  //En base al DOM buscar el boton activo y tomar su valor numérico.
  //Usar el textContent a traves de un parseInt.
}

function favSwitch() {
  const cardsDivContainers = document.querySelectorAll("#cards > div");
  let favNames = [];
  for (const fav of favedCards) {
    favNames.push(fav.nombre);
  }

  for (const cardDiv of cardsDivContainers) {
    if (document.querySelector("#favSwitch input").checked) {
      cardDiv.setAttribute("class", "d-none");
      if (favNames.includes(cardDiv.querySelector("h5").textContent)) {
        cardDiv.removeAttribute("class", "d-none");
      }
    } else {
      cardDiv.removeAttribute("class", "d-none");
    }
  }
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
