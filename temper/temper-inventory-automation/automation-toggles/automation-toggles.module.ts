import type { Module } from "@akasha/code-system/module"

export const automationToggles = {
  id: "01a06038-b7a3-702e-9416-158e24c98857",
  pageTypeSlug: "module",
  slug: "automation-toggles",
  definition: "every automation a character or a companion can have switched on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A toggle name is written down in one place only.",
    },
    {
      invariantKind: "departure",
      statement: "The type of a set of toggles follows from that list rather than restating it.",
    },
    {
      invariantKind: "departure",
      statement: "A character and a companion are automated by lists of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle a scope does not carry is absent rather than false.",
    },
    {
      invariantKind: "departure",
      statement: "Settings carry a map for characters and a map for companions at every moment.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle set for everyone lives under the global scope.",
    },
    {
      invariantKind: "departure",
      statement: "A character is keyed by its ESO character identity.",
    },
    {
      invariantKind: "departure",
      statement: "A companion is keyed by its companion identity.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal lists the toggle names in the order the toggle names are written.",
    },
  ],
} as const satisfies Module
