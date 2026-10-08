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
      statement: "A version was created at the instant its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A version whose page states none has no instant rather than the start of the epoch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version with no instant is listed after every version with one.",
    },
  ],
  createdAt: "2026-09-25T04:24:05.036Z",
  updatedAt: "2026-10-08T16:18:25.844Z",
} as const satisfies Module
