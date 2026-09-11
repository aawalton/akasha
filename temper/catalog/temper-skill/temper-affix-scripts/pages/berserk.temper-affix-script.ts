import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const berserk = {
  id: "01a05fce-2944-70a0-88d6-b7e0897de2ec",
  type: "temper-affix-script",
  slug: "berserk",
  title: "Berserk",
  key: "berserk",
  icon: "/esoui/art/icons/scribing_tertiary_berserk.dds",
  itemId: 204599,
  uespId: 51,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
