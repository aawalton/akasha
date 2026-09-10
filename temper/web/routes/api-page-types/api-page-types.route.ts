import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiPageTypes = {
  id: "01a082a1-3e0e-70ae-b0f8-e98da5841a11",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-page-types",
  definition: "the page types a browser asks for",
  code: "ts",
  urlPath: "api/page-types",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "This route exports `loader` alone.",
    },
    {
      invariantKind: "constraint",
      statement:
        "React Router strips only `loader`, `action`, `middleware` and `headers` from the browser bundle.",
    },
  ],
} as const satisfies Route
