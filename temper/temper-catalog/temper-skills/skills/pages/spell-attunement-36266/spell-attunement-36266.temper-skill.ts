import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellAttunement36266 = {
  id: "019e6f53-a789-7884-b99a-ea4c2005e546",
  pageTypeSlug: "temper-skill",
  slug: "spell-attunement-36266",
  title: "Spell Attunement",
  key: "spell-attunement-36266",
  baseName: "Spell Attunement",
  description:
    '"Increases your Spell Resistance by |cffffff660|r. This effect is doubled if you are afflicted with Burning, Chilled, or Concussed.  \\n\\nIncreases your Magicka Recovery by |cffffff40|r."',
  icon: "/esoui/art/icons/ability_sorcerer_013.dds",
  esoSkillId: 36266,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
} as const satisfies TemperSkill
