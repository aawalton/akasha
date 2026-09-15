import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const mediaFontstringsShared = {
  id: "01a06069-f8c3-797e-8648-09bc838750c0",
  type: "page-type/eso-interface",
  slug: "media-fontstrings-shared",
  definition: "the font names every language mode shares, each pointing through the font path",
  markup: "xml",
  loadedAs: "fontstrings_shared.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A font name here is built on the font path the platform sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This document is read after the two font path documents.",
    },
  ],
} as const satisfies EsoInterface
