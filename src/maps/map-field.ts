import type { Length } from "@/units";
// url用定数
const locationBaseUrl = "https://ps4.borderbreak.com/data/location";
const minimapIndex = "sub_6.jpg";

// サイズ決め定数
const originalXStart = 562; // sx(元画像の切り抜き始点X)
const originalYStart = 78; // sy(元画像の切り抜き始点Y)
const originalSquareSideLength = 925; // sWidth,sHeight (元画像の切り抜きサイズ：横幅、高さ)
const canvasXStart = 0; // dx(Canvasの描画開始位置X)
const canvasYStart = 0; // dy(Canvasの描画開始位置Y)

export class MapField {
  constructor(readonly location: string, readonly situation: string) {}
  readonly draw = (ctx: CanvasRenderingContext2D, minimapLength:Length): void => {
    ctx.drawImage(
      downloadMapImage(this.location, this.situation),
      originalXStart,
      originalYStart,
      originalSquareSideLength,
      originalSquareSideLength,
      canvasXStart,
      canvasYStart,
      minimapLength.pixel,
      minimapLength.pixel,
    );
  };
}
const downloadMapImage = (
  location: string,
  situation: string
): HTMLImageElement => {
  const image = new Image();
  image.alt = `${location}～${situation}～`;
  const rawUrl = `${locationBaseUrl}/${location}/${situation}/${minimapIndex}`;
  image.src = encodeURI(rawUrl);
  return image;
};
