import type { Module } from "@akasha/code-system/module"

export const scrollableMenuLang = {
  id: "01a06275-c449-7b5d-9a57-12fbd9707620",
  pageTypeSlug: "module",
  slug: "scrollable-menu-lang",
  definition: "the English strings the library registers with the game string table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Strings are registered at load through ZO_CreateStringId.",
    },
    {
      invariantKind: "absence",
      statement: "Translations for other client languages are not present.",
    },
    {
      invariantKind: "constraint",
      statement: "Each string is versioned through SafeAddVersion at version one.",
    },
  ],
} as const satisfies Module
