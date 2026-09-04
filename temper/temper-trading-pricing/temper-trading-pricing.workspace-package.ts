import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperTradingPricing = {
  id: "01a0609b-e59c-7c6b-906c-4ab055fc9039",
  pageTypeSlug: "workspace-package",
  slug: "temper-trading-pricing",
  definition: "what Tamriel Trade Centre last saw an item sell for",
  manifest: "json",
  partSlugs: [
    "module/companion-gear-ids",
    "module/companion-gear-price-lookup",
    "module/crown-consumable-price-lookup",
    "module/currency-price-lookup",
    "module/is-price-entry",
    "module/kiosk-location-name",
    "module/pricing-types",
    "module/ttc-listing-schema",
    "module/ttc-listing-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A price here is what Tamriel Trade Centre last saw rather than what the game asks.",
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
} as const satisfies WorkspacePackage
