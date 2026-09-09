import type { Route } from "@akasha/code/route"

export const settings = {
  id: "01a08304-de41-7697-bee7-b989f9cf8852",
  pageTypeSlug: "route",
  type: "route",
  slug: "settings",
  definition: "the choices a player makes about their own account",
  code: "tsx",
  urlPath: "settings",
} as const satisfies Route
