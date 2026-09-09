import type { Domain } from "../../domains/domain.page-type.ts"

export const temperTradingPricing = {
  id: "01a0609b-e59c-7c6b-906c-4ab055fc9039",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-trading-pricing",
  definition: "what Tamriel Trade Centre last saw an item sell for",
  parts: [
    "module/companion-gear-ids",
    "module/companion-gear-price-lookup",
    "module/crown-consumable-price-lookup",
    "module/currency-price-lookup",
    "module/is-price-entry",
    "module/kiosk-location-name",
    "module/pricing-types",
    "module/ttc-listing-schema",
    "module/ttc-listing-types",
    "workstation-service/ttc-client",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A price here is the price Tamriel Trade Centre last saw rather than the price the game asks.",
    },
    {
      invariantKind: "departure",
      statement: "A lookup finding no price answers with nothing rather than with zero.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the network.",
    },
  ],
} as const satisfies Domain
