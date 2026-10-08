import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const requiredSkillLines = {
  id: "01a07209-6b53-7de9-aa98-47c3e31b5c4e",
  type: "page-type/temper-condition-field",
  slug: "required-skill-lines",
  title: "Required Skill Lines",
  key: "requiredSkillLines",
  description:
    "A character suits the rule only where every named skill line is at max rank under mode `all-maxed`, or at least one named line is below max under `any-not-maxed`.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
