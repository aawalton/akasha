import type { Route } from "@akasha/code/route"

export const temperCharacterBuildHash = {
  id: "01a0829b-0a45-7aeb-811f-cfa93c486b1c",
  pageTypeSlug: "route",
  type: "route",
  slug: "temper-character-build-hash",
  definition: "the character build a shared hash carries",
  code: "ts",
  urlPath: "character-build/h/:hash",
} as const satisfies Route
