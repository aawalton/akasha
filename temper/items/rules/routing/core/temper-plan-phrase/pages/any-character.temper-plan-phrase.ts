import type { TemperPlanPhrase } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/temper-plan-phrase.page-type.types.ts"

export const anyCharacter = {
  id: "01a0e2b8-82fe-7370-a6cd-db69c26081b4",
  type: "page-type/temper-plan-phrase",
  slug: "any-character",
  title: "Any Character",
  key: "any-character",
  displayOrder: 3,
} as const satisfies TemperPlanPhrase
