import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderFilter = {
  id: "01a06381-67c1-70e1-ad09-ace0c705c355",
  type: "module",
  slug: "keybinder-filter",
  definition: "narrowing the key-bind list to the actions whose names match what was typed",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The list is rebuilt a fifth of a second after the last keystroke rather than on every keystroke.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category whose own name matches is kept whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An uppercased action name is remembered rather than uppercased again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Filtering applies only while the master list is being built.",
    },
  ],
} as const satisfies Module
