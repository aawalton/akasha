import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const lifesteal = {
  id: "01a05fce-294a-75c2-8a78-abc3f5175db6",
  type: "temper-affix-script",
  slug: "lifesteal",
  title: "Lifesteal",
  key: "lifesteal",
  icon: "/esoui/art/icons/scribing_tertiary_lifesteal.dds",
  itemId: 204613,
  uespId: 65,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
