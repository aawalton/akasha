import type { TemperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.types.ts"

export const brittle = {
  id: "01a05fce-2945-7848-a8b9-10d16b7215f6",
  type: "page-type/temper-affix-script",
  slug: "brittle",
  title: "Brittle",
  key: "brittle",
  icon: "/esoui/art/icons/scribing_tertiary_brittle.dds",
  itemId: 204615,
  uespId: 67,
  slotType: "affix-slot",
  appliedDebuffs: ["temper-debuff-minor/minor-brittle"],
} as const satisfies TemperAffixScript
