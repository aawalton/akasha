import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const upstreamLibraries = {
  id: "01a06038-2cbf-7931-aedd-7a1b9a4637c4",
  type: "page-type/module",
  slug: "upstream-libraries",
  definition: "the community ESO libraries behind temper's copied data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A library is named by the slug a caller spells on the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each library names the package its copied data is written into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each library names the upstream files its data is read out of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those files are named against the addons directory rather than as whole paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no library is answered as no library rather than refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy differing from upstream is told apart from a run that broke.",
    },
  ],
} as const satisfies Module
