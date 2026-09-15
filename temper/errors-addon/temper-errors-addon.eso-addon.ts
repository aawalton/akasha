import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperErrorsAddon = {
  id: "01a060d8-091b-75bc-9d03-8347c2e81d2f",
  type: "eso-addon",
  slug: "temper-errors-addon",
  definition: "the add-on that records every Lua error the game raises into saved variables",

  addonManifest: "json",
  bundleEntry: "module/errors-addon-entry",
  parts: [
    "module/errors-addon-build-ids",
    "module/errors-addon-entry",
    "module/errors-addon-hooks",
    "module/errors-addon-limits",
    "module/errors-addon-record",
    "module/errors-addon-traceback",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error raised before the add-on loads is recorded once loading finishes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two errors sharing one callstack are kept as one entry under a count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error is blamed on the add-on folder its callstack names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the recorded errors back.",
    },
  ],
} as const satisfies EsoAddon
