import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEconomy = {
  id: "01a0c484-38e5-724b-ad4e-997a0dcfcf42",
  type: "page-type/domain",
  slug: "temper-economy",
  definition: "what a thing is worth in Tamriel, and the trade in it",
  parts: ["domain/temper-value", "domain/temper-shopping", "domain/temper-trading"],
  createdAt: "2026-09-21T15:09:54.789Z",
  updatedAt: "2026-09-21T15:10:51.000Z",
} as const satisfies Domain
