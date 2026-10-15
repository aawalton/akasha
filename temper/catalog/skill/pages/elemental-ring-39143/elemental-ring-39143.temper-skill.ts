import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalRing39143 = {
  id: "019e6f53-a11f-7e1b-8b49-aab1c0fd63ec",
  type: "page-type/temper-skill",
  slug: "elemental-ring-39143",
  title: "Elemental Ring",
  key: "elemental-ring-39143",
  baseName: "Impulse",
  description:
    "Release a surge of elemental energy, dealing |cffffff6611|r Magic Damage to enemies at the target location.\n\nFire Ring hits Burning enemies with Ring Afterburn, which deals more damage based on their missing Health.\n\nFrost Ring also provides Minor Protection.\n\nShock Ring's damage increases based on the number of enemies hit.",
  icon: "/esoui/art/icons/ability_destructionstaff_008_a.dds",
  esoSkillId: 39143,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 408,
  createdAt: "2026-05-28T16:03:32.255Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Fire Ring (Constant)",
    "<<3>> = Ring Afterburn (Constant)",
  ],
} as const satisfies TemperSkill
