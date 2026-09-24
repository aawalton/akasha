import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { PoiName } from "akasha/temper/catalog/thing/properties/poi-name.text-property.types.ts"
import type { PoiIndex } from "akasha/temper/catalog/world/zone/properties/poi-index.number-property.types.ts"
import type { PoiType } from "akasha/temper/catalog/world/zone/properties/poi-type.number-property.types.ts"
import type { PoiTypeLabel } from "akasha/temper/catalog/world/zone/properties/poi-type-label.text-property.types.ts"

export type Pois = "jsonl"

export type PoisRow = {
  id: Id
  poiType: PoiType
  poiTypeLabel: PoiTypeLabel
  poiIndex: PoiIndex
  poiName: PoiName
}
