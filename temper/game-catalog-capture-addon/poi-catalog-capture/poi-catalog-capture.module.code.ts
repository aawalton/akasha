import "akasha/temper/eso-types/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"

import type {
  PoiCatalogEntry,
  PoiCatalogZone,
} from "akasha/temper/capture-shapes/poi-catalog/poi-catalog.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

export function collectPoiCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, PoiCatalogZone> = {}

  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined && zoneId !== 0) {
    const zoneName = zo_strformat("<<1>>", GetZoneNameById(zoneId))
    const zoneIndex = GetZoneIndex(zoneId)
    const numPOIs = GetNumPOIs(zoneIndex)
    const pois: Record<number, PoiCatalogEntry> = {}

    for (let poiIndex = 1; poiIndex <= numPOIs; poiIndex++) {
      const [poiName] = GetPOIInfo(zoneIndex, poiIndex)
      if (poiName === undefined || poiName === "") continue
      const name = zo_strformat("<<1>>", poiName)
      const poiType = GetPOIType(zoneIndex, poiIndex)
      pois[poiIndex] = { name, poiType }
    }

    if (Object.keys(pois).length > 0) {
      catalog[zoneId] = { name: zoneName, pois }
    }

    zoneId = GetNextZoneStoryZoneId(zoneId)
  }

  savedVars.poiCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "poiCatalog", collect: collectPoiCatalog })
