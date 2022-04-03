// const tick = Date.now();
// const log = (v) => console.log(`${v} \n Demora: ${Date.now() - tick}ms`);

// const fruta = {
//   1: "🍑",
//   2: "🍎",
//   3: "🥝",
// };

// async function getFruit(name) {
//   const fruits = {
//     1: "🍑",
//     2: "🍎",
//     3: "🥝",
//   };

//   //?Delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return fruits[name];
// }

// async function makeSmoothie() {
//   const a = await getFruit("1");
//   const b = await getFruit("3");
//   const c = await getFruit("2");

//   return [a, b, c];
// }

// async function makeSmoothie2() {
//   const a = getFruit("1");
//   const b = getFruit("3");
//   const c = getFruit("2");

//   const smoothie = Promise.all([a, b, c]);

//   return smoothie;
// }

// async function makeSmoothie3() {
//   let arr = [];
//   for (let i = 1; i <= Object.entries(fruta).length; i++) {
//     arr.push(getFruit(i.toString()));
//   }
//   const smoothie = Promise.all(arr);

//   return smoothie;
// }

// makeSmoothie().then(log);
// makeSmoothie2().then(log);
// makeSmoothie3().then(log);

const promesa = new Promise((resolve, reject) => {
  resolve("Output resolve promesa.");
});

console.log(promesa);
