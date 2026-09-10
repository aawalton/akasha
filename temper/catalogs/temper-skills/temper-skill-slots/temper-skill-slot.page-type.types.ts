import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperSkillSlot = TemperCatalogThing & {
  key: Key
}
