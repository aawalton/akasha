import type { Bonuses } from "../../../catalogs/temper-gear/properties/bonuses.page-property-entry.ts"
import type { EsoSetId } from "../../../catalogs/temper-gear/properties/eso-set-id.number-property.ts"
import type { Icons } from "../../../catalogs/temper-gear/properties/icons.page-property-entry.ts"
import type { SetClassId } from "../../../catalogs/temper-gear/properties/set-class-id.text-property.ts"
import type { ValidPieces } from "../../../catalogs/temper-gear/properties/valid-pieces.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSet = TemperCatalogThing & {
  key: Key
  esoSetId: EsoSetId
  subcategoryId: SubcategoryId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
}
