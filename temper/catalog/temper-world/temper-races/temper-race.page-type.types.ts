import type { AltName } from "akasha/temper/catalog/temper-world/properties/alt-name.text-property.types.ts"
import type { EsoRaceId } from "akasha/temper/catalog/temper-world/properties/eso-race-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperRace = TemperCatalogThing & {
  key: Key
  altName?: AltName
  esoRaceId: EsoRaceId
}
