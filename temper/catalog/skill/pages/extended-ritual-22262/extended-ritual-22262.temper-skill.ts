import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const extendedRitual22262 = {
  id: "019e6f53-a1d7-7cad-86de-fa56752c7ada",
  type: "page-type/temper-skill",
  slug: "extended-ritual-22262",
  title: "Extended Ritual",
  key: "extended-ritual-22262",
  baseName: "Cleansing Ritual",
  description:
    "Exalt in the sacred light of the Aedra, cleansing up to |cffffff5|r harmful effects from yourself immediately and healing you and nearby allies for |cffffff2657|r Health every |cffffff2|r seconds for |cffffff30|r seconds.\n\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for |cffffff6012|r Health.",
  icon: "/esoui/art/icons/ability_templar_extended_ritual.dds",
  esoSkillId: 22262,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 492,
  createdAt: "2026-05-28T16:03:32.439Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 (Constant)",
    "<<2>> = 0.0375577 MaxStat + 0.394411 MaxPower - 1.12337 (Ultimate, ratio = 10.50, Heal, AOE, Direct, 2s tick, R2 = 0.999999)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 24 seconds (Constant)",
    "<<5>> = Purify (Constant)",
    "<<6>> = 0.085 MaxStat + 0.8925 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
