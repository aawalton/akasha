import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { Bonuses } from "../properties/bonuses.page-property-entry.ts"
import type { EsoSetId } from "../properties/eso-set-id.number-property.ts"
import type { Icons } from "../properties/icons.page-property-entry.ts"
import type { SetClassId } from "../properties/set-class-id.text-property.ts"
import type { ValidPieces } from "../properties/valid-pieces.text-property.ts"

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
  slug: "temper-set",
  definition: "a run of pieces giving more the more of them are worn",
  pluralSlug: "temper-sets",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: [
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
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "eso-set-id", required: true, many: false },
    { pagePropertySlug: "subcategory-id", required: true, many: false },
    { pagePropertySlug: "bonuses", required: true, many: false },
    { pagePropertySlug: "icons", required: true, many: false },
    { pagePropertySlug: "valid-pieces", required: true, many: true, max: null },
    { pagePropertySlug: "set-class-id", required: false, many: false },
  ],
} as const satisfies PageType
