/**
 * 旧ブロア市街地
 */

import { MapSituation } from "./index";
import { MapField } from "./map-field";

/**
 * @package
 */
export class BlouerFactory implements MapSituation {
  static readonly situations = [
    "熱戦の河畔",
    "激戦の丘",
    "街路制圧戦",
  ] as const;
  get situations(): readonly string[] {
    return BlouerFactory.situations;
  }
  create = (situation: typeof BlouerFactory.situations[number]): MapField => {
    return new MapField("旧ブロア市街地", situation);
  };
}

const map_names = new Map<string, string[]>([
  ["スカービ渓谷", ["戦線突破", "砂上の激突"]],
  [
    "第３採掘島",
    ["臨海決戦", "夕暮れの戦火", "黄昏の連合戦", "塔上の攻防", "沿岸迎撃戦"],
  ],
  ["旧ブロア市街地", ["熱戦の河畔", "激戦の丘", "街路制圧戦"]],
  ["トラザ山岳基地", ["砂塵の死線"]],
  [
    "研究都市メムノス",
    ["蒼穹貫く翡翠樹", "窮迫決壊", "夕刻に燃ゆ", "激闘の翠都"],
  ],
  ["極地観測所セクター9", ["軋轢の天望坐", "天空への架け橋", "駆動壁の迎撃戦"]],
  ["キニシュ砂岸", ["白砂進軍", "波打際の熱闘", "汀の連合戦", "南海の迎撃戦"]],
  ["放棄区画D51", ["白銀死都", "氷点下の鳴動", "雪映えの赤光", "激闘の氷域"]],
  ["城塞都市バレリオ", ["強攻水路", "城跡の連合戦", "飛天交叉", "迫水制領"]],
  ["極洋基地ベルスク", ["凍て付く戦陣", "純白の先途", "反目の凍視線"]],
  ["ナローレイ深地隙", ["騒乱の幽谷", "陰る深淵にて", "激闘の森林"]],
  ["ホープサイド市街地", ["都市侵襲", "運河に見ゆ"]],
  ["ブラスト操練場", ["PLAN-U2", "PLAN-K", "PLAN-Y"]],
  ["ウーハイ産業港", ["要衝襲撃", "暁天銃火", "残照の閃光"]],
  [
    "ネソス島実験ドーム",
    ["構造α－01", "激闘の円蓋", "構造β－05", "魔窟迎撃戦", "構造β－90"],
  ],
  [
    "ベネヴィス高原地帯",
    [
      "湧水の波紋",
      "祝福なき礼拝堂",
      "石橋の眼下",
      "草生の迎撃戦",
      "湿地帯の連合戦",
      "教会堂を望む",
    ],
  ],
  [
    "第19号高層サイト",
    ["天柱の兵火", "高高度電撃戦", "激闘の高楼", "奇策縦横"],
  ],
  ["ロンシャ深山", ["山門の抗衡", "晴嵐の連合戦", "白霧潜攻"]],
  ["ブラスト機体試験場", ["FIELD-D", "FIELD-S", "FIELD-A"]],
  ["マリナセドナ大雪山", ["銀雪覆う黒煤", "天牢雪獄の激闘"]],
  [
    "アルマイヤ大砂海",
    ["砂塵舞う壊都市", "月下伯仲", "茫漠の連合戦", "焦熱の砲号"],
  ],
  [
    "エイオース内部禁域",
    [
      "源郷への帰還",
      "終の箱庭",
      "中軌道連合戦",
      "混沌のゆりかご",
      "最果ての決戦地",
      "駆け巡る流星群",
    ],
  ],
  ["マデルロンド大空洞", ["地底の接敵", "深部暗闘"]],
  [
    "ゲルベルク要塞跡",
    [
      "燃え盛る征野",
      "激闘の塁砦",
      "埋伏攻路",
      "硝煙の迎撃戦",
      "黒煙の連合戦",
      "煙中対敵",
      "闘争地下壕",
    ],
  ],
  ["マウナ・エレ溶岩流域", ["怒れる火の神", "烽火連天", "激闘の火杭"]],
  [
    "デ・ネブラ大落片",
    ["雨下応酬", "激闘の高地", "暴雨の連合戦", "山嵐迎撃戦", "崖下乱戦"],
  ],
  ["M532バイオドーム", ["未開の繭", "打草驚蛇"]],
  ["エスコンダ工廠", ["鎮座する機蠍", "多脚艦上の奮戦"]],
  [
    "第5再開発島ラナクア",
    [
      "晴空下の熱風",
      "暗雲喚ぶ連合戦",
      "激闘の緑島",
      "夕日煌く戦野",
      "疾風迅炎",
      "海端迎撃戦",
    ],
  ],
  ["ナヴァル岩石砂漠", ["赤土の連合戦", "戦端の大鉄橋", "断崖の相克"]],
]);
//     "スカービ渓谷":[
//         "戦線突破",
//         "砂上の激突",
//     ],
//     "第３採掘島":[
//         "臨海決戦",
//         "夕暮れの戦火",
//         "黄昏の連合戦",
//         "塔上の攻防",
//         "沿岸迎撃戦",
//     ],
//     "旧ブロア市街地":[

