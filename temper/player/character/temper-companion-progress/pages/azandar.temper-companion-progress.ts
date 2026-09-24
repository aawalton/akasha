import type { TemperCompanionProgress } from "akasha/temper/player/character/temper-companion-progress/temper-companion-progress.page-type.types.ts"

export const azandar = {
  id: "019dda20-ef86-78be-bf43-b241b052add2",
  type: "page-type/temper-companion-progress",
  slug: "azandar",
  title: "Azandar",
  completion: "json",
  companionId: "temper-eso-companion/azandar",
  accountPage: "temper-account/alanarre",
} as const satisfies TemperCompanionProgress
