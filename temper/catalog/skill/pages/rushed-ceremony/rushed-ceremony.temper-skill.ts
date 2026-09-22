import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rushedCeremony = {
  id: "019e6f53-a69f-7a07-96f0-39be15ab421c",
  type: "page-type/temper-skill",
  slug: "rushed-ceremony",
  title: "Rushed Ceremony",
  key: "rushed-ceremony",
  baseName: "Rushed Ceremony",
  description:
    '"Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health."',
  icon: "/esoui/art/icons/ability_templar_rushed_ceremony.dds",
  esoSkillId: 22250,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
