import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const breathOfLife = {
  id: "019e6245-a606-7e0b-9275-9d52f1a6bb1d",
  type: "page-type/temper-skill",
  slug: "breath-of-life",
  title: "Breath of Life",
  key: "breath-of-life",
  baseName: "Rushed Ceremony",
  description:
    "Beacon your inner light, healing yourself or a wounded ally in front of you for 3485 Health.\n\nAlso heals one other injured target for 1199 Health.",
  icon: "/esoui/art/icons/ability_templar_breath_of_life.dds",
  esoSkillId: 24222,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 165,
  createdAt: "2026-05-26T03:13:12.198Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, 0.001s duration, R2 = 1)",
    "<<2>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
