import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fleetstepWings = {
  id: "019e6245-a686-7996-9d9e-1263bf319fce",
  type: "page-type/temper-skill",
  slug: "fleetstep-wings",
  title: "Fleetstep Wings",
  key: "fleetstep-wings",
  baseName: "Wing Buffet",
  description:
    '"Unfurl draconic wings to knock back enemies around you 4 meters and stun them for 1.8 seconds.\\n\\nThe enchanted winds summoned by your wings coalesce around you, reducing your damage taken from projectiles by 50% for 6 seconds, while granting you immunity to snares and immobilizations and Major Expedition for 4 seconds, increasing Movement Speed by 30%."',
  icon: "/esoui/art/icons/ability_dragonknight_008_b.dds",
  esoSkillId: 21014,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
