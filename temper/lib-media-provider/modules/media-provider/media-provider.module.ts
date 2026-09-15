import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mediaProvider = {
  id: "01a06069-f8c6-70d6-95b7-416a6fcedd26",
  type: "page-type/module",
  slug: "media-provider",
  definition: "the calls another addon makes to add and fetch media",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A media kind is lower-cased before the media kind is keyed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key already taken is refused rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fetch missing its key falls back to the default for that media kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blacklisted font on a console answers the medium font.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sorted key list for a media kind is rebuilt whenever a key is added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Adding media fires a callback naming the media kind and the key.",
    },
  ],
} as const satisfies Module
