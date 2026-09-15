import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armedTimer = {
  id: "01a090ab-acc0-7541-a3a9-a1241d1ee505",
  type: "module",
  slug: "armed-timer",
  definition: "the one timeout a caller has pending, armed again or stopped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timers work is scheduled through are handed in so a test needs no wait.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "At most one timeout is pending at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Arming again clears the timeout pending rather than adding a second one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset restarts the whole span.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A timeout that fires is no longer pending before the caller's act runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stopped timer is stopped for good.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset after a stop arms nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping clears the timeout pending.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a timer is stopped is answered to the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Arming again after a fire is the caller's own act rather than this module's.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows what the caller's act does.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No caller reaches the handle a timeout is held by.",
    },
  ],
} as const satisfies Module
