import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shockingSiphon = {
  id: "019e6f53-a706-77d9-b869-be3372411eb1",
  pageTypeSlug: "temper-skill",
  slug: "shocking-siphon",
  title: "Shocking Siphon",
  key: "shocking-siphon",
  baseName: "Shocking Siphon",
  description:
    '"Violently drain the last spark of life from a corpse, dealing |cffffff21510|r Shock Damage over |cffffff20|r seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.\\n\\nWhile slotted, your damage done is increased by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_005.dds",
  esoSkillId: 115924,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
