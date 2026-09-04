import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type { PoiCatalogEntry, PoiCatalogZone } from "@akasha/temper-capture-shapes/poi-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

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
