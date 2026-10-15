import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hungryScythe = {
  id: "019e6245-a6a8-7109-b7f7-39367708b043",
  type: "page-type/temper-skill",
  slug: "hungry-scythe",
  title: "Hungry Scythe",
  key: "hungry-scythe",
  baseName: "Death Scythe",
  description:
    "Slice into your enemy's life force, dealing 1742 Magic Damage.  \n\nYou heal for 2400 Health for the first enemy hit, and an additional 800 for each additional enemy, up to five times. After dealing damage, you heal for 991 Health every 2 seconds over 10 seconds. The healing of this ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_007_a.dds",
  esoSkillId: 40118223,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 642,
  createdAt: "2026-05-26T03:13:12.360Z",
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
