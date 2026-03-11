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
    display.innerHTML = `Equation: ${a}x³ + ${b}x² + ${c}x + ${d}`; // note for me innerhtml helps read the exponents and display them properly
  }

  // number = rounds, string = complex 
  // typeof specifices
  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const scale = 30;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = -10; i <= 10; i++) {
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, h);
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(w, centerY + i * scale);
    }
    ctx.stroke();

    ctx.beginPath(); // this will draw x-axis
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, h);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath(); // this will draw y-axis
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, h);
    ctx.stroke();

    const drawCubic = (a: number, b: number, c: number, d: number) => {
      ctx.beginPath();
      ctx.strokeStyle = "red";

      for (let x = -10; x <= 10; x += 0.1) {
        const y = a * x ** 3 + b * x ** 2 + c * x + d;
        const canvasX = centerX + x * scale;
        const canvasY = centerY - y * scale; // puts graph coordinates to canvas

        if (x === -10) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        };
      };
      ctx.stroke();
    };
    drawCubic(a, b, c, d);
    if (typeof root1 === "number") {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(centerX + root1 * scale, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };
    if (typeof root2 === "number") {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(centerX + root2 * scale, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };
    if (typeof root3 === "number") {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(centerX + root3 * scale, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };
  };
  console.log(root1, root2, root3);
  console.log(a, b, c, d);
});
