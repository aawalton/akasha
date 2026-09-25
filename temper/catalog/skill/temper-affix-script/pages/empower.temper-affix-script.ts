import type { TemperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.types.ts"

export const empower = {
  id: "01a05fce-2947-7ed4-9877-765dddb7e1ff",
  type: "page-type/temper-affix-script",
  slug: "empower",
  title: "Empower",
  key: "empower",
  icon: "/esoui/art/icons/scribing_tertiary_empower.dds",
  itemId: 204601,
  uespId: 53,
  slotType: "affix-slot",
  grantedBuffs: ["temper-buff-other/empower"],
} as const satisfies TemperAffixScript
