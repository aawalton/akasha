import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperCharacterBuild = {
  id: "01a061a7-9bb4-7492-9ef4-a2d81d834deb",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-character-build",
  definition: "the shape a character build is held in, and a new one made",
  parts: [
    "module/race-source",
    "module/build-types",
    "module/build-factory",
    "module/character-state-schema",
  ],
} as const satisfies Domain
