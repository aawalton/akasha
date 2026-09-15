import type { TemperConditionField } from "akasha/temper/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const canLevelMorphs = {
  id: "01a07209-6b50-714b-a5c1-cce39abe7406",
  type: "page-type/temper-condition-field",
  slug: "can-level-morphs",
  title: "Can Level Morphs",
  key: "canLevelMorphs",
  description:
    "A character suits the rule only where the account reports that character can still level a morph, the condition carrying the single mode `can-level`.",
} as const satisfies TemperConditionField
