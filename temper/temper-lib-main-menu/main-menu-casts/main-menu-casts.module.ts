import type { Module } from "@akasha/code-system/module"

export const mainMenuCasts = {
  id: "01a0605b-c801-75ea-bec7-99b3645fcbda",
  pageTypeSlug: "module",
  slug: "main-menu-casts",
  definition: "the narrowings from an untyped game value to a shape this library reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A narrowing here asserts a shape rather than checking one.",
    },
    {
      invariantKind: "departure",
      statement: "A caller narrowing a game value states which shape the caller expects.",
    },
  ],
} as const satisfies Module
