import type { Module } from "@akasha/code-system/module"

export const libSetsCopyDialog = {
  id: "01a0623c-2df8-7c0d-ae66-7d2de026a998",
  pageTypeSlug: "module",
  slug: "lib-sets-copy-dialog",
  definition: "the dialog holding set text in an edit box a player can select and copy",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "The published name is fixed." },
    {
      invariantKind: "departure",
      statement: "Text over 20000 characters is broken into pages the player turns by hand.",
    },
    { invariantKind: "constraint", statement: "Nothing is built here on console." },
  ],
} as const satisfies Module
