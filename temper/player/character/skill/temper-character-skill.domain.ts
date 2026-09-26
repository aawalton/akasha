import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterSkill = {
  id: "01a0617a-2c72-7654-ad18-45a07d7e27ca",
  type: "page-type/domain",
  slug: "temper-character-skill",
  definition: "the skills an Elder Scrolls Online character learns, slots and scribes",
  parts: [
    "module/character-skill-template",
    "module/character-skills",
    "module/find-skill-by-id",
    "module/grimoire-template",
    "module/passive-queries",
    "module/query-shapes",
    "module/scribed-skill-source",
    "module/scribed-skill-template",
    "module/scribed-skill-types",
    "module/scribed-skills",
    "module/scribing-grimoires",
    "module/scribing-grimoires-00",
    "module/scribing-grimoires-01",
    "module/scribing-grimoires-02",
    "module/scribing-grimoires-03",
    "module/scribing-script-description",
    "module/skill-bar-filtering",
    "module/skill-line-queries",
    "module/held-skill-catalog",
    "module/skill-catalog-loading",
    "domain/temper-skill-point-finder",
    "domain/temper-character-skill-line",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every skill a character may slot is read from the skill pages rather than from code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill's place in the whole table is the index a build hash has.",
    },
  ],
} as const satisfies Domain
