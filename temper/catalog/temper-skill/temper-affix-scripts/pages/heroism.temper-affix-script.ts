import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const heroism = {
  id: "01a05fce-2949-700f-8c3d-41f5315e6ca5",
  type: "temper-affix-script",
  slug: "heroism",
  title: "Heroism",
  key: "heroism",
  icon: "/esoui/art/icons/scribing_tertiary_heroism.dds",
  itemId: 204604,
  uespId: 56,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
