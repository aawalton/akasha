import type { Bonuses } from "akasha/temper/catalog/temper-gear/properties/bonuses.page-property-entry.types.ts"
import type { EsoSetId } from "akasha/temper/catalog/temper-gear/properties/eso-set-id.number-property.types.ts"
import type { Icons } from "akasha/temper/catalog/temper-gear/properties/icons.page-property-entry.types.ts"
import type { SetClassId } from "akasha/temper/catalog/temper-gear/properties/set-class-id.text-property.types.ts"
import type { ValidPieces } from "akasha/temper/catalog/temper-gear/properties/valid-pieces.text-property.types.ts"
import type { SubcategoryId } from "akasha/temper/catalog/things/properties/subcategory-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperSet = TemperCatalogThing & {
  key: Key
  esoSetId: EsoSetId
  subcategoryId: SubcategoryId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
}
