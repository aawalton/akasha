import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildInterfaceExpanding = {
  id: "01a198a1-eacc-702b-a8c1-9ebcc7c1c5fc", type: "page-type/module",
  slug: "build-interface-expanding",
  definition: "a build with everything its build interfaces hold added to it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive both hold is held to the higher of the two ranks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interface's slotted star takes only a slot the build leaves empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's own stars come before its interfaces' stars, so they are bought first.",
    },
  ],
  code: "ts",
  test: "ts", createdAt: "2026-11-01T19:41:50.668Z", updatedAt: "2026-11-01T19:41:50.668Z",
} as const satisfies Module
