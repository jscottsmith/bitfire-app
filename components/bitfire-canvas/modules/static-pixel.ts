import { utils } from "@gush/candybar";
import { CELL_HEIGHT, CELL_WIDTH, SPREAD_FROM } from "../constants";

export class StaticPixel {
  color: number[];
  x: number;
  y: number;
  index: number;

  constructor({ x, y, colors, index }) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.colors = colors;
  }

  setSides({ top, left, bottom, right }) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  draw = ({ ctx }) => {
    const fill = this.colors[this.index];
    ctx.fillStyle = fill;
    ctx.fillRect(this.x, this.y, CELL_WIDTH, CELL_HEIGHT);
  };

  update = () => {
    // const side = SPREAD_FROM[utils.getRandomInt(0, SPREAD_FROM.length - 1)];
    // const dest = this[side];
    // // check if it can dest to designated side
    // if (dest && dest.index < this.index) {
    //   const rand = utils.getRandomInt(-1, 4);
    //   this.index = dest.index + rand;
    // } else {
    //   this.index += 1;
    // }
    // // resets if overflow
    // if (this.index > this.colors.length - 1) {
    //   this.index = this.colors.length - 1;
    // } else if (this.index < 0) {
    //   this.index = 0;
    // }
  };
}
