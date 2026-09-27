import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { AltName } from "akasha/temper/catalog/world/temper-race/properties/alt-name.text-property.types.ts"
import type { EsoRaceId } from "akasha/temper/catalog/world/temper-race/properties/eso-race-id.number-property.types.ts"
import type { RacialSkillLine } from "akasha/temper/catalog/world/temper-race/properties/racial-skill-line.relation-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperRace = TemperCatalogThing & {
  key: Key
  altName?: AltName
  esoRaceId: EsoRaceId
  racialSkillLine?: RacialSkillLine
  hashPlace: HashPlace
}
