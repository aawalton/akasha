import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const lorebooksReportLayout = {
  id: "01a0624c-a660-70e7-ac40-0ff60904655d",
  pageTypeSlug: "eso-interface",
  slug: "lorebooks-report-layout",
  definition: "the lore library search box and the two report windows the lorebook tracker fills",
  markup: "xml",
  loadedAs: "LoreBooks.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The search box takes its placeholder and its label from a string id.",
    },
    {
      invariantKind: "departure",
      statement: "Every row of a report is a virtual label the tracker copies.",
    },
    {
      invariantKind: "departure",
      statement:
        "The Shalidor heading and the Eidetic heading are anchored to the one scroll child.",
    },
    {
      invariantKind: "departure",
      statement: "The copy window holds one edit box the player reads rather than writes.",
    },
  ],
} as const satisfies EsoInterface
