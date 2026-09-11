import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSetupToggles = {
  id: "01a08e61-59ca-741f-bbbb-b9aae1eba841",
  type: "module",
  slug: "scrollable-menu-combobox-base-setup-toggles",
  definition: "the setup functions filling a radio button row and a checkbox row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A toggle row is built on the shared label setup before its button is added.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle fires the entry's own callback and the library callback together.",
    },
    {
      invariantKind: "departure",
      statement: "A radio group is told which button is clicked when the entry comes in checked.",
    },
  ],
} as const satisfies Module
