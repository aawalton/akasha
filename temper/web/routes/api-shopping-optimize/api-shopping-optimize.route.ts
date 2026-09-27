import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiShoppingOptimize = {
  id: "01a082fe-e61a-7a3e-be82-51fa06a5c379",
  type: "page-type/route",
  slug: "api-shopping-optimize",
  definition: "the cheapest way to buy a list of items, streamed as it is worked out",
  code: "ts",
  urlPath: "api/shopping/optimize",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault is answered as a reason code, and a server's own detail is only logged.",
    },
  ],
} as const satisfies Route
