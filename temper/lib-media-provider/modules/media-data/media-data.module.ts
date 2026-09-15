import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mediaData = {
  id: "01a06069-f8c3-778a-b8ba-761dfaf9e630",
  type: "module",
  slug: "media-data",
  definition: "the fonts, backgrounds, borders and sounds the library ships with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A font table is chosen by the language the client runs in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A font the official language descriptor matches takes the built-in font path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A language with no preset takes the vanilla font paths.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Japanese and Chinese fonts are added to every language.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sound the client does not name is left out rather than added as empty.",
    },
  ],
} as const satisfies Module
