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
      statement: "The engine's captured constants are loaded before the models that read them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The functions the game documents are loaded after the models, so a model's own wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A documented function no model defines answers the empty value of its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the running game answered a function is loaded last, so it answers instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The engine's captured colors are loaded before the defaults, so its getter answers them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The captured text of the game's strings is loaded before the defaults, so its getter answers it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model takes what a constant is numbered from the capture rather than saying it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A number a model made up is self-consistent, so nothing shows it is not the game's.",
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
      statement: "A caller reads which controls' initializers raised, and what each raised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle is loaded so that one module of that bundle is reached afterwards.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source ending in no bundle entry is refused rather than loaded that way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands the control templates over before loading what uses them.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own Lua asks whether a control it names is made yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the game's own Lua or a control would hold is never answered with a stub.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Handing templates over a second time leaves the ones handed over before.",
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
