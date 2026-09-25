import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowDataState = {
  id: "01a0d9e8-f034-7076-85d9-bf476a5cb77e",
  type: "page-type/module",
  slug: "window-data-state",
  definition: "what a Temper list shows while its data is loading, empty or failed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list showing data is loading, empty, failed or loaded, and shows which.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state other than loaded fills the list's area, centred, in place of its rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading shows the web's spinner, turning once a second, over any words it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Empty shows a line saying what is missing, in the muted text part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failed shows the web's title, Failed to load, over what went wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failed offers Try again as a secondary button where the data can be asked again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words shown over play take the shadowed faces of their parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The spinner is lucide's loader drawn white, and the game tints it muted.",
    },
  ],
} as const satisfies Module
