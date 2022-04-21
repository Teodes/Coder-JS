/*TODO: En un futuro añadir la posibilidad de elegir entre vasos descartables o cristaleria para cocteleria
(actualmente solo esta disponible la cristaleria)
//TODO: Crear un JSON para la información estática
//TODO: Aveces la funcion pagesNumber se ejectuta mas de una vez, posibles llamadas innecesarioas.
Ademas se deben añadir las instrucciones para la preparacion de cada trago.*/

let cuantosVasos;
let tamañoVasos;
let cocktailList = [];
let glassList = [];
let bottleList = [];
let ingredientList = [];

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

class Cocktail {
  constructor(
    nombre,
    ingredientes,
    proporcion,
    unidad,
    imgURL,
    instrucciones,
    vaso
  ) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.proporcion = proporcion;
    this.unidad = unidad;
    this.imgURL = imgURL;
    this.instrucciones = instrucciones;
    this.vaso = vaso;
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

addGlass("champagne flute", "180ml");
addGlass("cocktail glass", "180ml");
addGlass("collins glass", "300ml");
addGlass("copper mug", "475ml");
addGlass("highball glass", "300ml");
addGlass("hurricane glass", "400ml");
addGlass("irish coffee cup", "290ml");
addGlass("margarita glass", "250ml");
addGlass("martini glass", "180ml");
addGlass("nick and nora glass", "150ml");
addGlass("old-fashioned glass", "250ml");
addGlass("whiskey sour glass", "250ml");
addGlass("wine glass", "150ml");

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

let testGlass = [];
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
      drink.strDrinkThumb,
      drink.strInstructions,
      drink.strGlass
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
});

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
  console.log(node.textContent);
  //console.log(node.getAttribute("class"));
  node.setAttribute("class", node.getAttribute("class") + " active");
}
function removeActive(node) {
  node.classList.remove("active");
}

function cardGenerator(arr) {
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
      botonCard[i].onclick = () => showCocktailPopUp(arr[i]);
    }
  }
  generatePagesBtn();

  pagesNumber();

  //seeUnits();
}

function seeUnits() {
  for (const coctail of cocktailList) {
    for (const unit of coctail.proporcion) {
      console.log(unit);
    }
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

function showCocktailPopUp(coctel) {
  if (coctel instanceof Cocktail) {
    //Mostrar Ingredientes.
    let ingrList = `<strong>Ingredients:</strong>`;
    for (const ingrediente of coctel.ingredientes) {
      if (!!ingrediente) {
        ingrList += `<br>-${ingrediente}`;
      }
    }

    Swal.fire({
      title: `<strong>${coctel.nombre}</strong>`,
      html: `<strong>Instructions:</strong><br> ${coctel.instrucciones}<br><br>${ingrList}<br><br><strong>Glass</strong><br>${coctel.vaso}`,
      showDenyButton: true,
      denyButtonText: "Cancel",
      backdrop: `rgba(0,0,0,0.6)`,
      imageHeight: 250,
      imageUrl: coctel.imgURL,
      confirmButtonText: "Add",
    }).then((result) => {
      if (result.isConfirmed) {
        addToCalculator(coctel);
      }
    });
  }
}

function addToCalculator(coctel) {
  //TODO: Crear funcionalidad para ser añadido al DOM de la calculadora con appendChild.
  //TODO: Crear la validacion del inpun (no puede estar vacio, no puede ser superior a "max")
  console.log(`${coctel.ingredientes}\n${coctel.proporcion}`);
  const divCocktails = document.querySelector("#calculator .calc-cocktails");
  const divIngredients = document.querySelector(
    "#calculator .calc-ingredients"
  );
  let newCocktail = document.createElement("div");
  newCocktail.innerHTML = `<img src="${coctel.imgURL}/preview" alt="">
  <h4>${coctel.nombre}</h4>
  <div>
  <label>Quantity:</label>
  <input type="number" id="quantity" name="quantity" min="1" max="9999" maxlength="4" value="1" required>
  <button>Delete</button>
  </div>
  `;
  divCocktails.appendChild(newCocktail);
}

function generateButtons(arr) {
  !!document.querySelector("#DOM #sort-filter") &&
    document.querySelector("#DOM #sort-filter").remove();

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
        jumpToPageOne();
      };
    });

  document
    .querySelector(".pretty.p-switch.p-slim")
    .addEventListener("change", () => {
      favSwitch();
      jumpToPageOne();
    });

  const OptionQty = document.createElement("div");
  OptionQty.setAttribute("class", "qty-cards");
  OptionQty.innerHTML = `<span>Mostrar:</span>
  <select class="form-select" aria-label="Select Quantity of Cards">
    <option value="12">12</option>
    <option value="24">24</option>
    <option value="48">48</option>
  </select>`;

  orderButtons.appendChild(OptionQty);

  document.querySelector(".qty-cards select").addEventListener("change", () => {
    generatePagesBtn();
    pagesNumber();
  });
}