//         "熱戦の河畔",
//         "激戦の丘",
//         "街路制圧戦",

//     ],
//     "トラザ山岳基地":[

//         "砂塵の死線",
//     ],
//     "研究都市メムノス":[

//         "蒼穹貫く翡翠樹",
//         "窮迫決壊",
//         "夕刻に燃ゆ",
//         "激闘の翠都",

//     ],
//     "極地観測所セクター9":[

//         "軋轢の天望坐",
//         "天空への架け橋",
//         "駆動壁の迎撃戦",

//     ],
//     "キニシュ砂岸":[

//         "白砂進軍",
//         "波打際の熱闘",
//         "汀の連合戦",
//         "南海の迎撃戦",

//     ],
//     "放棄区画D51":[
//         "白銀死都",
//         "氷点下の鳴動",
//         "雪映えの赤光",
//         "激闘の氷域",

//     ],
//     "城塞都市バレリオ":[

//         "強攻水路",
//         "城跡の連合戦",
//         "飛天交叉",
//         "迫水制領",

//     ],
//     "極洋基地ベルスク":[
//         "凍て付く戦陣",
//         "純白の先途",
//         "反目の凍視線",

//     ],
//     "ナローレイ深地隙":[

//         "騒乱の幽谷",
//         "陰る深淵にて",
//         "激闘の森林",
//     ],

//     "ホープサイド市街地":[

//         "都市侵襲",
//         "運河に見ゆ",
//     ],
//     "ブラスト操練場":[

//         "PLAN-U2",
//         "PLAN-K",
//         "PLAN-Y",
//     ],
//     "ウーハイ産業港":[

//         "要衝襲撃",
//         "暁天銃火",
//         "残照の閃光",
//     ],
//     "ネソス島実験ドーム":[

//         "構造α－01",
//         "激闘の円蓋",
//         "構造β－05",
//         "魔窟迎撃戦",
//         "構造β－90",
//     ],
//     "ベネヴィス高原地帯":[

//         "湧水の波紋",
//         "祝福なき礼拝堂",
//         "石橋の眼下",
//         "草生の迎撃戦",
//         "湿地帯の連合戦",
//         "教会堂を望む",
//     ],
//     "第19号高層サイト":[

//         "天柱の兵火",
//         "高高度電撃戦",
//         "激闘の高楼",
//         "奇策縦横",
//     ],
//     "ロンシャ深山":[

//         "山門の抗衡",
//         "晴嵐の連合戦",
//         "白霧潜攻",
//     ],
//     "ブラスト機体試験場":[

//         "FIELD-D",
//         "FIELD-S",
//         "FIELD-A",
//     ],
//     "マリナセドナ大雪山":[

//         "銀雪覆う黒煤",
//         "天牢雪獄の激闘",
//     ],
//     "アルマイヤ大砂海":[

//         "砂塵舞う壊都市",
//         "月下伯仲",
//         "茫漠の連合戦",
//         "焦熱の砲号",
//     ],
//     "エイオース内部禁域":[

//         "源郷への帰還",
//         "終の箱庭",
//         "中軌道連合戦",
//         "混沌のゆりかご",
//         "最果ての決戦地",
//         "駆け巡る流星群",
//     ],
//     "マデルロンド大空洞":[

//         "地底の接敵",
//         "深部暗闘",
//     ],
//     "ゲルベルク要塞跡":[

//         "燃え盛る征野",
//         "激闘の塁砦",
//         "埋伏攻路",
//         "硝煙の迎撃戦",
//         "黒煙の連合戦",
//         "煙中対敵",
//         "闘争地下壕",
//     ],
//     "マウナ・エレ溶岩流域":[

//         "怒れる火の神",
//         "烽火連天",
//         "激闘の火杭",

//     ],
//     "デ・ネブラ大落片":[

//         "雨下応酬",
//         "激闘の高地",
//         "暴雨の連合戦",
//         "山嵐迎撃戦",
//         "崖下乱戦",

//     ],
//     "M532バイオドーム":[

//         "未開の繭",
//         "打草驚蛇",

//     ],
//     "エスコンダ工廠":[

//         "鎮座する機蠍",
//         "多脚艦上の奮戦",

//     ],
//     "第5再開発島ラナクア":[

//         "晴空下の熱風",
//         "暗雲喚ぶ連合戦",
//         "激闘の緑島",
//         "夕日煌く戦野",
//         "疾風迅炎",
//         "海端迎撃戦",
//     ],
//     "ナヴァル岩石砂漠":[

//         "赤土の連合戦",
//         "戦端の大鉄橋",
//         "断崖の相克",

//     ],
// }
