import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const subterraneanAssault86019 = {
  id: "019e6f53-a7d7-764f-a5f5-b693fc38f3b5",
  type: "page-type/temper-skill",
  slug: "subterranean-assault-86019",
  title: "Subterranean Assault",
  key: "subterranean-assault-86019",
  baseName: "Scorch",
  description:
    "Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff9521|r Poison Damage to enemies in front of you.\n\nAfter the shalk complete their attack, they burrow underground for |cffffff3|r seconds and then resurface again, dealing |cffffff9521|r Poison Damage to enemies in front of you.",
  icon: "/esoui/art/icons/ability_warden_015_b.dds",
  esoSkillId: 86019,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1286,
  createdAt: "2026-05-28T16:03:33.975Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.111564 MaxStat + 1.17142 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Poison, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
