import type { TemperCharacterConditionField } from "akasha/temper/player/progress/temper-character-condition-field/temper-character-condition-field.page-type.types.ts"

export const requiredCurseState = {
  id: "01a0d8a1-7943-76fa-8d76-38f78c9135f3",
  type: "page-type/temper-character-condition-field",
  slug: "required-curse-state",
  title: "Required Curse State",
  key: "requiredCurseState",
  description:
    "A character passes only where that character's curse state is exactly the one named, being either vampire or werewolf.",
  createdAt: "2026-09-25T12:54:16.131Z",
  updatedAt: "2026-09-25T12:54:20.000Z",
} as const satisfies TemperCharacterConditionField
