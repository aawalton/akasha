import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const remoteTotem = {
  id: "019e6245-a709-77c5-bdad-82bd2a05a95b",
  pageTypeSlug: "temper-skill",
  slug: "remote-totem",
  title: "Remote Totem",
  key: "remote-totem",
  baseName: "Bone Totem",
  description:
    '"Summon an effigy of bone for 11 seconds that grants Minor Protection to you and your allies, reducing damage taken by 5%. Enemies in the area are afflicted with Major Cowardice, reducing their Weapon and Spell Damage by 430.\\n\\nAfter 2 seconds, the totem begins fearing nearby enemies every 2 seconds, causing them to cower in place for 4 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_010_a.dds",
  esoSkillId: 40118380,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
