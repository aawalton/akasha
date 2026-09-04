import type { Module } from "@akasha/code-system/module"

export const watcherConfig = {
  id: "01a06377-d8cc-7874-ab3c-63e6604b4df8",
  pageTypeSlug: "module",
  slug: "watcher-config",
  definition: "where in the game folder each file the watcher reads and writes is found",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the game keeps its files is answered by the eso paths package.",
    },
    {
      invariantKind: "departure",
      statement: "A saved-variables file the game writes sits in the saved-variables directory.",
    },
    {
      invariantKind: "departure",
      statement: "A config file the watcher writes back sits in its own addon's directory.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of file the watcher knows names the file that kind is read from.",
    },
    {
      invariantKind: "departure",
      statement: "The mapping from kind to file is a record rather than a chain of branches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a directory to learn what the directory holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a directory.",
    },
  ],
} as const satisfies Module
