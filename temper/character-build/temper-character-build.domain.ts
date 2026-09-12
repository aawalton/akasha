import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperCharacterBuild = {
  id: "01a061a7-9bb4-7492-9ef4-a2d81d834deb",
  type: "domain",
  slug: "temper-character-build",
  definition: "the shape a character build is held in, and a new one made",
  parts: [
    "module/build-factory",
    "module/build-types",
    "module/character-state-schema",
    "module/race-source",
  ],
} as const satisfies Domain
