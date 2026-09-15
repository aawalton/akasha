import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBase = {
  id: "01a06275-c444-7462-9a01-bb0daeb9b5d0",
  type: "module",
  slug: "scrollable-menu-combobox-base",
  definition: "the ZO_ComboBox subclass every library menu derives from and its narration plumbing",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Screen narration is gated behind two separate accessibility settings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The submenu class is created here as a subclass of the base.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Narration text is queued through a named update handler rather than sent at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every new instance appends itself to the library's list of live objects.",
    },
  ],
} as const satisfies Module
