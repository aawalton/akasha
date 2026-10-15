import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const teleportStrike = {
  id: "019e6f53-a824-70b1-adc7-54c9660bb87f",
  type: "page-type/temper-skill",
  slug: "teleport-strike",
  title: "Teleport Strike",
  key: "teleport-strike",
  baseName: "Teleport Strike",
  description:
    "Flash through the shadows and ambush an enemy, dealing |cffffff5571|r Magic Damage and afflicting them with Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_nightblade_008.dds",
  esoSkillId: 18342,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 1330,
  createdAt: "2026-05-28T16:03:34.052Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.069 MaxStat + 0.7245 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Vulnerability (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
