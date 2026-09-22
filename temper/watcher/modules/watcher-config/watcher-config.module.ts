import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherConfig = {
  id: "01a06377-d8cc-7874-ab3c-63e6604b4df8",
  type: "page-type/module",
  slug: "watcher-config",
  definition: "where in the game folder each file the watcher reads and writes is found",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the game keeps its files is answered by the eso paths package.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables file the game writes sits in the saved-variables directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A config file the watcher writes back sits in its own addon's directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of file the watcher knows names the file that kind is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mapping from kind to file is a record rather than a chain of branches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a directory to learn the directory's entries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The catalog kind and the data-mining kind are read from the one file the catalog add-on writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The characters kind and the companions kind are read from the one file the characters add-on writes.",
    },
  ],
} as const satisfies Module
