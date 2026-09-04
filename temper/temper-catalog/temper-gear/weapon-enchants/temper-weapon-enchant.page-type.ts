import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperWeaponEnchant = TemperGearThing

export const temperWeaponEnchant = {
  id: "01a05fd1-d441-7e40-89d2-1fcb87133420",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-enchant",
  definition: "a glyph put on a weapon",
  pluralSlug: "temper-weapon-enchants",
  extendsSlug: "page-type/temper-gear-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-enchant-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
