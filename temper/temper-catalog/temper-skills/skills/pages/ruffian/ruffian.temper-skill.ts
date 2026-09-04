import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ruffian = {
  id: "019e6226-0111-7451-91bc-f1b0a23ad0a6",
  pageTypeSlug: "temper-skill",
  slug: "ruffian",
  title: "Ruffian",
  key: "ruffian",
  baseName: "Ruffian",
  description:
    '"Gives you a 15% damage bonus when attacking stunned, immobilized, or silenced enemies."',
  icon: "/esoui/art/icons/ability_weapon_014.dds",
  esoSkillId: 45481,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
