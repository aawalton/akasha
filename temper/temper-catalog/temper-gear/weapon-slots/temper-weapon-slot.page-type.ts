import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperWeaponSlot = TemperCatalogThing

export const temperWeaponSlot = {
  id: "01a05fd1-d442-7dfe-a4bd-c74ac70298ff",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-slot",
  definition: "a hand or a bar a weapon is held in",
  pluralSlug: "temper-weapon-slots",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
