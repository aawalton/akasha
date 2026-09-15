import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiPageWrite = {
  id: "01a082a1-9eab-776d-b29b-3c1448c8d5fa",
  type: "page-type/route",
  slug: "api-page-write",
  definition: "a page a browser writes",
  code: "ts",
  urlPath: "api/page-write",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route exports `action` alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "React Router strips only `loader` and `action` and `middleware` and `headers` from the browser.",
    },
  ],
} as const satisfies Route
