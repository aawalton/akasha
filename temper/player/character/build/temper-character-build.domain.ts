import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterBuild = {
  id: "01a061a7-9bb4-7492-9ef4-a2d81d834deb",
  type: "page-type/domain",
  slug: "temper-character-build",
  definition: "the shape a character build is held in, and a new one made",
  parts: ["module/build-factory", "module/build-types", "module/character-target-types", "module/race-source", "domain/temper-bit-codec", "domain/temper-build-codec", "domain/temper-build-hash", "domain/temper-build-support", "domain/temper-companion-codec"],
  createdAt: "2026-09-02T10:26:09.460Z",
  updatedAt: "2026-10-28T19:50:11.525Z",
} as const satisfies Domain
