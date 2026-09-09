import type { TemperEsoCompanion } from "../../temper-eso-companion.page-type.ts"

export const azandar = {
  id: "01a05fcf-591d-727b-bcd4-81688875cb62",
  pageTypeSlug: "temper-eso-companion",
  slug: "azandar",
  key: "azandar",
  title: "Azandar",
  icon: "/esoui/art/icons/companion_azander.dds",
  subtitle: "The Arcanist",
  alliance: "daggerfall-covenant",
  esoCompanionId: 9,
  classPassiveId: "azandar-son-of-kozanset",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
