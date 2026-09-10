import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiPageWrite = {
  id: "01a082a1-9eab-776d-b29b-3c1448c8d5fa",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-page-write",
  definition: "a page a browser writes",
  code: "ts",
  urlPath: "api/page-write",
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
