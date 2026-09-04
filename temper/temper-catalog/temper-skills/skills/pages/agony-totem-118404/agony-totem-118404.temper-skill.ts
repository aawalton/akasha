import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const agonyTotem118404 = {
  id: "019e6f53-9ea4-78f5-8b85-79ba80ad432b",
  pageTypeSlug: "temper-skill",
  slug: "agony-totem-118404",
  title: "Agony Totem",
  key: "agony-totem-118404",
  baseName: "Bone Totem",
  description:
    '"Summon an effigy of bone at your feet for |cffffff13|r seconds that grants Minor Protection to you and your allies, reducing damage taken by |cffffff5|r%. Enemies in the area are afflicted with Major Cowardice.\\n\\nAfter |cffffff2|r seconds, the totem begins fearing nearby enemies every |cffffff2|r seconds, causing them to cower in place for |cffffff4|r seconds.\\n\\nAllies can activate the Pure Agony synergy, dealing |cffffff9324|r Magic Damage over |cffffff5|r seconds to enemies."',
  icon: "/esoui/art/icons/ability_necromancer_010_b.dds",
  esoSkillId: 118404,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
