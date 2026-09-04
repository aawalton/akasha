import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClass = {
  id: "01a06275-c447-7ccf-b589-958d748292ad",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class",
  definition: "the subclass of ZO_ComboBoxDropdown_Keyboard and its scroll-list construction",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "AddItem and AddItems are overridden to raise an error.",
    },
    {
      invariantKind: "departure",
      statement: "Each custom entry template claims two scroll type ids at once.",
    },
    {
      invariantKind: "departure",
      statement: "The highlight template of a row is resolved through the owning combobox.",
    },
    {
      invariantKind: "departure",
      statement: "The dropdown control is created from a virtual template parented to GuiRoot.",
    },
  ],
} as const satisfies Module
