import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiHarness = {
  id: "01a0c97e-4173-73b6-a373-3a2f933756b3",
  type: "page-type/module",
  slug: "ui-harness",
  definition: "a sandbox whose controls are kept, opened for a caller to drive and read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The control model is loaded from the file beside the model's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model file is read once and kept for every harness after the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is loaded after the prelude, so a control answers before a stub does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming no control is answered with the tree under the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty Lua table answered as an object is read as an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own Lua takes tracebacks, so a harness keeps the name they come from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller reads how often each method the model lacks was called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller names the control and the event to run a handler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running a handler the control does not have answers false rather than failing.",
    },
  ],
} as const satisfies Module
