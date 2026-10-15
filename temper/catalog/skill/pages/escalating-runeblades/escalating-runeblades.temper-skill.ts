import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const escalatingRuneblades = {
  id: "019e6245-a672-7aa4-8819-5da7bc3c818e",
  type: "page-type/temper-skill",
  slug: "escalating-runeblades",
  title: "Escalating Runeblades",
  key: "escalating-runeblades",
  baseName: "Runeblades",
  description:
    "Craft a series of Apocryphal runes before launching them at a foe, dealing 696 Magic Damage, 766 Magic Damage, and 917 Magic Damage and generating Crux. The last rune explodes, dealing damage to all enemies within 8 meters of the target.\n\nThis ability deals 3% increased damage for each active Crux when cast.",
  icon: "/esoui/art/icons/ability_arcanist_001_b.dds",
  esoSkillId: 40182977,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 452,
  createdAt: "2026-05-26T03:13:12.306Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0341034 MaxStat + 0.35787 MaxPower - 0.976442 (Ultimate, ratio = 10.49, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
    "<<3>> = 0.0408486 MaxStat + 0.430039 MaxPower - 3.42732 (Ultimate, ratio = 10.53, Dmg, Magic, AOE, Direct, Melee, R2 = 0.999999)",
    "<<4>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
