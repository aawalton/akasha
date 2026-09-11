import type { TemperAffixScript } from "akasha/temper/catalog/temper-skill/temper-affix-scripts/temper-affix-script.page-type.types.ts"

export const interrupt = {
  id: "01a05fce-2949-750d-b0e4-d23cd601a23f",
  type: "temper-affix-script",
  slug: "interrupt",
  title: "Interrupt",
  key: "interrupt",
  icon: "/esoui/art/icons/scribing_tertiary_interrupt.dds",
  itemId: 204593,
  uespId: 45,
  slotType: "affix-slot",
} as const satisfies TemperAffixScript
