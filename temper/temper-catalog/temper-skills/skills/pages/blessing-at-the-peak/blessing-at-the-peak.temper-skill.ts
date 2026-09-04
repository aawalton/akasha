import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blessingAtThePeak = {
  id: "019e6f53-9f2e-7464-9d24-8832f82790fe",
  pageTypeSlug: "temper-skill",
  slug: "blessing-at-the-peak",
  title: "Blessing at the Peak",
  key: "blessing-at-the-peak",
  baseName: "Blessing at the Peak",
  description:
    '"Where earth meets sky is a wellspring of power you can tap at will.\\n\\nWhen you cast or deal damage with an Earthen Heart ability in combat you generate |cffffff1|r Ultimate. This effect can occur once every |cffffff6|r seconds.\\n\\nIncreases your Critical Damage by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_024.dds",
  esoSkillId: 29473,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "passive",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
