import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperTradingPricingClient = {
  id: "01a0609f-a418-7b2b-bf39-1273854058c4",
  pageTypeSlug: "workspace-package",
  slug: "temper-trading-pricing-client",
  definition: "live guild store listings fetched from Tamriel Trade Centre",
  manifest: "json",
  partSlugs: ["module/ttc-listing-client"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing here is what Tamriel Trade Centre answers right now.",
    },
    {
      invariantKind: "departure",
      statement: "Tamriel Trade Centre is asked no faster than the pace the caller sets.",
    },
  ],
} as const satisfies WorkspacePackage
