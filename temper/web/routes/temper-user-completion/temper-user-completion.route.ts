import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperUserCompletion = {
  id: "01a0829b-fcc3-7ae8-b06c-7847fef115dc",
  type: "page-type/route",
  slug: "temper-user-completion",
  definition: "a player's completion, read by anyone",
  code: "tsx",
  urlPath: "completion/u/:userId",
} as const satisfies Route
