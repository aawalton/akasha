import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneTotem = {
  id: "019e6f53-9f75-7454-af1c-76a24fbf035f",
  pageTypeSlug: "temper-skill",
  slug: "bone-totem",
  title: "Bone Totem",
  key: "bone-totem",
  baseName: "Bone Totem",
  description:
    '"Summon an effigy of bone at your feet for |cffffff11|r seconds that grants Minor Protection to you and your allies, reducing damage taken by |cffffff5|r%. Enemies in the area are afflicted with Major Cowardice, reducing their Weapon and Spell Damage by |cffffff430|r.\\n\\nAfter |cffffff2|r seconds, the totem begins fearing nearby enemies every |cffffff2|r seconds, causing them to cower in place for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_010.dds",
  esoSkillId: 115093,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
