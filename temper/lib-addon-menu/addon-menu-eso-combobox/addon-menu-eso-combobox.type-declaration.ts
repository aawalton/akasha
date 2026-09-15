import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const addonMenuEsoCombobox = {
  id: "01a06100-0000-7000-8000-000000000030",
  type: "page-type/type-declaration",
  slug: "addon-menu-eso-combobox",
  definition: "the game combo box members the dropdown widget reaches",
  d: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the shared game types already declare is left out.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
