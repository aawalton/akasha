import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const requiredCurseState = {
  id: "01a07209-6b53-7d1e-90db-963d1b258cd6",
  pageTypeSlug: "temper-condition-field",
  slug: "required-curse-state",
  title: "Required Curse State",
  key: "requiredCurseState",
  description:
    "A character suits the rule only where that character's curse state is exactly the one named, being either vampire or werewolf.",
} as const satisfies TemperConditionField
