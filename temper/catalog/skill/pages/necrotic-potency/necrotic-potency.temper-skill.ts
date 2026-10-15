import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const necroticPotency = {
  id: "019e6245-a6da-755e-b740-75d4663f5624",
  type: "page-type/temper-skill",
  slug: "necrotic-potency",
  title: "Necrotic Potency",
  key: "necrotic-potency",
  baseName: "Bitter Harvest",
  description:
    "Sap the lingering life from fresh corpses, granting you 6 Ultimate and healing 682 Health every 1 second for 2 seconds per additional corpse. This ability scales off your Max Health.\n\nWhile slotted, your damage taken is reduced by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_011_b.dds",
  esoSkillId: 40118639,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 855,
  createdAt: "2026-05-26T03:13:12.410Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = 0.04268356 Health (Health, RankMod(1.033), Heal, SingleTarget, DOT, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
