import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const riteOfPassage = {
  id: "019e6f53-a65a-7dae-b0c6-37c9bd76c556",
  type: "page-type/temper-skill",
  slug: "rite-of-passage",
  title: "Rite of Passage",
  key: "rite-of-passage",
  baseName: "Rite of Passage",
  description:
    "Channel the grace of the gods, healing you and nearby allies for |cffffff8767|r Health every |cffffff1|r second for |cffffff4|r seconds.\n\nYou cannot move while channeling, but you gain immunity to all disabling effects.",
  icon: "/esoui/art/icons/ability_templar_rite_of_passage.dds",
  esoSkillId: 22223,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1077,
  createdAt: "2026-05-28T16:03:33.594Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
