import type { TemperVampireStage } from "akasha/temper/catalog/temper-effect/temper-vampire-stage/temper-vampire-stage.page-type.types.ts"

export const noVampirism = {
  id: "019e21f4-0aa7-7693-b46b-74dc46126f3a",
  type: "page-type/temper-vampire-stage",
  slug: "no-vampirism",
  title: "No Vampirism",
  key: "stage-0",
  description: "Not a vampire. No bonuses or penalties.",
  displayOrder: 0,
  esoVampireStageId: 0,
} as const satisfies TemperVampireStage
