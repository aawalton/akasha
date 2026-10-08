import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const requiredCurseState = {
  id: "01a07209-6b53-7d1e-90db-963d1b258cd6",
  type: "page-type/temper-condition-field",
  slug: "required-curse-state",
  title: "Required Curse State",
  key: "requiredCurseState",
  description:
    "A character suits the rule only where that character's curse state is exactly the one named, being either vampire or werewolf.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
