import type { Route } from "@akasha/code/route"

export const inventory = {
  id: "01a08302-8244-768d-926b-2d2e7902a54f",
  pageTypeSlug: "route",
  type: "route",
  slug: "inventory",
  definition: "what a player is holding, and the rules that sort it",
  code: "tsx",
  urlPath: "inventory",
} as const satisfies Route
