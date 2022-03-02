let cantidad = [
  ["asd", 90],
  ["ml", 2],
];

function separar() {
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
  console.log(propArray);
  console.log(unitArray);
}
separar();
