import type { EsoCraftTypeId } from "akasha/temper/catalog/temper-pursuits/temper-craft-types/properties/eso-craft-type-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"

export type TemperCraftType = TemperPursuitThing & {
  esoCraftTypeId: EsoCraftTypeId
}
