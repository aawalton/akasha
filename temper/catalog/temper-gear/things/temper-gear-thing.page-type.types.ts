import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoEnchantConstantName } from "../properties/eso-enchant-constant-name.text-property.types.ts"
import type { EssenceRune } from "../properties/essence-rune.text-property.types.ts"
import type { GlyphName } from "../properties/glyph-name.text-property.types.ts"
import type { ItemLevel } from "../properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "../properties/potion-seconds.number-property.types.ts"
import type { ValidSlots } from "../properties/valid-slots.text-property.types.ts"

export type TemperGearThing = TemperCatalogThing & {
  glyphName?: GlyphName
  essenceRune?: EssenceRune
  esoEnchantConstantName?: EsoEnchantConstantName
  validSlots?: ValidSlots
  level?: ItemLevel
  seconds?: PotionSeconds
}
