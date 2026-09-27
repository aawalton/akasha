import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionVersionActions = {
  id: "01a06591-9eb0-7000-9053-bdd9b8e2dcfd",
  type: "page-type/module",
  slug: "companion-version-actions",
  definition: "the saved versions of a companion build, fetched from a browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer that does not narrow is refused rather than passed on part-read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure comes back as a reason code rather than as a raised error.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A failure carries no wording, and the screen showing it words it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error behind a failure goes to the console.",
    },
  ],
} as const satisfies Module
