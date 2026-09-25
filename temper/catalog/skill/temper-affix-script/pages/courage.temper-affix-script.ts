import type { TemperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.types.ts"

export const courage = {
  id: "01a05fce-2946-77b9-a527-96c82a31e1b7",
  type: "page-type/temper-affix-script",
  slug: "courage",
  title: "Courage",
  key: "courage",
  icon: "/esoui/art/icons/scribing_tertiary_courage.dds",
  itemId: 204603,
  uespId: 55,
  slotType: "affix-slot",
  grantedBuffs: ["temper-buff-minor/minor-courage"],
} as const satisfies TemperAffixScript
