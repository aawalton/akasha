import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const remembrance22229 = {
  id: "019e6f53-a5eb-7f5b-8180-bc80d191a79a",
  type: "page-type/temper-skill",
  slug: "remembrance-22229",
  title: "Remembrance",
  key: "remembrance-22229",
  baseName: "Rite of Passage",
  description:
    "Channel the grace of the gods, healing you and nearby allies for |cffffff8768|r Health every |cffffff1|r second for |cffffff4|r seconds.\n\nGain Major Protection, reducing damage you take by |cffffff10|r% for |cffffff10|r seconds.\n\nYou cannot move while channeling, but you gain immunity to all disabling effects.",
  icon: "/esoui/art/icons/ability_templar_remembrance.dds",
  esoSkillId: 22229,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1017,
  createdAt: "2026-05-28T16:03:33.483Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
