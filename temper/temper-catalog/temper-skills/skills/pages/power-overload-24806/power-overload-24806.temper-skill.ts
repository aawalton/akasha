import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerOverload24806 = {
  id: "019e6f53-a52b-707a-8d37-c1d0c18b3540",
  pageTypeSlug: "temper-skill",
  slug: "power-overload-24806",
  title: "Power Overload",
  key: "power-overload-24806",
  baseName: "Overload",
  description:
    '"Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\\n\\nLight Attacks become lightning bolts, dealing |cffffff9177|r Shock Damage to an enemy up to |cffffff32|r meters away.\\n\\nHeavy Attacks blast enemies in a |cffffff6 x 8|r area for |cffffff8727|r Shock Damage.\\n\\nAttacks deplete Ultimate until you run out, or the ability is toggled off."',
  icon: "/esoui/art/icons/ability_sorcerer_power_overload.dds",
  esoSkillId: 24806,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
