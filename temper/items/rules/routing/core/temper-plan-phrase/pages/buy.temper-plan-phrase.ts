import type { TemperPlanPhrase } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/temper-plan-phrase.page-type.types.ts"

export const buy = {
  id: "01a0e2b8-82fe-74c7-b6a8-db86367b1c54",
  type: "page-type/temper-plan-phrase",
  slug: "buy",
  title: "Buy at a merchant or guild store",
  key: "buy",
  displayOrder: 2,
} as const satisfies TemperPlanPhrase
