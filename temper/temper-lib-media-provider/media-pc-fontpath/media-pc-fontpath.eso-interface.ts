import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcFontpath = {
  id: "01a06069-f8c6-7fd8-9857-ec0ca14a3e1b",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-fontpath",
  definition: "the folder the client reads fonts from on Windows and Mac",
  markup: "xml",
  loadedAs: "PC/fontpath.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The font path is declared as a string the other documents read.",
    },
  ],
} as const satisfies EsoInterface
