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
      statement:
        "Loading shows the game's wait icon, turning once a second, over any words it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Empty shows a line saying what is missing, in the muted text part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failed shows a heading, Failed to load, over what went wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failed offers Try again as a default button where the data can be asked again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words shown over play take the shadowed faces of their parts.",
    },
  ],
  createdAt: "2026-09-25T18:51:56.852Z",
  updatedAt: "2026-10-18T17:31:39.160Z",
} as const satisfies Module
