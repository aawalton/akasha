import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ruffian = {
  id: "019e6226-0111-7451-91bc-f1b0a23ad0a6",
  type: "page-type/temper-skill",
  slug: "ruffian",
  title: "Ruffian",
  key: "ruffian",
  baseName: "Ruffian",
  description:
    "Gives you a 15% damage bonus when attacking stunned, immobilized, or silenced enemies.",
  icon: "/esoui/art/icons/ability_weapon_014.dds",
  esoSkillId: 45481,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1085,
  createdAt: "2026-05-26T02:38:38.353Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15% (Constant)"],
} as const satisfies TemperSkill
