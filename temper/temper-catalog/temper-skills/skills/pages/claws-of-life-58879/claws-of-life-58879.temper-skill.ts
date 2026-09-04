import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const clawsOfLife58879 = {
  id: "019e6f53-9ff3-73e4-8617-449c1588832f",
  pageTypeSlug: "temper-skill",
  slug: "claws-of-life-58879",
  title: "Bloodclaws",
  key: "claws-of-life-58879",
  baseName: "Rending Claws",
  description:
    '"Shred up to |cffffff6|r enemies in front of you with blood soaked claws, dealing |cffffff6617|r Physical Damage and an additional |cffffff11560|r Bleed Damage over |cffffff10|r seconds. Reduced to |cffffff6936|r Bleed Damage over |cffffff6|r seconds against players.\\n\\nYou heal for |cffffff41|r% of the initial hit\'s damage, while you heal for |cffffff1160|r Health with the damage over time, based off your Max Health.\\n\\nThe initial hit grants a stack of Blood Hunger per enemy hit and has a |cffffff15|r% chance of applying Sundered, while the damage over time has a |cffffff5|r% chance of applying Hemorrhaging."',
  icon: "/esoui/art/icons/ability_werewolf_006_c.dds",
  esoSkillId: 58879,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 2,
  rank: 9,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
