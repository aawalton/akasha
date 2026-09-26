import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperItemBrowserSource } from "akasha/temper/catalog/world/item-browser-source/temper-item-browser-source.page-type.ts"
import type { TemperItemBrowserSource } from "akasha/temper/catalog/world/item-browser-source/temper-item-browser-source.page-type.types.ts"
import { temperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.ts"
import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

type Zone = Pick<TemperWorldZone, "esoZoneId" | "itemBrowserPlaceKind">

type Source = Pick<TemperItemBrowserSource, "itemBrowserSourceId" | "itemBrowserPlaceKind">

function kindsOf(this: void): { [placeId: number]: number | undefined } {
  const kinds: { [placeId: number]: number | undefined } = {}
  for (const zone of $pagesOfType<Zone>(temperWorldZone)) {
    if (zone.esoZoneId !== undefined) kinds[zone.esoZoneId] = zone.itemBrowserPlaceKind
  }
  for (const source of $pagesOfType<Source>(temperItemBrowserSource)) {
    kinds[source.itemBrowserSourceId] = source.itemBrowserPlaceKind
  }
  return kinds
}

export const PLACE_KINDS: { readonly [placeId: number]: number | undefined } = kindsOf()
