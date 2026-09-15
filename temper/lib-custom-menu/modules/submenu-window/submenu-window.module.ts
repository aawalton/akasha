import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const submenuWindow = {
  id: "01a0605a-5820-702f-bd91-46c5fa9263c6",
  type: "page-type/module",
  slug: "submenu-window",
  definition: "the floating window a sub-menu's rows are drawn in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sub-menu opens to the right of its parent row unless the screen ends first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sub-menu is drawn one level above the menu the sub-menu opened from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sub-menu closes on the second global mouse up outside its own window.",
    },
  ],
} as const satisfies Module
