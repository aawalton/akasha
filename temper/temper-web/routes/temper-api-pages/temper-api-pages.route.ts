import type { Route } from "@akasha/code/route"

export const temperApiPages = {
  id: "01a0829a-13da-798a-a890-b765cf1dc3de",
  pageTypeSlug: "route",
  type: "route",
  slug: "temper-api-pages",
  definition: "the pages of one type a browser asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
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
