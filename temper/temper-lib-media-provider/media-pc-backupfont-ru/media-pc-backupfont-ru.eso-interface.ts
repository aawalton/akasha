import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontRu = {
  id: "01a06069-f8c6-7ccd-b0fc-60b97479efa5",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-ru",
  definition: "the fallback fonts a Windows or Mac client loads for Russian",
  markup: "xml",
  loadedAs: "PC/backupfont_ru.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
