import type { TemperEsoCompanion } from "akasha/temper/catalog/temper-companions/temper-eso-companions/temper-eso-companion.page-type.types.ts"

export const mirri = {
  id: "01a05fcf-591f-7e8b-a141-57ddd4ae8373",
  type: "temper-eso-companion",
  slug: "mirri",
  key: "mirri",
  title: "Mirri Elendis",
  icon: "/esoui/art/icons/comp_mirri.dds",
  subtitle: "The Nightblade",
  alliance: "ebonheart-pact",
  esoCompanionId: 2,
  classPassiveId: "mirri-dynamic",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
