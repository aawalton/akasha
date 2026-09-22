import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiPageTypes = {
  id: "01a082a1-3e0e-70ae-b0f8-e98da5841a11",
  type: "page-type/route",
  slug: "api-page-types",
  definition: "the page types a browser requests",
  code: "ts",
  urlPath: "api/page-types",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route exports `loader` alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "React Router strips only `loader` and `action` and `middleware` and `headers` from the browser.",
    },
  ],
} as const satisfies Route
