import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const overload = {
  id: "019e6f53-a4d6-7a35-be7a-72344a01a816",
  pageTypeSlug: "temper-skill",
  slug: "overload",
  title: "Overload",
  key: "overload",
  baseName: "Overload",
  description:
    '"Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\\n\\nLight Attacks become lightning bolts, dealing |cffffff8076|r Shock Damage to an enemy up to |cffffff28|r meters away.  \\n\\nHeavy Attacks blast enemies in a |cffffff4 x 6|r area for |cffffff7681|r Shock Damage.\\n\\nAttacks deplete Ultimate until you run out, or the ability is toggled off."',
  icon: "/esoui/art/icons/ability_sorcerer_overload.dds",
  esoSkillId: 24785,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
