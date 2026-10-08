import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const maxQuality = {
  id: "01a07209-6b52-7d21-881a-8dfea4e1e1ac",
  type: "page-type/temper-condition-field",
  slug: "max-quality",
  title: "Quality",
  key: "maxQuality",
  description:
    "An item's quality number is compared against the number stated, under `<=` unless `qualityOp` names another operator.",
  createdAt: "2026-09-05T14:46:55.058Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
