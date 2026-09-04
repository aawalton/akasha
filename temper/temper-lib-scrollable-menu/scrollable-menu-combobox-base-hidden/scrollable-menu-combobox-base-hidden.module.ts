import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseHidden = {
  id: "01a06275-c445-7a77-9a7b-37159d7869b9",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-hidden",
  definition: "the response to a global mouse up while a menu is open or closed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A preventer variable can swallow one global mouse up entirely.",
    },
    {
      invariantKind: "departure",
      statement: "The preventer accepts either a boolean or a specific mouse button index.",
    },
    {
      invariantKind: "departure",
      statement: "A click inside the owning dropdown never closes that dropdown.",
    },
    {
      invariantKind: "departure",
      statement: "A closed menu with a visible container opens on the mouse up instead.",
    },
  ],
} as const satisfies Module
