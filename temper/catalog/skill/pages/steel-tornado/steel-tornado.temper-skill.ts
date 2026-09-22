import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const steelTornado = {
  id: "019e6226-0117-7f46-ad86-52c3dc11544a",
  type: "page-type/temper-skill",
  slug: "steel-tornado",
  title: "Steel Tornado",
  key: "steel-tornado",
  baseName: "Whirlwind",
  description:
    '"Launch yourself into a lethal spin, releasing a flurry of blades around you that deals 1742 Physical Damage to nearby enemies. Deals up to 33% more damage to enemies with less than 50% Health."',
  icon: "/esoui/art/icons/ability_dualwield_005_b.dds",
  esoSkillId: 40744,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
