import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonShade = {
  id: "019e6f53-a7dc-7443-a4dd-09322eef5d19",
  pageTypeSlug: "temper-skill",
  slug: "summon-shade",
  title: "Summon Shade",
  key: "summon-shade",
  baseName: "Summon Shade",
  description:
    '"Summon a shade version of yourself to attack an enemy and fight at your side for |cffffff20|r seconds. \\n\\nThe shade slashes at an enemy, dealing |cffffff1613|r Magic Damage once every |cffffff2|r seconds, and inflicts Minor Maim for |cffffff4|r seconds, reducing the enemy\'s damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_001.dds",
  esoSkillId: 33211,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
