import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boundlessStorm = {
  id: "019e6245-a604-7e61-b2cb-cd920ea52d52",
  pageTypeSlug: "temper-skill",
  slug: "boundless-storm",
  title: "Boundless Storm",
  key: "boundless-storm",
  baseName: "Lightning Form",
  description:
    '"Manifest yourself as pure lightning, zapping nearby enemies with electricity dealing 463 Shock Damage every 2 seconds for 30 seconds.\\n\\nWhile in this form you also gain Major Resolve, increasing your Physical Resistance and Spell Resistance by 5948.\\n\\nActivating this grants you Major Expedition, increasing your Movement Speed by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_boundless_storm.dds",
  esoSkillId: 30255,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
