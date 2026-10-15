import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const symbiosis = {
  id: "019e6238-c31d-7eda-a892-68fe356c5ce5",
  type: "page-type/temper-skill",
  slug: "symbiosis",
  title: "Symbiosis",
  key: "symbiosis",
  baseName: "Mend Wounds",
  description:
    "Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can be used on allies.\n\nYour Light Attacks heal for 972.\n\nYour Heavy Attacks heal for 863 every 1 second, and restore 1155 Magicka to you for successfully healing.\n\nYou heal yourself for 50% of the amount of healing done to the ally.",
  icon: "/esoui/art/icons/ability_psijic_006_b.dds",
  esoSkillId: 40103755,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 1320,
  createdAt: "2026-05-26T02:59:07.677Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.043217621 MaxStat + 0.453779339 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.038415204 MaxStat + 0.403359642 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 3600s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 1155 (Constant)",
    "<<5>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
