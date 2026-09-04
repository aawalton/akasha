import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontJp = {
  id: "01a06069-f8c5-7f11-bf3d-f45dd3518251",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-jp",
  definition: "the fallback fonts a Windows or Mac client loads for Japanese",
  markup: "xml",
  loadedAs: "PC/backupfont_jp.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
