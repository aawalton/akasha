import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const beckoningArmor = {
  id: "019e6245-a5f5-71b2-8210-25a9f4e88528",
  pageTypeSlug: "temper-skill",
  slug: "beckoning-armor",
  title: "Beckoning Armor",
  key: "beckoning-armor",
  baseName: "Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for 20 seconds, increasing your Physical Resistance and Spell Resistance by 5948 and 2974.\\n\\nWhile active, ranged attackers will be pulled to you once every 2 seconds and become taunted for 15 seconds if they are not already taunted.\\n\\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every 10 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008_a.dds",
  esoSkillId: 40118237,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
