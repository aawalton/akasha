import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const catalog = {
  id: "01a082ff-607a-72a4-9f87-7ddebe068f34",
  type: "page-type/route",
  slug: "catalog",
  definition: "the game's reference data, read on a screen",
  code: "tsx",
  urlPath: "catalog",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document title is read from this route's web phrase page.",
    },
  ],
  createdAt: "2026-09-08T21:49:29.594Z",
  updatedAt: "2026-09-27T11:32:53.000Z",
} as const satisfies Route
