import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperScribedSkill = {
  id: "01a05fca-cb8a-72ce-84c1-1585368027e5",
  type: "page-type/page-type",
  slug: "temper-scribed-skill",
  definition: "a skill written out of a grimoire and its scripts",
  extends: ["page-type/temper-skill"],
  parts: ["relation-property/focus-script-id", "relation-property/grimoire-id"],
  properties: [
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "relation-property/focus-script-id", required: true, many: false },
    { pageProperty: "relation-property/grimoire-id", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
