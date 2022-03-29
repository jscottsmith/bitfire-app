import { utils } from "@gush/candybar";
import { CELL_HEIGHT, CELL_WIDTH, SPREAD_FROM } from "../constants";
import { GradientColorArray } from "../utils";

export class Pixel {
  index: number;
  x: number;
  y: number;
  colors: GradientColorArray;
  isStatic: boolean;

  top?: Pixel;
  left?: Pixel;
  bottom?: Pixel;
  right?: Pixel;

  constructor(options: {
    x: number;
    y: number;
    index: number;
    colors: GradientColorArray;
    isStatic: boolean;
  }) {
    this.x = options.x;
    this.y = options.y;
    this.index = options.index;
    this.colors = options.colors;
    this.isStatic = options.isStatic;
  }

  setSides({ top, left, bottom, right }: any) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  draw = ({ ctx }: any) => {
    const fill = this.colors[this.index];
    ctx.fillStyle = fill;
    ctx.fillRect(this.x, this.y, CELL_WIDTH, CELL_HEIGHT);
  };

  update = () => {
    if (this.isStatic) {
      return;
    }

    const side = SPREAD_FROM[utils.getRandomInt(0, SPREAD_FROM.length - 1)];
    const dest = this[side];

    // check if it can dest to designated side
    if (dest && dest.index < this.index) {
      const rand = utils.getRandomInt(-1, 4);
      this.index = dest.index + rand;
    } else {
      this.index += 1;
    }

    // resets if overflow
    if (this.index > this.colors.length - 1) {
      this.index = this.colors.length - 1;
    } else if (this.index < 0) {
      this.index = 0;
    }
  };
}
