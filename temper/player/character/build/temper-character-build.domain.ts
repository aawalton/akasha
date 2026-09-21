import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterBuild = {
  id: "01a061a7-9bb4-7492-9ef4-a2d81d834deb",
  type: "page-type/domain",
  slug: "temper-character-build",
  definition: "the shape a character build is held in, and a new one made",
  parts: ["module/build-factory", "module/build-types", "module/race-source", "domain/temper-bit-codec", "domain/temper-build-codec", "domain/temper-build-hash", "domain/temper-build-support", "domain/temper-companion-codec"],
} as const satisfies Domain
