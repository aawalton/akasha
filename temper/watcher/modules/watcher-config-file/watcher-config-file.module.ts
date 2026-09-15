import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherConfigFile = {
  id: "01a06381-35cf-7578-8e5c-ded020afdf75",
  type: "module",
  slug: "watcher-config-file",
  definition: "the lua file the watcher writes back into an addon's folder for the addon to read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every config file the watcher writes opens with the same header comment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The header says the file is generated and is not to be edited by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A config file names one global and has one table under that global.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The version is the first entry of that table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every config file has the same version number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block the writer was told nothing for is left out rather than written empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block keyed by numbers comes out ordered by the number rather than by the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block keyed by numbers with nothing is written on one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block keyed by numbers takes whatever indent the caller states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller stating no indent gets four spaces.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A config file ends with a newline.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a block's contents.",
    },
  ],
} as const satisfies Module
