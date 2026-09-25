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
      statement: "A control keeps the game's own control and behaviour, and takes the web's look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button, a field and a dropdown are 32 tall, the web's small size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button sits one surface level above what it sits on, with no edge and no art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button's text is small and medium, in its variant's text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The accent button is gold text on gold at 0.15, and the tertiary one is bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control pointed at is lit by its text color at 0.08, pressed or chosen at 0.12.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A disabled control is shown at 0.38 and takes no pointer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lighting a control is a named handler, so a handler the window sets is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is bare until pointed at or chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button holding only an icon over a backdrop of its own is a tab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other button with text is a secondary button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's backdrop for a slider is cleared, since the slider draws its own track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field's backdrop is its parent or a backdrop of its own named BG.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field and a dropdown sit one surface level up, in body text, hint text dim.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scroll bar is a 10 wide thumb two levels up, with no track and no arrows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slider is a 6 tall track one level up and a 16 square gold thumb.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture given no file is drawn as a solid block of its color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field, dropdown, slider and scroll bar under a window is restyled at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control is restyled once, however often it is reached.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Corners are square until Temper ships art for the web's rounded ones.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The dropdown's arrow and the list it opens are the game's own.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A checkbox keeps the game's art until Temper ships a check in the web's look.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No control shows the web's focus ring, since the game gives a button no focus.",
    },
  ],
} as const satisfies Module
