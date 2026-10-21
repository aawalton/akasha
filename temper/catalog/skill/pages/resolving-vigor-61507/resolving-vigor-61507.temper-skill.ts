import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resolvingVigor61507 = {
  id: "019e6f53-a61d-7d5b-8c0b-9f923a5099a5",
  type: "page-type/temper-skill",
  slug: "resolving-vigor-61507",
  title: "Resolving Vigor",
  key: "resolving-vigor-61507",
  baseName: "Vigor",
  description:
    "Let loose a battle cry, instilling yourself with resolve and healing for |cffffff16968|r Health over |cffffff5|r seconds.\n\nAfter casting you gain Minor Resolve, increasing your Physical and Spell Resistance by |cffffff2974|r, for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_ava_resolving_vigor.dds",
  esoSkillId: 61507,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1044,
  createdAt: "2026-05-28T16:03:33.533Z",
  updatedAt: "2026-10-21T06:45:07.406Z",
  equations: [
    "<<1>> = 0.039986 MaxStat + 0.419853 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, DOT, 5s duration, 1s tick, ticks on application)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = Minor Resolve (Constant)",
    "<<4>> = 2974 (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
