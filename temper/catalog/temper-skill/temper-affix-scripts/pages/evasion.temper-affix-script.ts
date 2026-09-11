import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const evasion = {
  id: "01a05fce-2948-7a22-bae9-b44b833f983a",
  pageTypeSlug: "temper-affix-script",
  type: "temper-affix-script",
  slug: "evasion",
  title: "Evasion",
  key: "evasion",
  icon: "/esoui/art/icons/scribing_tertiary_evasion.dds",
  itemId: 204597,
  uespId: 49,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
