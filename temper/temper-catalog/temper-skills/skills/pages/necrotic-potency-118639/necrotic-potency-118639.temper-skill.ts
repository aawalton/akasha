import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const necroticPotency118639 = {
  id: "019e6f53-a4bc-7644-aec6-77956aece043",
  pageTypeSlug: "temper-skill",
  slug: "necrotic-potency-118639",
  title: "Necrotic Potency",
  key: "necrotic-potency-118639",
  baseName: "Bitter Harvest",
  description:
    '"Sap the lingering life from fresh corpses, granting you |cffffff6|r Ultimate and healing |cffffff857|r Health every |cffffff1|r second for |cffffff2|r seconds per additional corpse. This ability scales off your Max Health.\\n\\nWhile slotted, your damage taken is reduced by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_011_b.dds",
  esoSkillId: 118639,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
