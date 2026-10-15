import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const puncturingStrikes = {
  id: "019e6f53-a560-7d5d-ad15-93ce8ab131c2",
  type: "page-type/temper-skill",
  slug: "puncturing-strikes",
  title: "Puncturing Strikes",
  key: "puncturing-strikes",
  baseName: "Puncturing Strikes",
  description:
    "Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals |cffffff3270|r Magic Damage per strike and reduces enemy Movement Speed by |cffffff40|r% for |cffffff0.5|r seconds.",
  icon: "/esoui/art/icons/ability_templar_trained_attacker.dds",
  esoSkillId: 26114,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 943,
  createdAt: "2026-05-28T16:03:33.344Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.038333 MaxStat + 0.4025 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 40% (Constant)",
    "<<3>> = 0.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
