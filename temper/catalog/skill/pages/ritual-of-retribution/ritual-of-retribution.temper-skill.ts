import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ritualOfRetribution = {
  id: "019e6245-a715-7407-a98c-a25124443ff3",
  type: "page-type/temper-skill",
  slug: "ritual-of-retribution",
  title: "Ritual of Retribution",
  key: "ritual-of-retribution",
  baseName: "Cleansing Ritual",
  description:
    "Exalt in the sacred light of the Aedra, cleansing up to 2 harmful effects from yourself immediately.  While in the area, enemies take 435 Magic Damage every 2 seconds for 20 seconds which increases by 12% per tick.  \n\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for 1912 Health.",
  icon: "/esoui/art/icons/ability_templar_purifying_ritual.dds",
  esoSkillId: 27275,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1080,
  createdAt: "2026-05-26T03:13:12.469Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2 (Constant)",
    "<<2>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Magic, AOE, DOT, 2s tick, R2 = 0.999997)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = Purify (Constant)",
    "<<7>> = 0.085 MaxStat + 0.8925 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
