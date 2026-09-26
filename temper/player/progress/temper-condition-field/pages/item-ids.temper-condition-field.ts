import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const itemIds = {
  id: "01a0deca-ab8d-79bd-acd6-d90ba880d0cc",
  type: "page-type/temper-condition-field",
  slug: "item-ids",
  title: "Item Ids",
  key: "itemIds",
  description:
    "An item's id must be one of the ids listed. The value a rule states is a JSON array of item ids, such as `[112427,176040,27037]`, and a stock rule fills its targets from the ids in the order listed, earliest first.",
} as const satisfies TemperConditionField
