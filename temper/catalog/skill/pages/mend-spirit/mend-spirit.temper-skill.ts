import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mendSpirit = {
  id: "019e6238-c2e9-7653-94c4-453cc2bbb047",
  type: "page-type/temper-skill",
  slug: "mend-spirit",
  title: "Mend Spirit",
  key: "mend-spirit",
  baseName: "Mend Wounds",
  description:
    "Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that only can be used on allies.\n\nYour Light Attacks heal for 972.\n\nYour Heavy Attacks heal for 863 every 1 second, and restore 1155 Magicka to you for successfully healing.\n\nAfter you heal an ally you grant them Major Resolve, increasing their Physical and Spell Resistance by 5948 for 5 seconds.",
  icon: "/esoui/art/icons/ability_psijic_006_a.dds",
  esoSkillId: 40103747,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 814,
  createdAt: "2026-05-26T02:59:07.625Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.043217621 MaxStat + 0.453779339 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.038415204 MaxStat + 0.403359642 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 3600s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 1155 (Constant)",
    "<<5>> = Major Resolve (Constant)",
    "<<6>> = 5948 (Constant)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
