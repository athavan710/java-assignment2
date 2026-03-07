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
  const discriminant = (q / 2) **2 + (p / 2) **3;

  


})
