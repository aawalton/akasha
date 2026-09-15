import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetSubmenu = {
  id: "01a06100-0000-7000-8000-000000000027",
  type: "page-type/module",
  slug: "addon-menu-widget-submenu",
  definition: "the collapsible group of widgets under a titled bar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group starts closed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on the title toggles the group open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on the icon toggles the group open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on the bottom edge toggles the group open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A disabled submenu refuses to open.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The scroll area resizes to its contents only while the submenu is open.",
    },
  ],
} as const satisfies Module
