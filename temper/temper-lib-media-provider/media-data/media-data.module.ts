import type { Module } from "@akasha/code-system/module"

export const mediaData = {
  id: "01a06069-f8c3-778a-b8ba-761dfaf9e630",
  pageTypeSlug: "module",
  slug: "media-data",
  definition: "the fonts, backgrounds, borders and sounds the library ships with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A font table is chosen by the language the client runs in.",
    },
    {
      invariantKind: "departure",
      statement: "A font the official language descriptor matches takes the built-in font path.",
    },
    {
      invariantKind: "departure",
      statement: "A language with no preset takes the vanilla font paths.",
    },
    {
      invariantKind: "departure",
      statement: "The Japanese and Chinese fonts are added to every language.",
    },
    {
      invariantKind: "departure",
      statement: "A sound the client does not name is left out rather than added as empty.",
    },
  ],
} as const satisfies Module
