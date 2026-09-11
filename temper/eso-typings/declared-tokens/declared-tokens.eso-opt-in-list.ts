import type { EsoOptInList } from "akasha/temper/eso-typings/eso-opt-in-lists/eso-opt-in-list.page-type.types.ts"

export const declaredTokens = {
  id: "01a081b2-4fd7-7ffc-980f-4e10f179b9cd",
  type: "eso-opt-in-list",
  slug: "declared-tokens",
  definition: "the eso api tokens the game's generated declarations carry",
  tokens: "json",
} as const satisfies EsoOptInList
