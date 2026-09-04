import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoltEscape = {
  id: "019e6f53-a8c6-7610-8f34-2e711258ccf7",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bolt-escape",
  title: "Vengeance Bolt Escape",
  key: "vengeance-bolt-escape",
  baseName: "Vengeance Bolt Escape",
  description:
    '"Transform yourself into pure energy and flash forward, stunning up to 3 enemies near your final location for |cffffff1|r second. \\n\\nThis effect cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_bolt_escape.dds",
  esoSkillId: 237981,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
