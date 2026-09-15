import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetEditbox = {
  id: "01a06100-0000-7000-8000-000000000021",
  type: "page-type/module",
  slug: "addon-menu-widget-editbox",
  definition: "the text entry widget, single line or multiline",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is written back when the box loses focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An escape press writes the value back rather than discarding the edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mouse wheel over a multiline box moves the cursor by whole lines.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Input is capped at three thousand characters when maxChars is absent.",
    },
  ],
} as const satisfies Module
