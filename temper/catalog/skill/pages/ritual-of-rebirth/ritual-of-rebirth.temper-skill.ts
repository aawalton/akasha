import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ritualOfRebirth = {
  id: "019e6245-a714-7326-b2a2-fcee0331c4fd",
  type: "page-type/temper-skill",
  slug: "ritual-of-rebirth",
  title: "Ritual of Rebirth",
  key: "ritual-of-rebirth",
  baseName: "Healing Ritual",
  description:
    "Focus your spiritual devotion, healing you and nearby allies for 2614 Health.\n\nYou heal a single ally outside this ability's radius for an additional 2700 Health.",
  icon: "/esoui/art/icons/ability_templar_ritual_of_rebirth.dds",
  esoSkillId: 27352,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1078,
  createdAt: "2026-05-26T03:13:12.468Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.120048029 MaxStat + 1.26049759 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
