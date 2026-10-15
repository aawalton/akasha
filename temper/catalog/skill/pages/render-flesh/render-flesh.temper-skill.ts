import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const renderFlesh = {
  id: "019e6f53-a5f4-7d93-8cec-8c09f9a1c257",
  type: "page-type/temper-skill",
  slug: "render-flesh",
  title: "Render Flesh",
  key: "render-flesh",
  baseName: "Render Flesh",
  description:
    "Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff10960|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%.",
  icon: "/esoui/art/icons/ability_necromancer_013.dds",
  esoSkillId: 114196,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1022,
  createdAt: "2026-05-28T16:03:33.492Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 6% (Constant)",
  ],
} as const satisfies TemperSkill
