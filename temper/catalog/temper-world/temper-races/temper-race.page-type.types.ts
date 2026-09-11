import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { AltName } from "../properties/alt-name.text-property.types.ts"
import type { EsoRaceId } from "../properties/eso-race-id.number-property.types.ts"

export type TemperRace = TemperCatalogThing & {
  key: Key
  altName?: AltName
  esoRaceId: EsoRaceId
}
