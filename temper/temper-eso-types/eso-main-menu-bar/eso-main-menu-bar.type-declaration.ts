import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const esoMainMenuBar = {
  id: "01a061fe-1496-7011-81fe-5f31d724998b",
  pageTypeSlug: "type-declaration",
  slug: "eso-main-menu-bar",
  definition: "the bar the game keeps its main menu categories on, and the tables hanging off it",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An `Lmm` name describes a game table the game itself leaves unnamed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A method takes an explicit `this` parameter so the built Lua calls it with a colon.",
    },
    {
      invariantKind: "departure",
      statement: "A descriptor is spelled out at each use rather than named once.",
    },
  ],
} as const satisfies TypeDeclaration
