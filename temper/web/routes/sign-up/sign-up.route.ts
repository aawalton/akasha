import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const signUp = {
  id: "01a08307-1eb0-71af-b03b-9e4a212055e7",
  type: "page-type/route",
  slug: "sign-up",
  definition: "the path that sends a browser to the sign-in page",
  code: "ts",
  urlPath: "sign-up",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is opened by signing in, so this route sends a reader there.",
    },
  ],
  createdAt: "2026-09-08T21:57:57.040Z",
  updatedAt: "2026-10-30T16:26:18.163Z",
} as const satisfies Route
