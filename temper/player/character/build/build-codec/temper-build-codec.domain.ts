import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperBuildCodec = {
  id: "01a062e7-4dd4-7379-91b1-47690a52822a",
  type: "page-type/domain",
  slug: "temper-build-codec",
  definition:
    "packing a character build into text and reading one back at whichever update wrote it",
  parts: [
    "module/build-codec",
    "module/build-codec-indices",
    "module/build-codec-v52",
    "module/build-codec-v52-champion-points",
    "module/build-codec-v52-equipment",
    "module/build-codec-v52-skills",
    "data-table/build-codec-v52-rank-pages",
    "data-table/build-codec-v52-skill-pages",
    "module/item-level-places",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An update that changed the layout has a codec of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An update that changed no layout is read by the codec of the update it matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every past update stays readable and only the newest update is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The first byte says the build is a character and the next byte says which update wrote the build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build whose first two bytes are not recognised is read as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer and the reader of one update take the bits in the one order.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every update a character or companion codec reads is round-tripped by a test.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every codec kept for a character or a companion build both writes and reads.",
    },
  ],
  createdAt: "2026-09-02T16:15:21.044Z",
  updatedAt: "2026-10-20T19:48:05.984Z",
} as const satisfies Domain
