import { DUAL_ZONE_COMPONENTS, FAKE_ZONE_IDS } from "./data/zones"
import { strings } from "./locale/ui-strings"

export function specialZoneName(zoneId: number): string | undefined {
  if (zoneId === FAKE_ZONE_IDS.ALLZONES) {
    return strings.ZONENAME_ALLZONES
  }
  if (zoneId === FAKE_ZONE_IDS.BGS) {
    return strings.ZONENAME_BGS
  }
  const components = DUAL_ZONE_COMPONENTS[zoneId]
  if (components !== undefined) {
    return ZO_CachedStrFormat(
      "<<C:1>>, <<C:2>>",
      GetZoneNameById(components[0]),
      GetZoneNameById(components[1])
    )
  }
  return undefined
}

export function zoneDisplayName(zoneId: number): string {
  if (zoneId < FAKE_ZONE_IDS.ALLZONES) {
    return ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))
  }
  return specialZoneName(zoneId) ?? ""
}
