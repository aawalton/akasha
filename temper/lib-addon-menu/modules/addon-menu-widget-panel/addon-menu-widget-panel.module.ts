import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetPanel = {
  id: "01a06100-0000-7000-8000-000000000025",
  type: "page-type/module",
  slug: "addon-menu-widget-panel",
  definition: "the scrolling page of one addon's settings, headed by its name and author",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The website and feedback and translation and donation links are laid out in one row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A donation link is colored gold where the other links are blue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The refresh callback is registered once however many panels ask for that callback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Forcing defaults walks the registered controls and then fires a refresh.",
    },
  ],
} as const satisfies Module
