import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiAsk = {
  id: "01a082a0-4e24-772e-9707-d1ad4af1da6b",
  type: "page-type/route",
  slug: "api-ask",
  definition: "the answer to a question a browser puts",
  code: "ts",
  urlPath: "api/ask",
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
