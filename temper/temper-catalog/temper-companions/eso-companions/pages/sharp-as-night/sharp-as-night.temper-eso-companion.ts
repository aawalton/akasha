import type { TemperEsoCompanion } from "../../temper-eso-companion.page-type.ts"

export const sharpAsNight = {
  id: "01a05fcf-5920-7af5-a91a-352df51376f6",
  pageTypeSlug: "temper-eso-companion",
  slug: "sharp-as-night",
  key: "sharp-as-night",
  title: "Sharp-as-Night",
  icon: "/esoui/art/icons/companion_sharp.dds",
  subtitle: "The Warden",
  alliance: "ebonheart-pact",
  esoCompanionId: 8,
  classPassiveId: "sharp-survivalist",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
