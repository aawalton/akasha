import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const keepFloor = {
  id: "01a07209-6b51-793a-af55-2d7be0fc2b64",
  type: "page-type/temper-condition-field",
  slug: "keep-floor",
  title: "Keep Floor",
  key: "keepFloor",
  description:
    "A currency rule names the amount to leave behind, turning the compiled action into `keep-floor` where the destination is not a character, and no item condition reads the amount.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
