import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkContainer = {
  id: "01a06137-f963-7bd7-a68f-851bd0289e6b",
  type: "module",
  slug: "check-container",
  definition: "the condition check over a container's cooldown, currency cap, and reward ceiling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A non-container item fails both container conditions rather than skipping the check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transmute crystal container is specialized type 875 with Transmut inside the item name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container held at the transmute crystal cap fails the can-open condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Max rewards fails only when one character knows every script and another does not.",
    },
  ],
} as const satisfies Module
