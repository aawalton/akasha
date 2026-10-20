import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryCapture = {
  id: "01a15590-a44d-775a-8ccb-af35f4cfa282",
  type: "page-type/module",
  slug: "memory-capture",
  definition: "the build readings and fights the add-ons hold, read out of the game's memory",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is taken once for each character, bar and capture time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reading the add-on keeps in its last readings is taken, oldest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading whose capture time moved while it was read is left for the next look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading carries the build hash the add-on kept inside it at its capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeping no build hash of its own lands nothing and is marked seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No reading carries the build hash its character holds now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight is named by when it was written and how long its combat ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight first seen after the first look carries the build its character had when seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight there at the first look carries no build, since its build is not known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was read is marked seen only once the caller has queued it to land.",
    },
  ],
  createdAt: "2026-10-19T19:08:25.036Z",
  updatedAt: "2026-10-20T18:02:43.455Z",
} as const satisfies Module
