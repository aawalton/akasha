import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowControls = {
  id: "01a0d969-c1ee-708b-9ea9-46e14edd83d9",
  type: "page-type/module",
  slug: "window-controls",
  definition: "the buttons, fields, tabs, dropdowns, sliders and scroll bars of a Temper window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A control is the game's own control, in the game's own art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button is the game's default button, 28 tall, or its bare text button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button with text the window made bare takes the game's default button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dropdown, slider, scroll bar and checkbox keep the game's templates untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tab pointed at shows the game's list highlight, and a chosen tab its selected one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lighting a control is a named handler, so a handler the window sets is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field's backdrop is its parent or a backdrop of its own named BG.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field takes the game's text entry art, in body text with hint text dim.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field and bare button under a window is restyled at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control is restyled once, however often it is reached.",
    },
  ],
  createdAt: "2026-09-25T16:33:01.934Z",
  updatedAt: "2026-10-18T17:31:39.160Z",
} as const satisfies Module
