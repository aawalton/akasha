import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneArmor = {
  id: "019e6f53-9f6f-72a7-acdc-4243995e749e",
  pageTypeSlug: "temper-skill",
  slug: "bone-armor",
  title: "Bone Armor",
  key: "bone-armor",
  baseName: "Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r and |cffffff2974|r.\\n\\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008.dds",
  esoSkillId: 115206,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
