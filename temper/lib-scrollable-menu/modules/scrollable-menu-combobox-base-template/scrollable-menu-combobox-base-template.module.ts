import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseTemplate = {
  id: "01a06275-c446-7cbe-bc6c-f699e056c835",
  type: "module",
  slug: "scrollable-menu-combobox-base-template",
  definition: "the default XML row template and highlight template for each entry type",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Caller templates are mixed over the defaults per entry type rather than replacing those defaults.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A single highlight template option overrides every entry type at once.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The normal entry row height becomes the base entry height of the menu.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each allowed entry type is registered with the dropdown as a custom template.",
    },
  ],
} as const satisfies Module
