/**
 * 旧ブロア市街地
 */

import type { MapSituation } from ".";

/**
 * @package
 */
export class BlouerFactory implements MapSituation{
    static readonly situations = [
        "熱戦の河畔",
        "激戦の丘",
        "街路制圧戦",
    ] as const;
    get situations():readonly string[]{
        return this.situations;
    };
    create(situation:string):WeaponOnMinimap;
}