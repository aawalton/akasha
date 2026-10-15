import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const practicedIncantation = {
  id: "019e6245-a6ed-7aaa-a4e1-779d6c204390",
  type: "page-type/temper-skill",
  slug: "practiced-incantation",
  title: "Practiced Incantation",
  key: "practiced-incantation",
  baseName: "Rite of Passage",
  description:
    "Channel the grace of the gods, healing you and nearby allies for 2788 Health every 1 second for 8 seconds.\n\nWhile channeling this ability, you gain immunity to all disabling effects.",
  icon: "/esoui/art/icons/ability_templar_practiced_incantation.dds",
  esoSkillId: 27427,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 921,
  createdAt: "2026-05-26T03:13:12.429Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
