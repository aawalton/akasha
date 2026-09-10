import type { Key } from "../../../things/properties/key.text-property.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { Bonuses } from "../properties/bonuses.page-property-entry.types.ts"
import type { EsoSetId } from "../properties/eso-set-id.number-property.ts"
import type { Icons } from "../properties/icons.page-property-entry.types.ts"
import type { SetClassId } from "../properties/set-class-id.text-property.ts"
import type { ValidPieces } from "../properties/valid-pieces.text-property.ts"

export type TemperSet = TemperCatalogThing & {
  key: Key
  esoSetId: EsoSetId
  subcategoryId: SubcategoryId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
}
