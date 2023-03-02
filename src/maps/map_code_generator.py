"""
各マップに対応するMapFieldファクトリーコードを生成する
"""

map_names = {
    [
        "scabi",
        "スカービ渓谷",
        [
            "戦線突破",
            "砂上の激突",
        ],
    ],
    [
        "island3rd",
        "第３採掘島",
        [
            "臨海決戦",
            "夕暮れの戦火",
            "黄昏の連合戦",
            "塔上の攻防",
            "沿岸迎撃戦",
        ],
    ],
    [
        "brower",
        "旧ブロア市街地",
        [
            "熱戦の河畔",
            "激戦の丘",
            "街路制圧戦",
        ],
    ],
    [
        "tlaza",
        "トラザ山岳基地",
        [
            "砂塵の死線",
        ],
    ],
    [
        "memnos",
        "研究都市メムノス",
        [
            "蒼穹貫く翡翠樹",
            "窮迫決壊",
            "夕刻に燃ゆ",
            "激闘の翠都",
        ],
    ],
    [
        "sector9th",
        "極地観測所セクター9",
        [
            "軋轢の天望坐",
            "天空への架け橋",
            "駆動壁の迎撃戦",
        ],
    ],
    [
        "kinich",
        "キニシュ砂岸",
        [
            "白砂進軍",
            "波打際の熱闘",
            "汀の連合戦",
            "南海の迎撃戦",
        ],
    ],
    [
        "d51",
        "放棄区画D51",
        [
            "白銀死都",
            "氷点下の鳴動",
            "雪映えの赤光",
            "激闘の氷域",
        ],
    ],
    [
        "valerio",
        "城塞都市バレリオ",
        [
            "強攻水路",
            "城跡の連合戦",
            "飛天交叉",
            "迫水制領",
        ],
    ],
    [
        "belsk",
        "極洋基地ベルスク",
        [
            "凍て付く戦陣",
            "純白の先途",
            "反目の凍視線",
        ],
    ],
    [
        "narrowly",
        "ナローレイ深地隙",
        [
            "騒乱の幽谷",
            "陰る深淵にて",
            "激闘の森林",
        ],
    ],
    [
        "hopeside",
        "ホープサイド市街地",
        [
            "都市侵襲",
            "運河に見ゆ",
        ],
    ],
    [
        "plan",
        "ブラスト操練場",
        [
            "PLAN-U2",
            "PLAN-K",
            "PLAN-Y",
        ],
    ],
    [
        "wuhai",
        "ウーハイ産業港",
        [
            "要衝襲撃",
            "暁天銃火",
            "残照の閃光",
        ],
    ],
    [
        "nesos",
        "ネソス島実験ドーム",
        [
            "構造α－01",
            "激闘の円蓋",
            "構造β－05",
            "魔窟迎撃戦",
            "構造β－90",
        ],
    ],
    [
        "beanavis",
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
        "skyscraper19th",
        "第19号高層サイト",
        [
            "天柱の兵火",
            "高高度電撃戦",
            "激闘の高楼",
            "奇策縦横",
        ],
    ],
    [
        "longsha",
        "ロンシャ深山",
        [
            "山門の抗衡",
            "晴嵐の連合戦",
            "白霧潜攻",
        ],
    ],
    [
        "field",
        "ブラスト機体試験場",
        [
            "FIELD-D",
            "FIELD-S",
            "FIELD-A",
        ],
    ],
    [
        "malinasedna",
        "マリナセドナ大雪山",
        [
            "銀雪覆う黒煤",
            "天牢雪獄の激闘",
        ],
    ],
    [
        "almire",
        "アルマイヤ大砂海",
        [
            "砂塵舞う壊都市",
            "月下伯仲",
            "茫漠の連合戦",
            "焦熱の砲号",
        ],
    ],
    [
        "eos",
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
    [
        "madelrond",
        "マデルロンド大空洞",
        [
            "地底の接敵",
            "深部暗闘",
        ],
    ],
    [
        "gerberg",
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
    [
        "maunaele",
        "マウナ・エレ溶岩流域",
        [
            "怒れる火の神",
            "烽火連天",
            "激闘の火杭",
        ],
    ],
    [
        "denebra",
        "デ・ネブラ大落片",
        [
            "雨下応酬",
            "激闘の高地",
            "暴雨の連合戦",
            "山嵐迎撃戦",
            "崖下乱戦",
        ],
    ],
    [
        "m532",
        "M532バイオドーム",
        [
            "未開の繭",
            "打草驚蛇",
        ],
    ],
    [
        "esconda",
        "エスコンダ工廠",
        [
            "鎮座する機蠍",
            "多脚艦上の奮戦",
        ],
    ],
    [
        "lanakua5th",
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
    [
        "navar",
        "ナヴァル岩石砂漠",
        [
            "赤土の連合戦",
            "戦端の大鉄橋",
            "断崖の相克",
        ],
    ],
}
