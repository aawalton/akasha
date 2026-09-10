import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiAsk = {
  id: "01a082a0-4e24-772e-9707-d1ad4af1da6b",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-ask",
  definition: "the answer to a question a browser puts",
  code: "ts",
  urlPath: "api/ask",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "This route exports `action` alone.",
    },
    {
      invariantKind: "constraint",
      statement:
        "React Router strips only `loader`, `action`, `middleware` and `headers` from the browser bundle.",
    },
  ],
} as const satisfies Route
