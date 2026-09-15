import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibDebugLogger = {
  id: "01a06061-408b-7657-add9-d2dfd959f9b9",
  type: "page-type/eso-addon",
  slug: "temper-lib-debug-logger",
  definition: "the in-game log every other addon writes to and the errors the client raises",

  addonManifest: "json",
  bundleEntry: "module/debug-logger-main",
  parts: [
    "module/debug-logger-api",
    "module/debug-logger-callbacks",
    "module/debug-logger-casts",
    "module/debug-logger-compatibility",
    "module/debug-logger-constants",
    "module/debug-logger-global",
    "module/debug-logger-log-handler",
    "module/debug-logger-main",
    "module/debug-logger-settings",
    "module/debug-logger-startup",
    "module/debug-logger-state",
    "module/debug-logger-tagged-logger",
    "module/debug-logger-types",
    "type-declaration/debug-logger-declarations",
    "type-declaration/debug-logger-saved-variables",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The log lives in memory and is written to the saved variables at logout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry older than a day is dropped when the saved log is read back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time here is milliseconds from the epoch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time here is worked out from the game clock.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This library depends on no other addon.",
    },
  ],
} as const satisfies EsoAddon
