import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hungryScythe118223 = {
  id: "019e6f53-a32f-70e0-a0c8-033e9a37540e",
  type: "page-type/temper-skill",
  slug: "hungry-scythe-118223",
  title: "Hungry Scythe",
  key: "hungry-scythe-118223",
  baseName: "Death Scythe",
  description:
    "Slice into your enemy's life force, dealing |cffffff6401|r Magic Damage.  \n\nYou heal for |cffffff3016|r Health for the first enemy hit, and an additional |cffffff1005|r for each additional enemy, up to five times. After dealing damage, you heal for |cffffff1246|r Health every |cffffff2|r seconds over |cffffff10|r seconds. The healing of this ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_007_a.dds",
  esoSkillId: 118223,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 643,
  createdAt: "2026-05-28T16:03:32.783Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.15 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<4>> = 0.0620055 Health - 1.07672 (Health, Heal, SingleTarget, DOT, 8s duration, 2s tick, R2 = 0.999999)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
