import type { Module } from "@akasha/code-system/module"

export const esoPaths = {
  id: "01a06050-639f-7d76-bfda-f105e8a7cd3e",
  pageTypeSlug: "module",
  slug: "eso-paths",
  definition: "the directories the game and the game's sources are read from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An environment variable naming a directory outright is taken over any other answer.",
    },
    {
      invariantKind: "departure",
      statement: "Windows is answered from the user profile directory.",
    },
    {
      invariantKind: "departure",
      statement: "Every other platform is answered from the Proton prefix the game runs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "The live directory is answered as candidates in the order the candidates are tried.",
    },
    {
      invariantKind: "departure",
      statement: "An unset home directory is refused rather than answered as the root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a directory.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a directory.",
    },
  ],
} as const satisfies Module
