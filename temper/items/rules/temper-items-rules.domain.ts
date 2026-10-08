import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsRules = {
  id: "01a0c489-03d4-7346-8e36-90f3e61c3ad0",
  type: "page-type/domain",
  slug: "temper-items-rules",
  definition: "what becomes of an item, said as rules",
  parts: [
    "domain/temper-items-rules-routing",
    "domain/temper-items-rules-eval",
    "domain/temper-items-rules-matcher",
    "domain/temper-items-rules-core",
  ],
  createdAt: "2026-09-21T15:15:08.884Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Domain
