import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const practicedIncantation22226 = {
  id: "019e6f53-a538-73af-81db-fd147038dff6",
  type: "page-type/temper-skill",
  slug: "practiced-incantation-22226",
  title: "Practiced Incantation",
  key: "practiced-incantation-22226",
  baseName: "Rite of Passage",
  description:
    "Channel the grace of the gods, healing you and nearby allies for |cffffff8768|r Health every |cffffff1|r second for |cffffff8|r seconds.\n\nWhile channeling this ability, you gain immunity to all disabling effects.",
  icon: "/esoui/art/icons/ability_templar_practiced_incantation.dds",
  esoSkillId: 22226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 922,
  createdAt: "2026-05-28T16:03:33.304Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
