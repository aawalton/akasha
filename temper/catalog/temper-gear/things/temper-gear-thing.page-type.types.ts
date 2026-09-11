import type { EsoEnchantConstantName } from "akasha/temper/catalog/temper-gear/properties/eso-enchant-constant-name.text-property.types.ts"
import type { EssenceRune } from "akasha/temper/catalog/temper-gear/properties/essence-rune.text-property.types.ts"
import type { GlyphName } from "akasha/temper/catalog/temper-gear/properties/glyph-name.text-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/temper-gear/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/temper-gear/properties/potion-seconds.number-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/temper-gear/properties/valid-slots.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperGearThing = TemperCatalogThing & {
  glyphName?: GlyphName
  essenceRune?: EssenceRune
  esoEnchantConstantName?: EsoEnchantConstantName
  validSlots?: ValidSlots
  level?: ItemLevel
  seconds?: PotionSeconds
}
