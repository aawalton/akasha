import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeCage24578 = {
  id: "019e6f53-a678-7aa8-aecd-e64e4c8d7fa3",
  type: "page-type/temper-skill",
  slug: "rune-cage-24578",
  title: "Rune Cage",
  key: "rune-cage-24578",
  baseName: "Rune Prison",
  description:
    "Imprison an enemy in a constricting sphere of dark magic. After a short duration they are stunned for |cffffff3|r seconds. Deals |cffffff6257|r Magic Damage if the stun lasts the full duration.\n\nThis stun cannot be blocked.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_haze.dds",
  esoSkillId: 24578,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1094,
  createdAt: "2026-05-28T16:03:33.624Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
