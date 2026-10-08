import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const landing = {
  id: "01a08306-4bd6-7b6f-a5ca-ffd9e944a02e",
  type: "page-type/route",
  slug: "landing",
  definition: "what Temper is, shown to whoever is not signed in",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sign-up and sign-in wording is read from web phrase pages in the loader.",
    },
  ],
  createdAt: "2026-09-08T21:57:03.062Z",
  updatedAt: "2026-09-27T11:37:31.000Z",
} as const satisfies Route
