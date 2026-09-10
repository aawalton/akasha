import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { AltName } from "../properties/alt-name.text-property.ts"
import type { EsoRaceId } from "../properties/eso-race-id.number-property.ts"

export type TemperRace = TemperCatalogThing & {
  key: Key
  altName?: AltName
  esoRaceId: EsoRaceId
}
