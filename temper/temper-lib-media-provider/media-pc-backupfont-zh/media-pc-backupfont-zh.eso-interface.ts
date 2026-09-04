import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontZh = {
  id: "01a06069-f8c6-7cb5-8e32-7b8555198f5d",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-zh",
  definition: "the fallback fonts a Windows or Mac client loads for Chinese",
  markup: "xml",
  loadedAs: "PC/backupfont_zh.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
