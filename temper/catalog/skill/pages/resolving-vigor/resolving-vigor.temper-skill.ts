import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resolvingVigor = {
  id: "019e6251-4cdf-7613-9744-b1641dc991a1",
  type: "page-type/temper-skill",
  slug: "resolving-vigor",
  title: "Resolving Vigor",
  key: "resolving-vigor",
  baseName: "Vigor",
  description:
    "Let loose a battle cry, instilling yourself with resolve and healing for 5388 Health over 5 seconds.\n\nAfter casting you gain Minor Resolve, increasing your Physical and Spell Resistance by 2974, for 20 seconds.",
  icon: "/esoui/art/icons/ability_ava_resolving_vigor.dds",
  esoSkillId: 63255,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1043,
  createdAt: "2026-05-26T03:25:55.807Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.040015321 MaxStat + 0.420166552 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = Minor Resolve (Constant)",
    "<<4>> = 2974 (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
