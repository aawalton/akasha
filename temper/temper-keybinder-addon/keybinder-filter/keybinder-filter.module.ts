import type { Module } from "@akasha/code-system/module"

export const keybinderFilter = {
  id: "01a06381-67c1-70e1-ad09-ace0c705c355",
  pageTypeSlug: "module",
  slug: "keybinder-filter",
  definition: "narrowing the key-bind list to the actions whose names match what was typed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The list is rebuilt a fifth of a second after the last keystroke rather than on every keystroke.",
    },
    {
      invariantKind: "departure",
      statement: "A category whose own name matches is kept whole.",
    },
    {
      invariantKind: "departure",
      statement: "An uppercased action name is remembered rather than uppercased again.",
    },
    {
      invariantKind: "departure",
      statement: "Filtering applies only while the master list is being built.",
    },
  ],
} as const satisfies Module
