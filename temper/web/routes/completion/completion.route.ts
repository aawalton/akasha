import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const completion = {
  id: "01a08301-3485-79cd-8d0c-32533b2be176",
  type: "page-type/route",
  slug: "completion",
  definition: "how much of the game the signed-in player has finished",
  code: "tsx",
  urlPath: "completion",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document title is read from this route's web phrase page.",
    },
  ],
  createdAt: "2026-09-08T21:51:29.413Z",
  updatedAt: "2026-09-27T11:32:53.000Z",
} as const satisfies Route
