import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const dataImport = {
  id: "01a08302-1c9c-7927-94b0-aeed8122b0ac",
  type: "page-type/route",
  slug: "data-import",
  definition: "the screen where a player brings in saved game data",
  code: "tsx",
  urlPath: "import",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document title is read from this route's web phrase page.",
    },
  ],
  createdAt: "2026-09-08T21:52:28.828Z",
  updatedAt: "2026-09-27T11:32:53.000Z",
} as const satisfies Route
