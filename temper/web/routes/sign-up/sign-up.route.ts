import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const signUp = {
  id: "01a08307-1eb0-71af-b03b-9e4a212055e7",
  type: "page-type/route",
  slug: "sign-up",
  definition: "the old way in, kept so an old link still reaches the new one",
  code: "ts",
  urlPath: "sign-up",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is opened by signing in, so this route sends a reader there.",
    },
  ],
  createdAt: "2026-09-08T21:57:57.040Z",
  updatedAt: "2026-09-20T23:26:24.000Z",
} as const satisfies Route
