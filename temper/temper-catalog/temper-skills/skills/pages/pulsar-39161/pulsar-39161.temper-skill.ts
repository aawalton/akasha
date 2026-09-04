import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pulsar39161 = {
  id: "019e6f53-a559-7a38-b03a-904c08a78d24",
  pageTypeSlug: "temper-skill",
  slug: "pulsar-39161",
  title: "Pulsar",
  key: "pulsar-39161",
  baseName: "Impulse",
  description:
    '"Release a surge of elemental energy, dealing |cffffff6401|r Magic Damage to nearby enemies and afflicting them with Minor Mangle, reducing their Max Health by |cffffff10|r% for |cffffff10|r seconds.\\n\\nFlame Pulsar hits Burning enemies with Pulsar Afterburn, which deals more damage based on their missing Health.\\n\\nFrost Pulsar also provides Minor Protection.\\n\\nStorm Pulsar\'s damage increases based on the number of enemies hit."',
  icon: "/esoui/art/icons/ability_destructionstaff_008_b.dds",
  esoSkillId: 39161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
