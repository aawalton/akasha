import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoneArmor = {
  id: "019e6f53-a8c7-7c43-a8ef-035b2ad88dbd",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bone-armor",
  title: "Vengeance Bone Armor",
  key: "vengeance-bone-armor",
  baseName: "Vengeance Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nYou also count as a corpse, up to once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008.dds",
  esoSkillId: 246025,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
