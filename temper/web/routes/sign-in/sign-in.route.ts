import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const signIn = {
  id: "01a08306-c2ad-71ec-bdd7-449e1708d6ea",
  pageTypeSlug: "route",
  type: "route",
  slug: "sign-in",
  definition: "where a player with an account gets back into it",
  code: "tsx",
  urlPath: "sign-in",
} as const satisfies Route
