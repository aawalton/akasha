import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const methodology = {
  id: "01a08303-c18c-7e41-a3f8-f6712ebf65be",
  type: "page-type/route",
  slug: "methodology",
  definition: "how Temper works out what it tells a player",
  code: "tsx",
  urlPath: "methodology",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document title is read from this route's web phrase page.",
    },
  ],
} as const satisfies Route
