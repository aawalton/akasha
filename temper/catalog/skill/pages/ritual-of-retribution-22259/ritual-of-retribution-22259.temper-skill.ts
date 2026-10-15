import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ritualOfRetribution22259 = {
  id: "019e6f53-a662-73c3-92e6-7de1f4f34073",
  type: "page-type/temper-skill",
  slug: "ritual-of-retribution-22259",
  title: "Ritual of Retribution",
  key: "ritual-of-retribution-22259",
  baseName: "Cleansing Ritual",
  description:
    "Exalt in the sacred light of the Aedra, cleansing up to |cffffff2|r harmful effects from yourself immediately.  While in the area, enemies take |cffffff1516|r Magic Damage every |cffffff2|r seconds for |cffffff20|r seconds which increases by |cffffff12|r% per tick.  \n\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for |cffffff6012|r Health.",
  icon: "/esoui/art/icons/ability_templar_purifying_ritual.dds",
  esoSkillId: 22259,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1081,
  createdAt: "2026-05-28T16:03:33.602Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2 (Constant)",
    "<<2>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, AOE, DOT, 2s tick, R2 = 0.999998)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = Purify (Constant)",
    "<<7>> = 0.085 MaxStat + 0.8925 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
