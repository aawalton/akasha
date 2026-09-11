import type { TemperEsoCompanion } from "akasha/temper/catalog/temper-companions/temper-eso-companions/temper-eso-companion.page-type.types.ts"

export const isobel = {
  id: "01a05fcf-591f-7d0a-906f-b8555838244f",
  type: "temper-eso-companion",
  slug: "isobel",
  key: "isobel",
  title: "Isobel Veloise",
  icon: "/esoui/art/icons/comp_isobel.dds",
  subtitle: "The Templar",
  alliance: "daggerfall-covenant",
  esoCompanionId: 6,
  classPassiveId: "isobel-enchanted",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
