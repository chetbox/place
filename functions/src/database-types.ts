export interface Canvas {
  depth: number;
  canvas: Square<Square<Square<Square<Square<Square<Square<Color>>>>>>>;
}

export interface Square<T> {
  '00'?: T;
  '01'?: T;
  '10'?: T;
  '11'?: T;
}

export type Color = number;
