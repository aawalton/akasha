import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEso = {
  id: "01a0c44d-ad2e-7031-b95e-3f34c92163ec",
  type: "page-type/domain",
  slug: "temper-eso",
  definition: "the game's own types, paths and saved files, as temper reaches them",
  parts: [
    "domain/temper-eso-path",
    "domain/temper-eso-declaration",
    "domain/temper-lua-runner",
    "domain/temper-saved-variable",
    "domain/temper-eso-type",
    "domain/temper-eso-ui-harness",
    "domain/temper-eso-constant",
    "domain/temper-eso-return",
  ],
} as const satisfies Domain
