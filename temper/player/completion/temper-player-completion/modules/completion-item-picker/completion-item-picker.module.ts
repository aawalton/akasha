import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionItemPicker = {
  id: "01a0640c-1e9b-7076-81b6-4ed139595064",
  type: "page-type/module",
  slug: "completion-item-picker",
  definition: "the levels a completion card offers to pick through, and the paths they enumerate",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card is walked to whatever depth its picker keeps answering to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picker answering null marks a leaf rather than an absent card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account card takes no character completions to pick over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account card is any card the category tree's account section names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The levels a card offers are read off the static catalog rather than off saved data.",
    },
  ],
} as const satisfies Module
