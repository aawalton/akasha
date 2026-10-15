import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pulsar = {
  id: "019e6226-0104-7c4e-9ac0-9ac9de69ce63",
  type: "page-type/temper-skill",
  slug: "pulsar",
  title: "Pulsar",
  key: "pulsar",
  baseName: "Impulse",
  description:
    "Release a surge of elemental energy, dealing 1742 Magic Damage to nearby enemies and afflicting them with Minor Mangle, reducing their Max Health by 10% for 10 seconds.\n\nFlame Pulsar hits Burning enemies with Pulsar Afterburn, which deals more damage based on their missing Health.\n\nFrost Pulsar also provides Minor Protection.\n\nStorm Pulsar's damage increases based on the number of enemies hit.",
  icon: "/esoui/art/icons/ability_destructionstaff_008_b.dds",
  esoSkillId: 42996,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 938,
  createdAt: "2026-05-26T02:38:38.340Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Mangle (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Flame Pulsar (Constant)",
    "<<6>> = Pulsar Afterburn (Constant)",
  ],
} as const satisfies TemperSkill
