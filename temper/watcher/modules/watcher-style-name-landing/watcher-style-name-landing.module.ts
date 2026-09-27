import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherStyleNameLanding = {
  id: "01a0e0f5-79b5-77c8-9afb-acd32d6baaf1",
  type: "page-type/module",
  slug: "watcher-style-name-landing",
  definition:
    "the name the game gives each crafting style, written onto the motif style page of its number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A style name is read from the account-wide table the catalog add-on saves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A motif style page is reached by the style number it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already holding the captured name is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page still titled with its `ITEMSTYLE_` constant takes the captured name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page titled otherwise keeps its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A captured style number no page states is reported with its name rather than given a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a style name from the name of a game constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the pages read, the write and the reporter.",
    },
  ],
} as const satisfies Module
