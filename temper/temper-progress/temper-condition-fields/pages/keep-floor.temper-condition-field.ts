import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const keepFloor = {
  id: "01a07209-6b51-793a-af55-2d7be0fc2b64",
  pageTypeSlug: "temper-condition-field",
  slug: "keep-floor",
  title: "Keep Floor",
  key: "keepFloor",
  description:
    "A currency rule names the amount to leave behind, turning the compiled action into `keep-floor` where the destination is not a character, and no item condition reads the amount.",
} as const satisfies TemperConditionField
