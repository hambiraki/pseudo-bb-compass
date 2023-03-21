from os import path

model_to_series = {
    "索敵センサー": "sensor",
    "小型索敵センサー": "sensor",
    "広域索敵センサー": "sensor",
    "新型索敵センサー": "sensor",
    "ND索敵センサー": "nd_sensor",
    "小型ND索敵センサー": "nd_sensor",
    "広域ND索敵センサー": "nd_sensor",
    "BRトラッカー": "br_tracker",
    "集中型BRトラッカー": "br_tracker",
    "広域型BRトラッカー": "br_tracker",
    "滞空索敵弾": "balloon",
    "小型滞空索敵弾": "balloon",
    "広域滞空索敵弾": "balloon",
    "高機能滞空索敵弾": "balloon",
    "Vセンサー投射器": "v_sensor_a",
    "小型Vセンサー投射器": "v_sensor_a",
    "広域Vセンサー投射器": "v_sensor_a",
    "H-Vセンサー投射器": "v_sensor_a",
    "Vセンサー投射器": "v_sensor_b",
    "小型Vセンサー投射器": "v_sensor_b",
    "広域Vセンサー投射器": "v_sensor_b",
    "H-Vセンサー投射器": "v_sensor_b",
    "ラーク偵察機": "scoutor",
    "ファルコン偵察機": "scoutor",
    "ストーク偵察機": "scoutor",
    "アウル偵察機": "scoutor",
    "ロビン偵察機": "scoutor",
    "カナリア偵察機": "scoutor",
    "マグ": "scoutor",
    "クリアリングソナー": "sonar",
    "クリアリングソナーM": "sonar",
    "クリアリングソナーW": "sonar",
    "レーダーユニット": "rader",
    "レーダーユニットⅡ": "rader",
    "レーダーユニットⅢ": "rader",
    "偵察要請装置": "bolt_on_unit",
    "FJ－アジテーター": "agitator",
    "FJ－アジテーターC": "agitator",
    "FJ－ジャバウォック": "agitator",
}

series_name = {
    "sensor": "索敵センサー",
    "nd_sensor": "ND索敵センサー",
    "br_tracker": "BRトラッカー",
    "balloon": "滞空索敵弾",
    "v_sensor_a": "Vセンサー投射器A",
    "v_sensor_b": "Vセンサー投射器B",
    "scoutor": "偵察機",
    "sonar": "クリアリングソナー",
    "rader": "レーダーユニット",
    "bolt_on_unit": "要請兵器",
    "agitator": "FJ－アジテーター",
}

series_meta_status = {
    "sensor": ["mRadius"],
    "nd_sensor": ["mRadius"],
    "br_tracker": ["mRadius", "degCenter", "sToFull", "sRetention", "sPause"],
    "balloon": ["mRadius", "sLifetime"],
    "v_sensor_a": ["mRadius"],
    "v_sensor_b": ["mRadius", "sLifetime"],
    "scoutor": ["mRadius", "mpsSpeed", "mDistance"],
    "sonar": ["mRadius"],
    "rader": ["mRadius", "degCenter", "sToFull"],
    "bolt_on_unit": ["mRadius", "mpsSpeed", "mDistance"],
    "agitator": ["mRadius", "sLifetime"],
}

sensor_status = {
    "索敵センサー": [70],
    "小型索敵センサー": [65],
    "広域索敵センサー": [125],
    "新型索敵センサー": [88],
}
nd_sensor_status = {
    "ND索敵センサー": [173],
    "小型ND索敵センサー": [153],
    "広域ND索敵センサー": [286],
}
br_tracker_status = {
    "BRトラッカー": [162, 90, 1.65, 3, 2],
    "集中型BRトラッカー": [142, 120, 2.05, 2, 2],
    "広域型BRトラッカー": [198, 150, 1.67, 6, 2],
}
balloon_status = {
    "滞空索敵弾": [76, 50],
    "小型滞空索敵弾": [65, 60],
    "広域滞空索敵弾": [98, 65],
    "高機能滞空索敵弾": [138, 85],
}
v_sensor_a_status = {
    "Vセンサー投射器": [65],
    "小型Vセンサー投射器": [55],
    "広域Vセンサー投射器": [110],
    "H-Vセンサー投射器": [100],
}
v_sensor_b_status = {
    "Vセンサー投射器": [162, 12],
    "小型Vセンサー投射器": [142, 9],
    "広域Vセンサー投射器": [242, 33],
    "H-Vセンサー投射器": [233, 45],
}
scoutor_status = {
    "ラーク偵察機": [119, 28, 250],
    "ファルコン偵察機": [103, 50, 500],
    "ストーク偵察機": [113, 2.6, 50],
    "アウル偵察機": [142, 14, 220],
    "ロビン偵察機": [220, 20, 150],
    "カナリア偵察機": [266, 25, 80],
    "マグ": [176, 16, 180],
}
sonar_status = {
    "クリアリングソナー": [184],
    "クリアリングソナーM": [174],
    "クリアリングソナーW": [242],
}
rader_status = {
    "レーダーユニット": [259, 60, 1.67],
    "レーダーユニットⅡ": [229, 120, 1.79],
    "レーダーユニットⅢ": [209, 360, 1.77],
}
bolt_on_unit_status = {
    "偵察要請装置": [500, 1200, 1200],
}
agitator_status = {
    "FJ－アジテーター": [37.8, 8.6],
    "FJ－アジテーターC": [32.7, 9.8],
    "FJ－ジャバウォック": [44, 14.3],
}

