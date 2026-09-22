import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libsetsUpstreamPin = {
  id: "01a060d0-ca28-7a33-9895-ea3ff07665be",
  type: "page-type/module",
  slug: "libsets-upstream-pin",
  definition: "the upstream LibSets commit holding temper's copied set data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The upstream is pinned to a single commit rather than to a branch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pinned release is stated as the AddOnVersion the upstream manifest carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files a copy needs are named in the order upstream loads the files.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The files are named in the order upstream loads the files.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Moving the pin to a later commit is a hand-made change.",
    },
  ],
} as const satisfies Module
