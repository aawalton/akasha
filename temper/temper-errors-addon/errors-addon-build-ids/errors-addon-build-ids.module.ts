import type { Module } from "@akasha/code-system/module"

export const errorsAddonBuildIds = {
  id: "01a060d8-0918-78cb-b1c7-2d2db0462ee2",
  pageTypeSlug: "module",
  slug: "errors-addon-build-ids",
  definition: "which add-on a callstack blames and the build that add-on was made from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The blamed folder is the earliest callstack folder the build stamp knows.",
    },
    {
      invariantKind: "departure",
      statement: "A callstack naming no add-on folder blames nobody.",
    },
    {
      invariantKind: "absence",
      statement: "No build stamp is needed for an error to be recorded.",
    },
  ],
} as const satisfies Module
