import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontEs = {
  id: "01a06069-f8c5-7506-adb7-7e49390f9c3e",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-es",
  definition: "the fallback fonts a Windows or Mac client loads for Spanish",
  markup: "xml",
  loadedAs: "PC/backupfont_es.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
