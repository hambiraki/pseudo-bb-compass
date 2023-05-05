import type { Length } from "@/units";
import {
  situation2location,
  type Situation,
  type Location,
} from "./minimap-names";
import { pxpmScales } from "./scales";

// url用定数
const locationBaseUrl = "https://ps4.borderbreak.com/data/location";

// サイズ決め定数
const originalXStart = 562; // sx(元画像の切り抜き始点X)
const originalYStart = 78; // sy(元画像の切り抜き始点Y)
const originalSquareSideLength = 925; // sWidth,sHeight (元画像の切り抜きサイズ：横幅、高さ)
const canvasXStart = 0; // dx(Canvasの描画開始位置X)
const canvasYStart = 0; // dy(Canvasの描画開始位置Y)

export class Minimap {
  readonly Image: HTMLImageElement;
  readonly scaleOnOriginal: number;
  public hasDownloaded = false; // 非同期処理にすべき？
  constructor(situation: Situation) {
    const location = situation2location[situation];
    this.Image = downloadMapImage(location, situation);
    this.scaleOnOriginal = pxpmScales[location];
  }
  readonly draw = (
    ctx: CanvasRenderingContext2D,
    minimapLength: Length
  ): void => {
    if (this.hasDownloaded) {
      ctx.drawImage(
        this.Image,
        originalXStart,
        originalYStart,
        originalSquareSideLength,
        originalSquareSideLength,
        canvasXStart,
        canvasYStart,
        minimapLength.px,
        minimapLength.px
      );
    } else {
      this.hasDownloaded = true;
      this.Image.onload = (): void => {
        ctx.drawImage(
          this.Image,
          originalXStart,
          originalYStart,
          originalSquareSideLength,
          originalSquareSideLength,
          canvasXStart,
          canvasYStart,
          minimapLength.px,
          minimapLength.px
        );
      };
    }
  };
}
const downloadMapImage = (
  location: Location,
  situation: Situation
): HTMLImageElement => {
  const image = new Image();
  image.alt = `${location}～${situation}～`;
  const minimapIndex = extensions[situation];
  const rawUrl = `${locationBaseUrl}/${location}/${situation}/${minimapIndex}`;
  image.src = encodeURI(rawUrl);
  return image;
};

const extensions = {
  戦線突破: "sub_6.jpg",
  砂上の激突: "sub_6.jpg",
  臨海決戦: "sub_6.jpg",
  夕暮れの戦火: "sub_6.jpg",
  黄昏の連合戦: "sub_6.jpg",
  塔上の攻防: "sub_6.png",
  沿岸迎撃戦: "sub_6.png",
  熱戦の河畔: "sub_6.jpg",
  激戦の丘: "sub_6.jpg",
  街路制圧戦: "sub_6.jpg",
  砂塵の死線: "sub_6.jpg",
  蒼穹貫く翡翠樹: "sub_6.jpg",
  窮迫決壊: "sub_6.jpg",
  夕刻に燃ゆ: "sub_6.jpg",
  激闘の翠都: "sub_6.jpg",
  軋轢の天望坐: "sub_6.jpg",
  天空への架け橋: "sub_6.jpg",
  駆動壁の迎撃戦: "sub_6.png",
  白砂進軍: "sub_6.jpg",
  波打際の熱闘: "sub_6.jpg",
  汀の連合戦: "sub_6.png",
  南海の迎撃戦: "sub_6.png",
  白銀死都: "sub_6.jpg",
  氷点下の鳴動: "sub_6.jpg",
  雪映えの赤光: "sub_6.jpg",
  激闘の氷域: "sub_6.png",
  強攻水路: "sub_6.jpg",
  城跡の連合戦: "sub_6.png",
  飛天交叉: "sub_6.png",
  迫水制領: "sub_6.png",
  凍て付く戦陣: "sub_6.jpg",
  純白の先途: "sub_6.jpg",
  反目の凍視線: "sub_6.jpg",
  騒乱の幽谷: "sub_6.jpg",
  陰る深淵にて: "sub_6.jpg",
  激闘の森林: "sub_6.png",
  都市侵襲: "sub_6.jpg",
  運河に見ゆ: "sub_6.jpg",
  "PLAN-U2": "sub_6.jpg",
  "PLAN－K": "sub_6.png",
  "PLAN－Y": "sub_6.png",
  要衝襲撃: "sub_6.jpg",
  暁天銃火: "sub_6.jpg",
  残照の閃光: "sub_6.jpg",
  "構造α－01": "sub_6.jpg",
  激闘の円蓋: "sub_6.jpg",
  "構造β－05": "sub_6.png",
  魔窟迎撃戦: "sub_6.png",
  "構造β－90": "sub_6.png",
  湧水の波紋: "sub_6.jpg",
  祝福なき礼拝堂: "sub_6.jpg",
  石橋の眼下: "sub_6.png",
  草生の迎撃戦: "sub_6.png",
  湿地帯の連合戦: "sub_6.png",
  教会堂を望む: "sub_6.png",
  天柱の兵火: "sub_6.jpg",
  高高度電撃戦: "sub_6.jpg",
  激闘の高楼: "sub_6.png",
  奇策縦横: "sub_6.png",
  山門の抗衡: "sub_6.jpg",
  晴嵐の連合戦: "sub_6.png",
  白霧潜攻: "sub_6.png",
  "FIELD-D": "sub_6.jpg",
  "FIELD-S": "sub_6.jpg",
  "FIELD－A": "sub_6.png",
  銀雪覆う黒煤: "sub_6.jpg",
  天牢雪獄の激闘: "sub_6.jpg",
  砂塵舞う壊都市: "sub_6.jpg",
  月下伯仲: "sub_6.png",
  茫漠の連合戦: "sub_6.png",
  焦熱の砲号: "sub_6.png",
  源郷への帰還: "sub_6.jpg",
  終の箱庭: "sub_6.png",
  中軌道連合戦: "sub_6.png",
  混沌のゆりかご: "sub_6.png",
  最果ての決戦地: "sub_6.png",
  駆け巡る流星群: "sub_6.png",
  地底の接敵: "sub_6.jpg",
  深部暗闘: "sub_6.png",
  燃え盛る征野: "sub_6.jpg",
  激闘の塁砦: "sub_6.png",
  埋伏攻路: "sub_6.png",
  硝煙の迎撃戦: "sub_6.png",
  黒煙の連合戦: "sub_6.png",
  煙中対敵: "sub_6.png",
  闘争地下壕: "sub_6.png",
  怒れる火の神: "sub_6.jpg",
  烽火連天: "sub_6.png",
  激闘の火杭: "sub_6.png",
  雨下応酬: "sub_6.jpg",
  激闘の高地: "sub_6.png",
  暴雨の連合戦: "sub_6.png",
  山嵐迎撃戦: "sub_6.png",
  崖下乱戦: "sub_6.png",
  未開の繭: "sub_6.png",
  打草驚蛇: "sub_6.png",
  鎮座する機蠍: "sub_6.png",
  多脚艦上の奮戦: "sub_6.png",
  晴空下の熱風: "sub_6.png",
  暗雲喚ぶ連合戦: "sub_6.png",
  激闘の緑島: "sub_6.png",
  夕日煌く戦野: "sub_6.png",
  疾風迅炎: "sub_6.png",
  海端迎撃戦: "sub_6.png",
  赤土の連合戦: "sub_6.png",
  戦端の大鉄橋: "sub_6.png",
  断崖の相克: "sub_6.png",
} as const;
