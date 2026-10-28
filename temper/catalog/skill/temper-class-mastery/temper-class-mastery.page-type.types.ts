import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { EsoAbilityId } from "akasha/temper/catalog/ability/properties/eso-ability-id.number-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { SkillLineClass } from "akasha/temper/catalog/skill/line/properties/skill-line-class.relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperClassMastery = TemperCatalogThing & {
  key: Key
  description: Description
  esoAbilityId: EsoAbilityId
  class: SkillLineClass
  hashPlace: HashPlace
}
