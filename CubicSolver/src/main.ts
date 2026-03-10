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
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
  const x = b / (3 * a);

  let root1: number | string;
  let root2: number | string;
  let root3: number | string;

  if (discriminant < 0) {
    const k = 2 * Math.sqrt(-p / 3);
    const theta = Math.acos((-q / 2) / Math.sqrt((-p / 3) ** 3));
    const y1 = k * Math.cos(theta / 3);
    const y2 = k * Math.cos((theta + 2 * Math.PI) / 3);
    const y3 = k * Math.cos((theta + 4 * Math.PI) / 3);

    root1 = y1 - x;
    root2 = y2 - x;
    root3 = y3 - x;


  } else if (discriminant > 0) {
    const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
    const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
    root1 = u + v - x;
    root2 = "Complex";
    root3 = "Complex";
  } else {
    if (p === 0 && q === 0) {
      const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
      const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
      root1 = u + v - x;
      root2 = u + v - x;
      root3 = u + v - x;
    } else {
      const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
      const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
      root1 = u + v - x;
      root2 = Math.cbrt(q / 2) - (b / (3 * a));
      root3 = Math.cbrt(q / 2) - (b / (3 * a));
    };
  };

  // DOM to set results table
  (document.getElementById("p") as HTMLElement).textContent = `${p}`;
  (document.getElementById("q") as HTMLElement).textContent = `${q}`;
  (document.getElementById("discriminant") as HTMLElement).textContent = `${discriminant}`;
  (document.getElementById("root1") as HTMLElement).textContent = `${Number(root1).toFixed(2)}`;
  (document.getElementById("root2") as HTMLElement).textContent = `${Number(root2).toFixed(2)}`;
  (document.getElementById("root3") as HTMLElement).textContent = `${Number(root3).toFixed(2)}`;



  console.log(root1, root2, root3);
  console.log(a, b, c, d);

});
