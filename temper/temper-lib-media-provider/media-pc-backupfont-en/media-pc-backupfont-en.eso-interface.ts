import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontEn = {
  id: "01a06069-f8c4-7450-931b-52c7773253b4",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-en",
  definition: "the fallback fonts a Windows or Mac client loads for English",
  markup: "xml",
  loadedAs: "PC/backupfont_en.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
