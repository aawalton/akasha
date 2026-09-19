import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const signIn = {
  id: "01a08306-c2ad-71ec-bdd7-449e1708d6ea",
  type: "page-type/route",
  slug: "sign-in",
  definition: "where a player is sent off to alanwalton.com to be signed in",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper draws no sign-in form, and asks no provider who a player is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player asking for a page is brought back to that page after signing in.",
    },
  ],
} as const satisfies Route