weapons = [
    ["sensor", "索敵センサー", ["索敵センサー", "小型索敵センサー", "広域索敵センサー", "新型索敵センサー"]],
    ["nd_sensor", "ND索敵センサー", ["ND索敵センサー", "小型ND索敵センサー", "広域ND索敵センサー"]],
    ["br_tracker", "BRトラッカー", ["BRトラッカー", "集中型BRトラッカー", "広域型BRトラッカー"]],
    ["balloon", "滞空索敵弾", ["滞空索敵弾", "小型滞空索敵弾", "広域滞空索敵弾", "高機能滞空索敵弾"]],
    ["v_sensor_a", "Vセンサー投射器A", ["Vセンサー投射器", "小型Vセンサー投射器", "広域Vセンサー投射器", "H-Vセンサー投射器"]],
    ["v_sensor_b", "Vセンサー投射器B", ["Vセンサー投射器", "小型Vセンサー投射器", "広域Vセンサー投射器", "H-Vセンサー投射器"]],
    [
        "scoutor",
        "偵察機",
        ["ラーク偵察機", "ファルコン偵察機", "ストーク偵察機", "アウル偵察機", "ロビン偵察機", "カナリア偵察機", "マグ"],
    ],
    ["sonar", "クリアリングソナー", ["クリアリングソナー", "クリアリングソナーM", "クリアリングソナーW"]],
    ["rader", "レーダーユニット", ["レーダーユニット", "レーダーユニットⅡ", "レーダーユニットⅢ"]],
    ["bolt_on_unit", "要請兵器", ["偵察要請装置"]],
    ["agitator", "FJ－アジテーター", ["FJ－アジテーター", "FJ－アジテーターC", "FJ－ジャバウォック"]],
]


def main() -> None:
    for weapon in weapons:
        generate_a_weapon_code(weapon)
    generate_weapon_factory()


def generate_a_weapon_code(weapon: list[str, str, list[str]]) -> None:
    filename = to_kebab_case(weapon[0])
    classname = to_pascal_case(weapon[0])
    filepath = path.dirname(__file__)
    with open(f"{filepath}\\{filename}.ts", mode="w", encoding="utf-8") as file:
        file.write(
            "\n".join(
                generate_import()
                + []
                + generate_factory(classname, weapon[2])
                + []
                + generate_figure(classname, weapon[1])
            )
        )


def to_pascal_case(weapon_name: str) -> str:
    words = weapon_name.split("_")
    return "".join(word.capitalize() for word in words)


def to_kebab_case(weapon_name: str) -> str:
    words = weapon_name.split("_")
    return "-".join(word.lower() for word in words)


def generate_import() -> list[str]:
    return [
        'import { Coordinates, Length, Angle,type Time } from "@/units";',
        'import { WeaponOnMinimap } from "./weapon-on-minimap";',
        'import type { Area } from "./weapon-on-minimap";',
        'import type { ModelFactory } from "./weapon-factory";',
    ]


def generate_factory(variable_name: str, models: list[str]) -> list[str]:
    return (
        [
            "/**",
            " * @package",
            " */",
            f"export class {variable_name}Factory implements ModelFactory{{",
            "    static readonly modelNames = [",
        ]
        + [f'        "{model}",' for model in models]
        + [
            "    ] as const;",
            "    get modelNames():readonly string[] {",
            f"        return {variable_name}Factory.modelNames;",
            "    }",
            f"    create = (modelName:typeof {variable_name}Factory.modelNames[number]):WeaponOnMinimap => {{",
            "        switch(modelName){",
        ]
        + sum(
            [
                [
                    f'            case "{model}":',
                    f"                return new WeaponOnMinimap(new {variable_name}());",
                ]
                for model in models
            ],
            [],
        )
        + [
            "        }",
            "    }",
            "}",
        ]
    )


def generate_figure(variable_name: str, series: str) -> list[str]:
    return [
        f"// {series}系統",
        f"class {variable_name} implements Area{{",
        "    constructor(){};",
        "    whole = (location:Coordinates, rotation:Angle):Path2D => {",
        "        const area = new Path2D();",
        "",
        "        return area;",
        "    };",
        "    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{",
        "",
        "    };",
        "}",
    ]


def generate_weapon_factory() -> list[str]:
    filepath = path.dirname(__file__)
    with open(f"{filepath}\\weapon-factory.ts", mode="w", encoding="utf-8") as file:
        file.write(
            "\n".join(
                [
                    f'import {{ {to_pascal_case(weapon[0])}Factory }} from "./{to_kebab_case(weapon[0])}";'
                    for weapon in weapons
                ]
                + [
                    'import type { WeaponOnMinimap } from "./weapon-on-minimap";',
                    "export interface ModelFactory{",
                    "    get modelNames():readonly string[];",
                    "    create(modelName:string):WeaponOnMinimap;",
                    "}",
                    "export type SeriesName = typeof SeriesFactory.seriesNames[number];",
                    "export class SeriesFactory{",
                    "    static readonly seriesNames = [",
                ]
                + [f'        "{weapon[1]}",' for weapon in weapons]
                + [
                    "    ] as const;",
                    "    create = (seriesName:SeriesName):ModelFactory => {",
                    "        switch(seriesName){",
                ]
                + sum(
                    [
                        [
                            f'            case "{weapon[1]}":',
                            f"                return new {to_pascal_case(weapon[0])}Factory();",
                        ]
                        for weapon in weapons
                    ],
                    [],
                )
                + [
                    "        }",
                    "    }",
                    "}",
                ]
            )
        )


if __name__ == "__main__":
    main()
