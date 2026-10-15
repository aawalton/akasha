import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rushedCeremony = {
  id: "019e6f53-a69f-7a07-96f0-39be15ab421c",
  type: "page-type/temper-skill",
  slug: "rushed-ceremony",
  title: "Rushed Ceremony",
  key: "rushed-ceremony",
  baseName: "Rushed Ceremony",
  description:
    "Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health.",
  icon: "/esoui/art/icons/ability_templar_rushed_ceremony.dds",
  esoSkillId: 22250,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1118,
  createdAt: "2026-05-28T16:03:33.663Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
