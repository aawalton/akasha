import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mendWounds = {
  id: "019e6f53-a471-737a-a83b-82667198ba8c",
  type: "page-type/temper-skill",
  slug: "mend-wounds",
  title: "Mend Wounds",
  key: "mend-wounds",
  baseName: "Mend Wounds",
  description:
    "Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can only be used on allies.\n\nYour Light Attacks heal for |cffffff2958|r.\n\nYour Heavy Attacks heal for |cffffff2629|r every |cffffff1|r second, and restore |cffffff1155|r Magicka to you for successfully healing.",
  icon: "/esoui/art/icons/ability_psijic_006.dds",
  esoSkillId: 103543,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 816,
  createdAt: "2026-05-28T16:03:33.105Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0405 MaxStat + 0.42525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.036 MaxStat + 0.378 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 3600s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 1155 (Constant)",
  ],
} as const satisfies TemperSkill
