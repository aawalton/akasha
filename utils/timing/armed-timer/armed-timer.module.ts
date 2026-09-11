import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const armedTimer = {
  id: "01a090ab-acc0-7541-a3a9-a1241d1ee505",
  pageTypeSlug: "module",
  type: "module",
  slug: "armed-timer",
  definition: "the one timeout a caller has pending, armed again or stopped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "At most one timeout is pending at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Arming again clears the timeout pending rather than adding a second one.",
    },
    {
      invariantKind: "departure",
      statement: "A reset restarts the whole span.",
    },
    {
      invariantKind: "departure",
      statement: "A timeout that fires is no longer pending before the caller's act runs.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped timer is stopped for good.",
    },
    {
      invariantKind: "departure",
      statement: "A reset after a stop arms nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping clears the timeout pending.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a timer is stopped is answered to the caller.",
    },
    {
      invariantKind: "departure",
      statement: "Arming again after a fire is the caller's own act rather than this module's.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what the caller's act does.",
    },
    {
      invariantKind: "absence",
      statement: "No caller reaches the handle a timeout is held by.",
    },
  ],
} as const satisfies Module
