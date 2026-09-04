import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const agonyTotem = {
  id: "019e6245-a5e8-7afb-a5b3-1c1805aebd73",
  pageTypeSlug: "temper-skill",
  slug: "agony-totem",
  title: "Agony Totem",
  key: "agony-totem",
  baseName: "Bone Totem",
  description:
    '"Summon an effigy of bone at your feet for 13 seconds that grants Minor Protection to you and your allies, reducing damage taken by 5%. Enemies in the area are afflicted with Major Cowardice.\\n\\nAfter 2 seconds, the totem begins fearing nearby enemies every 2 seconds, causing them to cower in place for 4 seconds.\\n\\nAllies can activate the Pure Agony synergy, dealing 2100 Magic Damage over 5 seconds to enemies."',
  icon: "/esoui/art/icons/ability_necromancer_010_b.dds",
  esoSkillId: 40118404,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
