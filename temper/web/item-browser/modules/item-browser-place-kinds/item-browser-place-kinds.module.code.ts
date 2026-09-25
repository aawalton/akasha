import { antiquities } from "akasha/temper/catalog/world/item-browser-source/pages/antiquities.temper-item-browser-source.ts"
import { battlegrounds } from "akasha/temper/catalog/world/item-browser-source/pages/battlegrounds.temper-item-browser-source.ts"
import { randomDungeon } from "akasha/temper/catalog/world/item-browser-source/pages/random-dungeon.temper-item-browser-source.ts"
import { rewardsForTheWorthy } from "akasha/temper/catalog/world/item-browser-source/pages/rewards-for-the-worthy.temper-item-browser-source.ts"
import { ZONES_A_TO_G } from "akasha/temper/web/item-browser/modules/item-browser-zones-a-to-g/item-browser-zones-a-to-g.module.code.ts"
import { ZONES_H_TO_Z } from "akasha/temper/web/item-browser/modules/item-browser-zones-h-to-z/item-browser-zones-h-to-z.module.code.ts"

const SOURCES = [antiquities, battlegrounds, randomDungeon, rewardsForTheWorthy]

function kindsOf(this: void): { [placeId: number]: number | undefined } {
  const kinds: { [placeId: number]: number | undefined } = {}
  for (const zone of [...ZONES_A_TO_G, ...ZONES_H_TO_Z]) {
    kinds[zone.esoZoneId] = zone.itemBrowserPlaceKind
  }
  for (const source of SOURCES) kinds[source.itemBrowserSourceId] = source.itemBrowserPlaceKind
  return kinds
}

export const PLACE_KINDS: { readonly [placeId: number]: number | undefined } = kindsOf()
