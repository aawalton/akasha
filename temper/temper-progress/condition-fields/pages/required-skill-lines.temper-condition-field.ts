import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const requiredSkillLines = {
  id: "01a07209-6b53-7de9-aa98-47c3e31b5c4e",
  pageTypeSlug: "temper-condition-field",
  slug: "required-skill-lines",
  title: "Required Skill Lines",
  key: "requiredSkillLines",
  description:
    "A character suits the rule only where every named skill line is at max rank under mode `all-maxed`, or at least one named line is below max under `any-not-maxed`.",
} as const satisfies TemperConditionField
