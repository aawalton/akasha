import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoEnchantConstantName } from "../properties/eso-enchant-constant-name.text-property.ts"
import type { EssenceRune } from "../properties/essence-rune.text-property.ts"
import type { GlyphName } from "../properties/glyph-name.text-property.ts"
import type { ItemLevel } from "../properties/item-level.text-property.ts"
import type { PotionSeconds } from "../properties/potion-seconds.number-property.ts"
import type { ValidSlots } from "../properties/valid-slots.text-property.ts"

export type TemperGearThing = TemperCatalogThing & {
  glyphName?: GlyphName
  essenceRune?: EssenceRune
  esoEnchantConstantName?: EsoEnchantConstantName
  validSlots?: ValidSlots
  level?: ItemLevel
  seconds?: PotionSeconds
}

export const temperGearThing = {
  id: "01a05fcc-41ef-7386-84ed-43fb6534121e",
  pageTypeSlug: "page-type",
  slug: "temper-gear-thing",
  definition: "anything a character wears, wields or brews",
  pluralSlug: "temper-gear-things",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: [
    "number-property/potion-seconds",
    "text-property/buff-id",
    "text-property/debuff-id",
    "text-property/essence-rune",
    "text-property/eso-enchant-constant-name",
    "text-property/glyph-name",
    "text-property/item-level",
    "text-property/valid-slots",
  ],
  properties: [
    { pagePropertySlug: "glyph-name", required: false, many: false },
    { pagePropertySlug: "essence-rune", required: false, many: false },
    { pagePropertySlug: "eso-enchant-constant-name", required: false, many: false },
    { pagePropertySlug: "valid-slots", required: false, many: true, max: null },
    { pagePropertySlug: "item-level", required: false, many: false },
    { pagePropertySlug: "potion-seconds", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key two gear page types both carry is declared here rather than in each.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which buff a drink grants is a field of the shared effect shape rather than a key here.",
    },
  ],
} as const satisfies PageType
