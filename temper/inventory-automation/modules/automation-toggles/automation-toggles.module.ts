import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationToggles = {
  id: "01a06038-b7a3-702e-9416-158e24c98857",
  type: "module",
  slug: "automation-toggles",
  definition: "every automation a character or a companion can have switched on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle name is written down in one place only.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The type of a set of toggles follows from that list rather than restating that list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character and a companion are automated by lists of their own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle a scope does not carry is absent rather than false.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings have a map for characters and a map for companions at every moment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle set for everyone lives under the global scope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character is keyed by its ESO character identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion is keyed by its companion identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal lists the toggle names in the order the toggle names are written.",
    },
  ],
} as const satisfies Module
