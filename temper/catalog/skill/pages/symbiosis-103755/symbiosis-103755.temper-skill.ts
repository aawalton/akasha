import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const symbiosis103755 = {
  id: "019e6f53-a811-7de0-9029-c1f2103363ec",
  type: "page-type/temper-skill",
  slug: "symbiosis-103755",
  title: "Symbiosis",
  key: "symbiosis-103755",
  baseName: "Mend Wounds",
  description:
    "Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can be used on allies.\n\nYour Light Attacks heal for |cffffff3056|r.\n\nYour Heavy Attacks heal for |cffffff2716|r every |cffffff1|r second, and restore |cffffff1155|r Magicka to you for successfully healing.\n\nYou heal yourself for |cffffff51|r% of the amount of healing done to the ally.",
  icon: "/esoui/art/icons/ability_psijic_006_b.dds",
  esoSkillId: 103755,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 1321,
  createdAt: "2026-05-28T16:03:34.033Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.041837 MaxStat + 0.439283 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.037188 MaxStat + 0.390474 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 3600s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 1155 (Constant)",
    "<<5>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
