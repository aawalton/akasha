import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deadenPain118623 = {
  id: "019e6f53-a08c-7599-adeb-1fe73d4ef237",
  type: "page-type/temper-skill",
  slug: "deaden-pain-118623",
  title: "Deaden Pain",
  key: "deaden-pain-118623",
  baseName: "Bitter Harvest",
  description:
    "Sap the lingering life from fresh corpses, granting you |cffffff2|r Ultimate and healing |cffffff857|r Health every |cffffff1|r second for |cffffff4|r seconds per corpse consumed. While you have the heal effect, you gain Major Protection, reducing the damage you take by |cffffff10|r%. This ability scales off your Max Health.\n\nWhile slotted, your damage taken is reduced by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_011_a.dds",
  esoSkillId: 118623,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 323,
  createdAt: "2026-05-28T16:03:32.108Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2 (Constant)",
    "<<2>> = 0.04132 Health (Health, RankMod(1), Heal, SingleTarget, DOT, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
