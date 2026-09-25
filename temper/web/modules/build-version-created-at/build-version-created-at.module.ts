import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildVersionCreatedAt = {
  id: "01a0d6ce-62ac-73a1-a83d-9df3d5744100",
  type: "page-type/module",
  slug: "build-version-created-at",
  definition: "the instant a build version was created",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A version whose id is a uuid of version 7 was created at the moment in its id.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A version whose id holds no moment was created at a version number that is an instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version with neither has no instant rather than the start of the epoch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version with no instant is listed after every version with one.",
    },
  ],
} as const satisfies Module
