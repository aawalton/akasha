import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const addonMenuEsoWindow = {
  id: "01a06100-0000-7000-8000-000000000031",
  pageTypeSlug: "type-declaration",
  slug: "addon-menu-eso-window",
  definition: "the game settings window, scene and dialog names the panel reaches",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name the shared game typings already declare is left out.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
