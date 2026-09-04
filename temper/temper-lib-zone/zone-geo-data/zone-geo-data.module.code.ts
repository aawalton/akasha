import { ZONE_GEO_DATA_00 } from "../zone-geo-data-00/zone-geo-data-00.module.code.ts"
import { ZONE_GEO_DATA_01 } from "../zone-geo-data-01/zone-geo-data-01.module.code.ts"
import { ZONE_GEO_DATA_02 } from "../zone-geo-data-02/zone-geo-data-02.module.code.ts"

export const GEO_DATA_REFERENCE_TABLE: Record<number, Record<number, number>> = {
  ...ZONE_GEO_DATA_00,
  ...ZONE_GEO_DATA_01,
  ...ZONE_GEO_DATA_02,
}
