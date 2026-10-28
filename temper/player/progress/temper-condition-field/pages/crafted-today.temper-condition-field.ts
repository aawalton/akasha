import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const craftedToday = {
  id: "01a183d2-67a2-7f42-8748-a7f3b02eba40",
  type: "page-type/temper-condition-field",
  slug: "crafted-today",
  title: "Crafted Today",
  key: "craftedToday",
  description:
    "A crafted item's first sighting by the addon must fall on today's ESO day where the value is `crafted-today`, and on an earlier day, or before the addon stamped crafted items, where the value is `not-crafted-today`. An item nobody crafted is never crafted today.",
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionField
