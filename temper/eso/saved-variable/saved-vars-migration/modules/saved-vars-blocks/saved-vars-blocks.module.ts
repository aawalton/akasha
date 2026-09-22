import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVarsBlocks = {
  id: "01a06072-5abc-7ca4-972f-214d6d6ef964",
  type: "page-type/module",
  slug: "saved-vars-blocks",
  definition: "a global's assignment lifted whole out of a saved variables file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A global's block opens on the line assigning that global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global's block closes where a line begins with a closing brace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global's block closes early where another global's assignment opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global the file does not assign has no block.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block already present in the target is appended no second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line ending the target already uses is the line ending appended with.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here parses Lua.",
    },
  ],
} as const satisfies Module
