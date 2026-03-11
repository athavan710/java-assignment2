import './style.css';
const form = document.getElementById("cubicsolver") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const a: number = Number(formData.get("a"));
  const b: number = Number(formData.get("b"));
  const c: number = Number(formData.get("c"));
  const d: number = Number(formData.get("d"));

  const p = ((3 * a * c) - (b * b)) / (3 * a * a);
  const q = ((27 * (a * a) * d) - (9 * a * b * c) + (2 * b * b * b)) / (27 * a * a * a)
  const discriminant = Number(((q / 2) ** 2 + (p / 3) ** 3).toFixed(7)); //use number to make it a number bc tofixed makes it a string sidenote for me
  const x = b / (3 * a);

  let root1: number | string;
  let root2: number | string;
  let root3: number | string;

  if (discriminant < 0) { //3 real
    const k = 2 * Math.sqrt(-p / 3);
    const theta = Math.acos((-q / 2) / Math.sqrt((-p / 3) ** 3));
    const y1 = k * Math.cos(theta / 3);
    const y2 = k * Math.cos((theta + 2 * Math.PI) / 3);
    const y3 = k * Math.cos((theta + 4 * Math.PI) / 3);

    root1 = y1 - x;
    root2 = y2 - x;
    root3 = y3 - x;


  } else if (discriminant > 0) { //1 real, 2 imaginary
    const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
    const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
    root1 = u + v - x;
    root2 = "Complex";
    root3 = "Complex";
  } else if (p === 0 && q === 0) { //triple root
    const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
    const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
    root1 = u + v - x;
    root2 = u + v - x;
    root3 = u + v - x;
  } else { // single root and double root
    if (p != 0) {
      const u = Math.cbrt(-q / 2);
      root1 = (2 * u) - x;
      const doubleRoot = Math.cbrt(q / 2) - x;
      root2 = doubleRoot;
      root3 = doubleRoot;
    } else {  //discriminant = 0
      const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
      const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
      root1 = u + v - x;
      root2 = Math.cbrt(q / 2) - (b / (3 * a));
      root3 = Math.cbrt(q / 2) - (b / (3 * a));
    }
  };

  // DOM to set results table
  (document.getElementById("p") as HTMLElement).textContent = `${p.toFixed(2)}`;
  (document.getElementById("q") as HTMLElement).textContent = `${q.toFixed(2)}`;
  (document.getElementById("discriminant") as HTMLElement).textContent = `${discriminant.toFixed(2)}`;

  if (typeof root1 === "number") {
    (document.getElementById("root1") as HTMLElement).textContent = `${root1.toFixed(2)}`;
  } else {
    (document.getElementById("root1") as HTMLElement).textContent = `${root1}`;
  };

  if (typeof root2 === "number") {
    (document.getElementById("root2") as HTMLElement).textContent = `${root2.toFixed(2)}`;
  } else {
    (document.getElementById("root2") as HTMLElement).textContent = `${root2}`;
  };

  if (typeof root3 === "number") {
    (document.getElementById("root3") as HTMLElement).textContent = `${root3.toFixed(2)}`;
  } else {
    (document.getElementById("root3") as HTMLElement).textContent = `${root3}`;
  };

  const display = document.getElementById("showequation");
  if (display) {
    display.innerHTML = `Equation: ${a}x³ + ${b}x² + ${c}x + ${d}`;
  }

  // number = rounds, string = complex 

  // typeof specifices





  console.log(root1, root2, root3);
  console.log(a, b, c, d);

});
