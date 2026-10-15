import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const veiledStrike = {
  id: "019e6f53-a8ab-77ce-8edf-e178c20b7184",
  type: "page-type/temper-skill",
  slug: "veiled-strike",
  title: "Veiled Strike",
  key: "veiled-strike",
  baseName: "Veiled Strike",
  description:
    "Slash an enemy, dealing |cffffff8076|r Magic Damage. \n\nIf you strike an enemy from their flank you set them Off Balance.",
  icon: "/esoui/art/icons/ability_nightblade_002.dds",
  esoSkillId: 25255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 1406,
  createdAt: "2026-05-28T16:03:34.187Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
