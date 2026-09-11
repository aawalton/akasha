import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoSkillActionBarTimers = {
  id: "01a06115-1ad5-7d01-8cc1-694928184aab",
  type: "module",
  slug: "fco-skill-action-bar-timers",
  definition: "the countdown text the interface tweaks draw on an action slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
