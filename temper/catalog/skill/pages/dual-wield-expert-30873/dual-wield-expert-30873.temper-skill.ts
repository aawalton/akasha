import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dualWieldExpert30873 = {
  id: "019e6f53-a0f6-7c0a-81b0-02797d40bece",
  type: "page-type/temper-skill",
  slug: "dual-wield-expert-30873",
  title: "Dual Wield Expert",
  key: "dual-wield-expert-30873",
  baseName: "Dual Wield Expert",
  description: "Increases Weapon and Spell Damage by |cffffff3|r% of off-hand weapon's damage.",
  icon: "/esoui/art/icons/ability_weapon_013.dds",
  esoSkillId: 30873,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/passive",
  hashPlace: 388,
  createdAt: "2026-05-28T16:03:32.214Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
