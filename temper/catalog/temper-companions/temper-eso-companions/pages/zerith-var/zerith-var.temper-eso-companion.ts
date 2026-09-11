import type { TemperEsoCompanion } from "akasha/temper/catalog/temper-companions/temper-eso-companions/temper-eso-companion.page-type.types.ts"

export const zerithVar = {
  id: "01a05fcf-5921-7f8a-abd6-ebccbdc3b4f3",
  type: "temper-eso-companion",
  slug: "zerith-var",
  key: "zerith-var",
  title: "Zerith-var",
  icon: "/esoui/art/icons/u44_companion_zerith.dds",
  subtitle: "The Necromancer",
  alliance: "aldmeri-dominion",
  esoCompanionId: 13,
  classPassiveId: "zerith-var-third-moons-chosen",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
