import type { PageType } from "@akasha/pages/page-type"
import type { ArmorMultiplier } from "../properties/armor-multiplier.number-property.ts"
import type { IsLargeEnchantSlot } from "../properties/is-large-enchant-slot.boolean-property.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.ts"

export type TemperArmorType = TemperGearThing & {
  armorMultiplier: ArmorMultiplier
  isLargeEnchantSlot: IsLargeEnchantSlot
}

export const temperArmorType = {
  id: "01a05fd1-d430-77ed-ace6-98856e2a09d7",
  pageTypeSlug: "page-type",
  slug: "temper-armor-type",
  definition: "a kind of armor piece, apart from the weight it is made at",
  pluralSlug: "temper-armor-types",
  extends: ["page-type/temper-gear-thing"],
  parts: ["boolean-property/is-large-enchant-slot", "number-property/armor-multiplier"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor-multiplier", required: true, many: false },
    { pageProperty: "boolean-property/is-large-enchant-slot", required: true, many: false },
    { pageProperty: "text-property/valid-slots", required: true, many: true, maxCount: null },
  ],
} as const satisfies PageType
