import type { Route } from "@akasha/code/route"

export const apiWatcherUpsertPricingExtract = {
  id: "01a082fe-11cd-7a65-b8ed-c1dfdf1595f5",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-upsert-pricing-extract",
  definition: "the pricing extract the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-pricing-extract",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No pricing extract posted here is kept.",
    },
    {
      invariantKind: "departure",
      statement: "This route answers 410 once the watcher token is judged.",
    },
  ],
} as const satisfies Route
