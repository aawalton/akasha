import type { Module } from "@akasha/code-system/module"

export const companionsEvents = {
  id: "01a0611d-84d9-7779-9148-3a4577993184",
  pageTypeSlug: "module",
  slug: "companions-events",
  definition: "the game events the companion add-on listens for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every listener is named after the add-on so a reload can drop them.",
    },
  ],
} as const satisfies Module
