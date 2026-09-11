import type { Antiquities } from "akasha/temper/catalog/temper-pursuits/temper-antiquity-categories/properties/antiquities.page-property-entry.types.ts"
import type { EsoAntiquityCategoryId } from "akasha/temper/catalog/temper-pursuits/temper-antiquity-categories/properties/eso-antiquity-category-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"

export type TemperAntiquityCategory = TemperPursuitThing & {
  esoAntiquityCategoryId: EsoAntiquityCategoryId
  antiquities: Antiquities
}
