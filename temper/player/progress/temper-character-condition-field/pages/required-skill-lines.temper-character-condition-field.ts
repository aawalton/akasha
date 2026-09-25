import type { TemperCharacterConditionField } from "akasha/temper/player/progress/temper-character-condition-field/temper-character-condition-field.page-type.types.ts"

export const requiredSkillLines = {
  id: "01a0d8a1-7944-799f-8153-aa29ff23c0d1",
  type: "page-type/temper-character-condition-field",
  slug: "required-skill-lines",
  title: "Required Skill Lines",
  key: "requiredSkillLines",
  description:
    "A character passes only where every named skill line is at max rank under mode `all-maxed`, or at least one named line is below max under `any-not-maxed`.",
} as const satisfies TemperCharacterConditionField
