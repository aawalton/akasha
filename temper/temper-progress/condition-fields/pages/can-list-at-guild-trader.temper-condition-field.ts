import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canListAtGuildTrader = {
  id: "01a07209-6b50-741e-bf48-d5097bae1d03",
  pageTypeSlug: "temper-condition-field",
  slug: "can-list-at-guild-trader",
  title: "Can List At Guild Trader",
  key: "canListAtGuildTrader",
  description:
    "A rule marks the matching item as listable at a guild trader, offered only for the `list` action, and no checker in this checkout tests the value.",
} as const satisfies TemperConditionField
