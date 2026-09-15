import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibAsync = {
  id: "01a0606a-1c52-7326-b2c4-11a5a0c5c3fa",
  type: "eso-addon",
  slug: "temper-lib-async",
  definition: "a shared scheduler running other addons' work a slice at a time across frames",

  addonManifest: "json",
  bundleEntry: "module/async-main",
  parts: [
    "module/async-api",
    "module/async-casts",
    "module/async-constants",
    "module/async-global",
    "module/async-lua-truthy",
    "module/async-main",
    "module/async-saved-vars",
    "module/async-scheduler",
    "module/async-scheduler-manager",
    "module/async-state",
    "module/async-task-callstack",
    "module/async-task-class",
    "module/async-task-loops",
    "module/async-task-sort",
    "module/async-task-timer",
    "module/async-types",
    "type-declaration/async-saved-vars-declarations",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Work handed in is run in slices rather than in a single call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slice is bounded by a share of the frame the game is drawing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time here is seconds read from the game's own frame and update clocks.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing here reaches the Lua `os` table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task has a callstack of steps rather than a Lua coroutine.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The debug logger is used where the debug logger is loaded and skipped otherwise.",
    },
  ],
} as const satisfies EsoAddon
