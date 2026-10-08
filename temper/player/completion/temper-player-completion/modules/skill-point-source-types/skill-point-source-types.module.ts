import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointSourceTypes = {
  id: "01a06108-2ff9-79f9-89de-7ec1b805bb4d",
  type: "page-type/module",
  slug: "skill-point-source-types",
  definition: "the shape of a place The Elder Scrolls Online hands a character a skill point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.657Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
