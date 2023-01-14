// 単位系を名前的型で扱う

export type Pixel = number & {readonly brand: unique symbol};
export type Meter = number & {readonly brand: unique symbol};
export type MilliSecond = number & {readonly brand: unique symbol};