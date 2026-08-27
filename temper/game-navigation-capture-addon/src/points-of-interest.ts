import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import type {
  PoiCatalogEntry,
  PoiCatalogZone,
} from "@temper/game-navigation-capture-core/poi-catalog"
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
