export function createGradientArray(size, colorStops) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = 1;

  const gradient = ctx.createLinearGradient(0, 0, size, 0);
  colorStops.forEach((args) => gradient.addColorStop(...args));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, 1);

  return Array(size)
    .fill(null)
    .map((_, x) => {
      const data = ctx.getImageData(x, 0, 1, 1).data;
      return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    });
}

export function createFlameGraph(colors: string[]) {
  const graph = [0, 0.1, 0.3, 0.5, 0.6, 0.8, 1];
  if (graph.length !== colors.length) {
    throw new Error("colors and graph const must match");
  }

  return graph.map((x, i) => [x, colors[i]]);
}
