import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
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
