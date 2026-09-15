import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsChatterNameTables = {
  id: "01a0635f-391c-79f3-87e1-6c303b4a5402",
  type: "module",
  slug: "quests-chatter-name-tables",
  definition: "the names the game gives its dialogue option codes and its interaction codes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each name is read from the globals on its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The globals are never enumerated as a whole.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Enumerating the globals taints the call stack against protected functions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "These names are worked out from the game's own enumerations.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`akasha temper eso generate chatter-name` writes this code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edit by hand to this code is lost at the next run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This page names the command writing this code rather than the code itself.",
    },
  ],
} as const satisfies Module
