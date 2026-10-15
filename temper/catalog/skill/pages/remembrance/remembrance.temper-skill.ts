import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const remembrance = {
  id: "019e6245-a708-7756-858e-39936e3d650f",
  type: "page-type/temper-skill",
  slug: "remembrance",
  title: "Remembrance",
  key: "remembrance",
  baseName: "Rite of Passage",
  description:
    "Channel the grace of the gods, healing you and nearby allies for 2788 Health every 1 second for 4 seconds.\n\nGain Major Protection, reducing damage you take by 10% for 10 seconds.\n\nYou cannot move while channeling, but you gain immunity to all disabling effects.",
  icon: "/esoui/art/icons/ability_templar_remembrance.dds",
  esoSkillId: 27413,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1016,
  createdAt: "2026-05-26T03:13:12.456Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
