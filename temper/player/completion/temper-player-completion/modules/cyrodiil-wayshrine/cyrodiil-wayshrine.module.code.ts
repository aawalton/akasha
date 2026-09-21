const CYRODIIL_ZONE_ID = 181
const WAYSHRINE_POI_TYPE = 1

export function isCyrodiilWayshrine(zoneId: number, poiType: number): boolean {
  return zoneId === CYRODIIL_ZONE_ID && poiType === WAYSHRINE_POI_TYPE
}
