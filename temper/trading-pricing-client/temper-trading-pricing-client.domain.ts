import type { Domain } from "../../domains/domain.page-type.ts"

export const temperTradingPricingClient = {
  id: "01a0609f-a418-7b2b-bf39-1273854058c4",
  pageTypeSlug: "domain",
  slug: "temper-trading-pricing-client",
  definition: "live guild store listings fetched from Tamriel Trade Centre",
  parts: ["module/ttc-listing-client"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing here is Tamriel Trade Centre's answer right now.",
    },
    {
      invariantKind: "departure",
      statement: "Tamriel Trade Centre is asked no faster than the pace the caller sets.",
    },
  ],
} as const satisfies Domain
