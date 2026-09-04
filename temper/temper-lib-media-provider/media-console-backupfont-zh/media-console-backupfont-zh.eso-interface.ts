import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaConsoleBackupfontZh = {
  id: "01a06069-f8c2-7d10-a29c-1b650054be54",
  pageTypeSlug: "eso-interface",
  slug: "media-console-backupfont-zh",
  definition: "the fallback fonts a console client loads for Chinese",
  markup: "xml",
  loadedAs: "Console/backupfont_zh.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
