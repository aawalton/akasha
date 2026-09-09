import type { Route } from "@akasha/code/route"

export const apiWatcherUpsertPricingSnapshot = {
  id: "01a082fe-7dee-72e6-89a1-b20f7230159b",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-upsert-pricing-snapshot",
  definition: "the pricing snapshot the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-pricing-snapshot",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No pricing snapshot posted here is kept.",
    },
    {
      invariantKind: "departure",
      statement: "This route answers 410 once the watcher token is judged.",
    },
  ],
} as const satisfies Route
