import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsAddonRecord = {
  id: "01a060d8-0919-792d-bef8-62245cc5dac8",
  type: "module",
  slug: "errors-addon-record",
  definition: "one Lua error written into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error whose callstack matches a kept entry raises that entry's count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fifty-first distinct error displaces the entry least recently seen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every entry names the account and the character and the world of that error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Recording before the add-on has loaded throws.",
    },
  ],
} as const satisfies Module
