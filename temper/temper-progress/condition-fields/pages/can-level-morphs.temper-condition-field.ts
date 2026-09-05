import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canLevelMorphs = {
  id: "01a07209-6b50-714b-a5c1-cce39abe7406",
  pageTypeSlug: "temper-condition-field",
  slug: "can-level-morphs",
  title: "Can Level Morphs",
  key: "canLevelMorphs",
  description:
    "A character suits the rule only where the account reports that character can still level a morph, the condition carrying the single mode `can-level`.",
} as const satisfies TemperConditionField
