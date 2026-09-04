import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperWeaponSlot = TemperCatalogThing

export const temperWeaponSlot = {
  id: "01a05fd1-d442-7dfe-a4bd-c74ac70298ff",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-slot",
  definition: "a hand or a bar a weapon is held in",
  pluralSlug: "temper-weapon-slots",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
