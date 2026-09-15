import type { EsoCraftTypeId } from "akasha/temper/catalog/temper-pursuit/temper-craft-type/properties/eso-craft-type-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperCraftType = TemperPursuitThing & {
  esoCraftTypeId: EsoCraftTypeId
}
