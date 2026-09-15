import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCompanionCodec = {
  id: "01a062e7-4dda-7f1d-8fd9-fe2d9062ea42",
  type: "page-type/domain",
  slug: "temper-companion-codec",
  definition:
    "packing a companion build into text and reading one back at whichever update wrote it",
  parts: ["module/companion-codec", "module/companion-codec-indices", "module/companion-codec-v49"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An update that changed the layout has a codec of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every past update stays readable and only the newest update is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The first byte says the build is a companion and the next byte says which update wrote the build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build whose first two bytes are not recognised is read as nothing.",
    },
  ],
} as const satisfies Domain
