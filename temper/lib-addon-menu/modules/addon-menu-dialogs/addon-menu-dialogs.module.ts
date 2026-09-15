import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuDialogs = {
  id: "01a06100-0000-7000-8000-000000000003",
  type: "module",
  slug: "addon-menu-dialogs",
  definition: "the reset-to-defaults and reload-UI dialogs and the panel reopened after a reload",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel to reopen is stored in saved variables before the UI reloads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Discarding restores every reload-flagged control to the value that control had on creation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Dismissing the reload dialog without choosing discards the changes.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Dialog descriptors are created once and kept in the game's global dialog table.",
    },
  ],
} as const satisfies Module
