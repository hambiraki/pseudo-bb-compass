from os import path

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
        'import { Length } from "@/units";',
        'import { WeaponOnMinimap } from "./weapon-on-minimap";',
        'import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";',
        'import type { ModelFactory } from "./weapon-factory";',
    ]


def generate_factory(variable_name: str, models: list[str]) -> list[str]:
    return (
        [
            " /**",
            "  * @package",
            "  */",
            f" export class {variable_name}Factory implements ModelFactory{{",
            "     static readonly modelNames = [",
        ]
        + [f'         "{model}",' for model in models]
        + [
            "     ] as const;",
            "     get modelNames():readonly string[] {",
            f"         return {variable_name}Factory.modelNames;",
            "     }",
            f"     create = (modelName:typeof {variable_name}Factory.modelNames[number]):WeaponOnMinimap => {{",
            "         switch(modelName){",
        ]
        + sum(
            [
                [
                    f'             case "{model}":',
                    f"                 return new WeaponOnMinimap(new {variable_name}());",
                ]
                for model in models
            ],
            [],
        )
        + [
            "         }",
            "     }",
            " }",
        ]
    )


def generate_figure(variable_name: str, series: str) -> list[str]:
    return [
        f" // {series}系統",
        f" class {variable_name} implements Area{{",
        "     constructor(){};",
        "     whole = (location:Coordinates, rotation:Rotation):Path2D => {",
        "         const area = new Path2D();",
        "",
        "         return area;",
        "     };",
        "     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{",
        "",
        "     };",
        " }",
    ]


if __name__ == "__main__":
    main()
