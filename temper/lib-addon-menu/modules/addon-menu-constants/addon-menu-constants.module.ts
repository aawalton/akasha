import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuConstants = {
  id: "01a06100-0000-7000-8000-000000000002",
  type: "page-type/module",
  slug: "addon-menu-constants",
  definition: "the fixed names, sizes, and per-widget version numbers of the library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each widget type has its own version number.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The library version is split into a major string and a minor number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dialog identifiers are literal strings rather than generated names.",
    },
  ],
} as const satisfies Module
