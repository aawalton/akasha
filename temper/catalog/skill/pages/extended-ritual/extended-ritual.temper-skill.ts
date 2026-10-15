import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const extendedRitual = {
  id: "019e6245-a67f-71b5-8ae3-b84d20c1aba2",
  type: "page-type/temper-skill",
  slug: "extended-ritual",
  title: "Extended Ritual",
  key: "extended-ritual",
  baseName: "Cleansing Ritual",
  description:
    "Exalt in the sacred light of the Aedra, cleansing up to 5 harmful effects from yourself immediately and healing you and nearby allies for 844 Health every 2 seconds for 30 seconds.\n\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for 1912 Health.",
  icon: "/esoui/art/icons/ability_templar_extended_ritual.dds",
  esoSkillId: 27295,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 491,
  createdAt: "2026-05-26T03:13:12.319Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 (Constant)",
    "<<2>> = 0.0375577 MaxStat + 0.394411 MaxPower - 1.12337 (Ultimate, ratio = 10.50, Heal, AOE, Direct, 2s tick, R2 = 0.999999)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 30 seconds (Constant)",
    "<<5>> = Purify (Constant)",
    "<<6>> = 0.085 MaxStat + 0.8925 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
