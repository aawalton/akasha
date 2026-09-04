export interface PoiCatalogEntry {
  name: string
  poiType: number
}

export interface PoiCatalogZone {
  name: string
  pois: Record<number, PoiCatalogEntry>
}
