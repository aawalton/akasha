import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceBoltEscape = {
  id: "019e6f53-a8c6-7610-8f34-2e711258ccf7",
  type: "page-type/temper-skill",
  slug: "vengeance-bolt-escape",
  title: "Vengeance Bolt Escape",
  key: "vengeance-bolt-escape",
  baseName: "Vengeance Bolt Escape",
  description:
    "Transform yourself into pure energy and flash forward, stunning up to 3 enemies near your final location for |cffffff1|r second. \n\nThis effect cannot be blocked.",
  icon: "/esoui/art/icons/ability_sorcerer_bolt_escape.dds",
  esoSkillId: 237981,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 1425,
  createdAt: "2026-05-28T16:03:34.214Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 (Constant)", "<<2>> = 1 second (Constant)"],
} as const satisfies TemperSkill
