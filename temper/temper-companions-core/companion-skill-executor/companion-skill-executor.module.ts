import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillExecutor = {
  id: "01a06152-c2d2-7cd9-b804-35603434ce8d",
  pageTypeSlug: "module",
  slug: "companion-skill-executor",
  definition: "what activating a companion skill does to the rotation state",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The global cooldown starts when a cast finishes rather than when the cast begins.",
    },
    {
      invariantKind: "constraint",
      statement: "Refreshing an effect adds only the time past its old end.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A heals-self-only skill extends the ultimate window only while that window is open.",
    },
  ],
} as const satisfies Module
