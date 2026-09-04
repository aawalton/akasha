import type { TemperVampireStage } from "../temper-vampire-stage.page-type.ts"

export const stage1 = {
  id: "019e21f4-0aab-7636-854c-4c58d124879f",
  pageTypeSlug: "temper-vampire-stage",
  slug: "stage-1",
  title: "Stage 1",
  key: "stage-1",
  description:
    "Health Recovery: -10%, Flame Damage Taken: +5%, Regular Ability Costs: +3%, Vampire Ability Costs: -6%",
  displayOrder: 1,
  esoVampireStageId: 135397,
} as const satisfies TemperVampireStage
