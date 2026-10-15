import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const degeneration = {
  id: "019e6238-c2b2-70ee-abbf-fc1c9553dcd9",
  type: "page-type/temper-skill",
  slug: "degeneration",
  title: "Degeneration",
  key: "degeneration",
  baseName: "Entropy",
  description:
    "Bind an enemy with chaotic magic, dealing 4642 Magic Damage over 20 seconds.\n\nExcess magic spills out from them, granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 20 seconds.",
  icon: "/esoui/art/icons/ability_mageguild_004_a.dds",
  esoSkillId: 42224,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 352,
  createdAt: "2026-05-26T02:59:07.570Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = Major Brutality (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