//Botones creados.
function generatePagesBtn() {
  !!document.querySelector("#DOM #pagination") &&
    document.querySelector("#DOM #pagination").remove();

  let quantity =
    document.querySelectorAll("#DOM #cards > div").length -
    document.querySelectorAll("#DOM #cards .d-none").length;

  let pagesBtn = document.createElement("div");
  pagesBtn.setAttribute("id", "pagination");
  pagesBtn.innerHTML = "";

  const selectValue = document.querySelector(".qty-cards select").value;

  if (quantity > selectValue) {
    pagesBtn.innerHTML = `<nav aria-label="Page navigation">
    <ul class="pagination pagination-lg">
    <li class="page-item previous"><a class="page-link" href="#DOM">Previous</a></li>
    <li class="page-item first-page page-num active"><a class="page-link" href="#DOM">1</a></li>
    <li class="page-item page-num"><a class="page-link" href="#DOM">2</a></li>
    </ul>
    </nav>`;

    let pagesQty = Math.ceil(quantity / selectValue);

    for (let i = 3; i <= pagesQty; i++) {
      let page = document.createElement("li");
      page.setAttribute("class", "page-item page-num");
      page.innerHTML = `<a class="page-link" href="#DOM">${i}</a>`;
      pagesBtn.querySelector("ul").appendChild(page);
    }

    let next = document.createElement("li");
    next.setAttribute("class", "page-item next");
    next.innerHTML = `<a class="page-link" href="#DOM">Next</a>`;
    pagesBtn.querySelector("ul").appendChild(next);
  }
  document.querySelector("#DOM").appendChild(pagesBtn);

  //! Puede provocar errores
  document
    .querySelectorAll("#pagination nav ul li.page-num a")
    .forEach((pageBtn) => {
      pageBtn.addEventListener("click", () => {
        removeActive(
          document.querySelector("#pagination nav ul li.page-num.active")
        );
        setActive(pageBtn.parentNode);
        pagesNumber();
      });
    });
}

function jumpToPageOne() {
  const active = document.querySelector("#pagination nav ul li.active");
  !!active && removeActive(active);

  const firstPage = document.querySelector("#pagination nav ul li.first-page");
  !!firstPage && setActive(firstPage);

  pagesNumber();
}

//TODO: Añadir class previous y next a los botones, posteriormente crear la logica para su correcto funcionamiento.
//!In Progress
function pagesNumber() {
  let visibleCards = [];
  let totalDivs = [];

  for (const card of document.querySelectorAll("#DOM #cards > div")) {
    totalDivs.push(".");
    if (card.getAttribute("class") != "d-none") {
      visibleCards.push(card);
    }
  }
  // console.log(`Total divs: ${totalDivs.length}`);
  // console.log(`Visible Cards: ${visibleCards.length}`);

  const activePage = document.querySelector("#pagination nav ul li.active");
  let currentPage;
  if (!!activePage) {
    currentPage = parseInt(activePage.textContent);
  } else {
    currentPage = 1;
  }

  const value = document.querySelector(".qty-cards select").value;

  for (let i = 0; i < visibleCards.length; i++) {
    if (i >= value * (currentPage - 1) && i <= value * currentPage - 1) {
      !!visibleCards[i].getAttribute("class") &&
        visibleCards[i].removeAttribute("class");
    } else {
      visibleCards[i].setAttribute("class", "dont-show");
    }
  }

  //TODO: Not working yet, needs more work.
  // let previous = document.querySelector("nav ul li.previous");
  // console.log(`Previous: ${!!previous}`);
  // previous.addEventListener("click", () => {
  //   if (!previous.getAttribute("class").includes("disabled")) {
  //     let active = document.querySelector(
  //       "#pagination nav ul li.page-num.active"
  //     );
  //     setActive(active.previousElementSibling);
  //     removeActive(active);
  //     //pagesNumber();
  //   }
  // });

  // let next = document.querySelector("nav ul li.next");
  // console.log(`Next: ${!!next}`);
  // next.addEventListener("click", () => {
  //   if (!next.getAttribute("class").includes("disabled")) {
  //     let active = document.querySelector(
  //       "#pagination nav ul li.page-num.active"
  //     );
  //     setActive(active.nextElementSibling);
  //     removeActive(active);
  //     //pagesNumber();
  //   }
  // });

  // if (document.querySelector("nav ul li.active").textContent == "1") {
  //   previous.setAttribute("class", "page-item previous disabled");
  // } else {
  //   previous.classList.remove("disabled");
  // }

  // if (
  //   document.querySelector("nav ul li.active").textContent ==
  //   document.querySelectorAll("nav ul li.page-num").length
  // ) {
  //   next.setAttribute("class", "page-item previous disabled");
  // } else {
  //   next.classList.remove("disabled");
  // }
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
  generatePagesBtn();
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
    let aLength = a.ingredientes.length;
    let bLength = b.ingredientes.length;

    if (a.ingredientes.includes("")) {
      aLength = 0;
      for (const ingr of a.ingredientes) {
        if (!!ingr && ingr != "") {
          aLength++;
        }
      }
    }
    if (b.ingredientes.includes("")) {
      bLength = 0;
      for (const ingr of b.ingredientes) {
        if (!!ingr && ingr != "") {
          bLength++;
        }
      }
    }
    return aLength < bLength ? -1 : 1;
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
