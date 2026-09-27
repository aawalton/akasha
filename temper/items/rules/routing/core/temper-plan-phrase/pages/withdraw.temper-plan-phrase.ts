import type { TemperPlanPhrase } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/temper-plan-phrase.page-type.types.ts"

export const withdraw = {
  id: "01a0e2b8-82fe-7ec2-a219-32ec430aa798",
  type: "page-type/temper-plan-phrase",
  slug: "withdraw",
  title: "Withdraw",
  key: "withdraw",
  displayOrder: 1,
} as const satisfies TemperPlanPhrase
