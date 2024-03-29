declare module "@gush/candybar" {
  declare class Canvas {
    constructor(any);

    removeEntity: (unkown) => any;
    addEntity: (unkown) => any;
  }

  declare class Bounds {}

  declare namespace utils {
    declare function getRandomInt(number, number): number;
  }
}

declare module "*.module.css" {
  const content: { [key: string]: any };
  export = content;
}
