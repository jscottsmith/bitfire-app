import { ColorStop } from "../../type";
export type GradientColorArray = string[];

export function createGradientArray(
  size: number,
  colorStops: ColorStop[]
): GradientColorArray {
  const canvas = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = 1;

  if (!ctx) {
    throw new Error("issue creating canvas");
  }

  const gradient = ctx.createLinearGradient(0, 0, size, 0);
  colorStops.forEach((colorStop: ColorStop) =>
    gradient.addColorStop(colorStop.stop, colorStop.hex)
  );

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, 1);

  return Array(size)
    .fill(null)
    .map((_, x) => {
      const data = ctx.getImageData(x, 0, 1, 1).data;
      return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    });
}
