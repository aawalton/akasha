import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperApiPages = {
  id: "01a0829a-13da-798a-a890-b765cf1dc3de",
  type: "page-type/route",
  slug: "temper-api-pages",
  definition: "the pages of a type answered to a browser",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
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
  createdAt: "2026-09-08T19:58:50.842Z",
  updatedAt: "2026-09-22T14:01:43.000Z",
} as const satisfies Route
