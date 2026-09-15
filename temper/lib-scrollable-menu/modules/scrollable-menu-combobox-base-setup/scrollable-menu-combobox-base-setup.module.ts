import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSetup = {
  id: "01a06275-c445-7b8f-b837-57378869949f",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-setup",
  definition: "the setup function that fills a row control for each entry type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every setup path funnels through one shared label and base setup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edit box and slider rows are pinned to stay open on select.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Checkbox and radio toggles fire an item callback and a library callback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The highlight template is recomputed at the end of each setup.",
    },
  ],
} as const satisfies Module
