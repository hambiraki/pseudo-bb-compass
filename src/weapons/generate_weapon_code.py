from os import path
from weapon_status import model_to_series, series_name


def generate_a_weapon_code(weapon: str) -> None:
    """
    武器のコードを書く
    """
    weapon_name = series_name[weapon]
    models = [model for model, series in model_to_series if series == weapon]

    filename = to_kebab_case(weapon)
    classname = to_pascal_case(weapon)
    filepath = path.dirname(__file__)
    with open(f"{filepath}\\{filename}.ts", mode="w", encoding="utf-8") as file:
        file.write(
            "\n".join(
                generate_import()
                + []
                + generate_factory(classname, models)
                + []
                + generate_figure(classname, weapon_name)
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
    for weapon in series_name:
        generate_a_weapon_code(weapon)
    generate_weapon_factory()
