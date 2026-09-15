import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseHidden = {
  id: "01a06275-c445-7a77-9a7b-37159d7869b9",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-hidden",
  definition: "the response to a global mouse up while a menu is open or closed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A preventer variable can swallow one global mouse up entirely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The preventer accepts either a boolean or a specific mouse button index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click inside the owning dropdown never closes that dropdown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A closed menu with a visible container opens on the mouse up instead.",
    },
  ],
} as const satisfies Module
