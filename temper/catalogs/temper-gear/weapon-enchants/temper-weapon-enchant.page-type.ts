import type { PageType } from "@akasha/pages/page-type"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.ts"

export type TemperWeaponEnchant = TemperGearThing

export const temperWeaponEnchant = {
  id: "01a05fd1-d441-7e40-89d2-1fcb87133420",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-enchant",
  definition: "a glyph put on a weapon",
  pluralSlug: "temper-weapon-enchants",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
