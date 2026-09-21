import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsRules = {
  id: "01a0c489-03d4-7346-8e36-90f3e61c3ad0",
  type: "page-type/domain",
  slug: "temper-items-rules",
  definition: "what becomes of an item, said as rules",
  parts: ["domain/temper-items-rules-routing"],
} as const satisfies Domain
