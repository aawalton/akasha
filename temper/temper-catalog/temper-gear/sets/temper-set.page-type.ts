import type { PageType } from "@akasha/pages/page-type"
import type { Bonuses } from "../../../catalogs/temper-gear/properties/bonuses.page-property-entry.ts"
import type { EsoSetId } from "../../../catalogs/temper-gear/properties/eso-set-id.number-property.ts"
import type { Icons } from "../../../catalogs/temper-gear/properties/icons.page-property-entry.ts"
import type { SetClassId } from "../../../catalogs/temper-gear/properties/set-class-id.text-property.ts"
import type { ValidPieces } from "../../../catalogs/temper-gear/properties/valid-pieces.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.ts"

export type TemperSet = TemperCatalogThing & {
  esoSetId: EsoSetId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
}

export const temperSet = {
  id: "01a05fd1-d441-7c97-bedf-3316d7b4361a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-set",
  definition: "a run of pieces giving more the more of them are worn",
  pluralSlug: "temper-sets",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/bonus-count",
    "number-property/eso-set-id",
    "page-property-entry/bonuses",
    "page-property-entry/icons",
    "record-property/bonus-effects",
    "text-property/bonus-status",
    "text-property/icon-slot",
    "text-property/set-class-id",
    "text-property/valid-pieces",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/eso-set-id", required: true, many: false },
    { pageProperty: "text-property/subcategory-id", required: true, many: false },
    { pageProperty: "page-property-entry/bonuses", required: true, many: false },
    { pageProperty: "page-property-entry/icons", required: true, many: false },
    { pageProperty: "text-property/valid-pieces", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/set-class-id", required: false, many: false },
  ],
} as const satisfies PageType
