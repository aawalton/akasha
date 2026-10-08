import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperTrading = {
  id: "01a0c484-f29a-7427-bb73-6423edd37983",
  type: "page-type/domain",
  slug: "temper-trading",
  definition: "the guild stores holding a player's buying and selling",
  parts: ["domain/temper-trading-listing", "domain/temper-trading-pricing"],
  createdAt: "2026-09-21T15:10:42.330Z",
  updatedAt: "2026-09-22T14:00:30.000Z",
} as const satisfies Domain
