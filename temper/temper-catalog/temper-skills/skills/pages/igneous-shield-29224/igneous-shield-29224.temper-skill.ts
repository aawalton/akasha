import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const igneousShield29224 = {
  id: "019e6f53-a349-7145-a1a3-0c1c34929a21",
  pageTypeSlug: "temper-skill",
  slug: "igneous-shield-29224",
  title: "Igneous Shield",
  key: "igneous-shield-29224",
  baseName: "Obsidian Shield",
  description:
    '"Call the earth to your defense, granting a damage shield for nearby allies that absorbs |cffffff1873|r damage. Your own damage shield absorbs |cffffff5419|r damage. This portion of the ability scales off your Max Health.\\n\\nYou also gain Major Mending, increasing your healing done by |cffffff16|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_017b.dds",
  esoSkillId: 29224,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
