import { MAP_INDEX_DATA } from "../map-data-index/map-data-index.module.code.ts"
import { MAP_DATA_ZONES_00 } from "../map-data-zones-00/map-data-zones-00.module.code.ts"
import { MAP_DATA_ZONES_01 } from "../map-data-zones-01/map-data-zones-01.module.code.ts"
import { MAP_DATA_ZONES_02 } from "../map-data-zones-02/map-data-zones-02.module.code.ts"

export const MAP_DATA = {
  ...MAP_DATA_ZONES_00,
  ...MAP_DATA_ZONES_01,
  mapIndexData: MAP_INDEX_DATA,
  ...MAP_DATA_ZONES_02,
}
