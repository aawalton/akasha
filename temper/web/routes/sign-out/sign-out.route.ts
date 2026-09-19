import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const signOut = {
  id: "01a0bba7-965d-7000-b05b-7b3e938f4144",
  type: "page-type/route",
  slug: "sign-out",
  definition: "the end of a player's session",
  code: "ts",
  urlPath: "sign-out",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A player signs out by posting, because the browser cannot reach the cookie itself.",
    },
  ],
} as const satisfies Route
