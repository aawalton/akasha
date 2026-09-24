import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperTradingPricing = {
  id: "01a0609b-e59c-7c6b-906c-4ab055fc9039",
  type: "page-type/domain",
  slug: "temper-trading-pricing",
  definition: "the price Tamriel Trade Centre last saw for an item",
  parts: [
    "module/companion-gear-price-lookup",
    "module/currency-price-lookup",
    "module/is-price-entry",
    "module/kiosk-location-name",
    "module/pricing-types",
    "module/ttc-listing-schema",
    "module/ttc-listing-types",
    "service-workstation/ttc-client",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A price here is the price Tamriel Trade Centre last saw rather than the price the game asks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lookup finding no price answers with nothing rather than with zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No code here reaches the network.",
    },
  ],
} as const satisfies Domain
