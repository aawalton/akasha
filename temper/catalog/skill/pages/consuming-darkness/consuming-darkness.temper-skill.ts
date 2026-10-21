import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const consumingDarkness = {
  id: "019e6f53-a019-76aa-aa31-3f54342e3077",
  type: "page-type/temper-skill",
  slug: "consuming-darkness",
  title: "Consuming Darkness",
  key: "consuming-darkness",
  baseName: "Consuming Darkness",
  description:
    "Conjure a ring of shadow, reducing the Movement Speed of enemies by |cffffff70|r% and granting you and your allies Major Protection, reducing your damage taken by |cffffff10|r%.\n\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by |cffffff70|r%, and healing them for |cffffff28640|r Health over |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_015.dds",
  esoSkillId: 25411,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 243,
  createdAt: "2026-05-28T16:03:31.993Z",
  updatedAt: "2026-10-21T07:12:28.248Z",
  equations: [
    "<<1>> = 70% (Constant)",
    "<<2>> = Major Protection (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = Hidden Refresh (Constant)",
    "<<5>> = 70% (Constant)",
    "<<6>> = 0.081 MaxStat + 0.8503 MaxPower (Ultimate, Heal, SingleTarget, DOT, 4s duration, 1s tick, ticks on application, own duration)",
    "<<7>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
