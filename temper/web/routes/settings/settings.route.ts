import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const settings = {
  id: "01a08304-de41-7697-bee7-b989f9cf8852",
  type: "route",
  slug: "settings",
  definition: "the choices a player makes about their own account",
  code: "tsx",
  urlPath: "settings",
} as const satisfies Route
