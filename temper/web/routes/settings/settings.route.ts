import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const settings = {
  id: "01a08304-de41-7697-bee7-b989f9cf8852",
  type: "page-type/route",
  slug: "settings",
  definition: "the choices a player makes about their own account",
  code: "tsx",
  urlPath: "settings",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's email is shown again as soon as their person page changes.",
    },
  ],
} as const satisfies Route
