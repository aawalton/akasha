import type { TemperCompanionProgress } from "akasha/temper/player/character/temper-companion-progress/temper-companion-progress.page-type.types.ts"

export const bastian = {
  id: "019dda20-e0ef-782c-beb0-ff89523344e3",
  type: "page-type/temper-companion-progress",
  slug: "bastian",
  title: "Bastian Hallix",
  completion: "json",
  companionId: "temper-eso-companion/bastian",
  accountPage: "temper-account/alanarre",
} as const satisfies TemperCompanionProgress
