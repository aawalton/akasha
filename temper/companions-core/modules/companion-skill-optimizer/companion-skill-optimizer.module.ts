import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillOptimizer = {
  id: "01a06152-c2d3-745f-a9ce-273ae6b1e966",
  type: "module",
  slug: "companion-skill-optimizer",
  definition: "candidate skill combination search producing the top ranked companion skill bars",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Buff skills are ranked from the last bar position rather than the first.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A tank build reserves the first bar slot for a taunt skill.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A combination with more than one armor skill is rejected.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A taunt counts only when its cooldown is sixteen seconds or shorter.",
    },
  ],
} as const satisfies Module
