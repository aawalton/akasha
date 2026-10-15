import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const breathOfLife22256 = {
  id: "019e6f53-9f8e-7fb6-b18d-dfda66934817",
  type: "page-type/temper-skill",
  slug: "breath-of-life-22256",
  title: "Breath of Life",
  key: "breath-of-life-22256",
  baseName: "Rushed Ceremony",
  description:
    "Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health.\n\nAlso heals one other injured target for |cffffff3773|r Health.",
  icon: "/esoui/art/icons/ability_templar_breath_of_life.dds",
  esoSkillId: 22256,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 166,
  createdAt: "2026-05-28T16:03:31.854Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, 0.001s duration, R2 = 1)",
    "<<2>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
