import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const vitality = {
  id: "01a05fce-294d-7a8c-add3-726775351b58",
  type: "temper-affix-script",
  slug: "vitality",
  title: "Vitality",
  key: "vitality",
  icon: "/esoui/art/icons/scribing_tertiary_vitality.dds",
  itemId: 204598,
  uespId: 50,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
