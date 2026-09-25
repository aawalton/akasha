import type { TemperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.types.ts"

export const magickasteal = {
  id: "01a05fce-294a-7250-92a8-756e497c0709",
  type: "page-type/temper-affix-script",
  slug: "magickasteal",
  title: "Magickasteal",
  key: "magickasteal",
  icon: "/esoui/art/icons/scribing_tertiary_magickasteal.dds",
  itemId: 204617,
  uespId: 69,
  slotType: "affix-slot",
  appliedDebuffs: ["temper-debuff-minor/minor-magickasteal"],
} as const satisfies TemperAffixScript
