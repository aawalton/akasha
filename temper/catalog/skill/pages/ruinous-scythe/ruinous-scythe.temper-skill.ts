import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ruinousScythe = {
  id: "019e6245-a716-7489-878c-e6387675bd64",
  type: "page-type/temper-skill",
  slug: "ruinous-scythe",
  title: "Ruinous Scythe",
  key: "ruinous-scythe",
  baseName: "Death Scythe",
  description:
    "Slice into your enemy's life force, dealing 1799 Bleed Damage, applying the Hemorrhaging status effect, and setting them Off Balance for 7 seconds.\n\nYou heal for 2400 Health for the first enemy hit, and an additional 800 for each additional enemy, up to five times. The healing of this ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_007_b.dds",
  esoSkillId: 40118226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 1091,
  createdAt: "2026-05-26T03:13:12.470Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Bleed, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 7 seconds (Constant)",
    "<<4>> = 0.15 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
