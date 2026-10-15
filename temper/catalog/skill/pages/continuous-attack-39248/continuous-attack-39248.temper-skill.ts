import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const continuousAttack39248 = {
  id: "019e6f53-a01f-7119-9156-c9d9cd60d8d3",
  type: "page-type/temper-skill",
  slug: "continuous-attack-39248",
  title: "Continuous Attack",
  key: "continuous-attack-39248",
  baseName: "Continuous Attack",
  description:
    "Increases your Weapon and Spell Damage by |cffffff5|r% and Health, Magicka, and Stamina Recovery by |cffffff10|r% for |cffffff10|r minutes after you capture a Lumber Mill, Farm, Mine, or Keep.\n\nGain Gallop at all times, increasing your Mount Speed by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 39248,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/passive",
  hashPlace: 247,
  createdAt: "2026-05-28T16:03:31.999Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5% (Constant)",
    "<<2>> = 10% (Constant)",
    "<<3>> = 10 minutes (Constant)",
    "<<4>> = Gallop (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
