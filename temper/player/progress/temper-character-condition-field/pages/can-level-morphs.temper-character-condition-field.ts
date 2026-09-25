import type { TemperCharacterConditionField } from "akasha/temper/player/progress/temper-character-condition-field/temper-character-condition-field.page-type.types.ts"

export const canLevelMorphs = {
  id: "01a0d8a1-7943-7b86-b289-db5d749fa7ef",
  type: "page-type/temper-character-condition-field",
  slug: "can-level-morphs",
  title: "Can Level Morphs",
  key: "canLevelMorphs",
  description:
    "A character passes only where the account reports that character can still level a morph, the test carrying the single mode `can-level`.",
} as const satisfies TemperCharacterConditionField
