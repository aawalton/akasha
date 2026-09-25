import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowRows = {
  id: "01a0d937-bd00-7c22-8711-ef1e76de2cb9",
  type: "page-type/module",
  slug: "window-rows",
  definition: "the panels, rows and stat rows a Temper window lists things in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A section of a window sits on a panel of the second surface level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel has no edge, and elevation alone parts it from what it sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel lies beneath its content on the background layer, one level above the window's surface.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's heading sits inside it, at the top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop a window's markup declares can be made a panel, or cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel inside a panel is cleared, so one elevation holds each section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column header row is 40 tall, with its text in the label part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is padded 8 across and 6 down, and rows have no dividers and no stripes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row pointed at is lit by the primary text color at 0.08, and a row chosen at 0.12.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is given its light the first time it is pointed at or set up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's light has no name, and is found again by the row it lights.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game refuses a second control under a name one already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list lights its rows this way rather than with the game's list highlight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat row has its label in body text at the left and its number at the right.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat row shown over play takes the shadowed faces of those parts.",
    },
  ],
} as const satisfies Module
