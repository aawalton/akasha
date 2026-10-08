import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperUserCompletion = {
  id: "01a0829b-fcc3-7ae8-b06c-7847fef115dc",
  type: "page-type/route",
  slug: "temper-user-completion",
  definition: "a player's completion, read by anyone",
  code: "tsx",
  urlPath: "completion/u/:userId",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document title is read from this route's web phrase page.",
    },
  ],
  createdAt: "2026-09-08T20:00:56.003Z",
  updatedAt: "2026-09-27T11:32:53.000Z",
} as const satisfies Route
