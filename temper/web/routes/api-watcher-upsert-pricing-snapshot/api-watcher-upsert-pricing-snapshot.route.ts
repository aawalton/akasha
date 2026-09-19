import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiWatcherUpsertPricingSnapshot = {
  id: "01a082fe-7dee-72e6-89a1-b20f7230159b",
  type: "page-type/route",
  slug: "api-watcher-upsert-pricing-snapshot",
  definition: "the pricing snapshot the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-pricing-snapshot",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "No pricing snapshot posted here is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route answers 410 once the watcher token is judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The word snapshot here is the retired caller's address rather than this domain's name.",
    },
  ],
} as const satisfies Route
