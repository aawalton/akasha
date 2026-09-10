import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Antiquities } from "./properties/antiquities.page-property-entry.types.ts"
import type { EsoAntiquityCategoryId } from "./properties/eso-antiquity-category-id.number-property.types.ts"

export type TemperAntiquityCategory = TemperPursuitThing & {
  esoAntiquityCategoryId: EsoAntiquityCategoryId
  antiquities: Antiquities
}
