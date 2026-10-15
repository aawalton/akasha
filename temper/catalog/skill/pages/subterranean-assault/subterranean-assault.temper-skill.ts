import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const subterraneanAssault = {
  id: "019e6245-a744-786d-afb2-caea198c3fc7",
  type: "page-type/temper-skill",
  slug: "subterranean-assault",
  title: "Subterranean Assault",
  key: "subterranean-assault",
  baseName: "Scorch",
  description:
    "Stir a group of shalk that attack after 3 seconds, dealing 2591 Poison Damage to enemies in front of you.\n\nAfter the shalk complete their attack, they burrow underground for 3 seconds and then resurface again, dealing 2591 Poison Damage to enemies in front of you.",
  icon: "/esoui/art/icons/ability_warden_015_b.dds",
  esoSkillId: 93791,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1285,
  createdAt: "2026-05-26T03:13:12.516Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.115245612 MaxStat + 1.21007686 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Poison, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
