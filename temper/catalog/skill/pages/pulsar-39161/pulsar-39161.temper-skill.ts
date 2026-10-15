import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pulsar39161 = {
  id: "019e6f53-a559-7a38-b03a-904c08a78d24",
  type: "page-type/temper-skill",
  slug: "pulsar-39161",
  title: "Pulsar",
  key: "pulsar-39161",
  baseName: "Impulse",
  description:
    "Release a surge of elemental energy, dealing |cffffff6401|r Magic Damage to nearby enemies and afflicting them with Minor Mangle, reducing their Max Health by |cffffff10|r% for |cffffff10|r seconds.\n\nFlame Pulsar hits Burning enemies with Pulsar Afterburn, which deals more damage based on their missing Health.\n\nFrost Pulsar also provides Minor Protection.\n\nStorm Pulsar's damage increases based on the number of enemies hit.",
  icon: "/esoui/art/icons/ability_destructionstaff_008_b.dds",
  esoSkillId: 39161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 939,
  createdAt: "2026-05-28T16:03:33.337Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Mangle (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 7 seconds (Constant)",
    "<<5>> = Flame Pulsar (Constant)",
    "<<6>> = Pulsar Afterburn (Constant)",
  ],
} as const satisfies TemperSkill
