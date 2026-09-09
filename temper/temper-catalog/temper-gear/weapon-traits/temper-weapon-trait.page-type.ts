import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperWeaponTrait = TemperCatalogThing

export const temperWeaponTrait = {
  id: "01a05fd1-d442-7175-b5e4-f7ef9e21a36c",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-trait",
  definition: "a property a weapon is worked with",
  pluralSlug: "temper-weapon-traits",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
