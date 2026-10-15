import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deepSlash = {
  id: "019e6226-00e1-795f-966b-c0b5d4009510",
  type: "page-type/temper-skill",
  slug: "deep-slash",
  title: "Deep Slash",
  key: "deep-slash",
  baseName: "Low Slash",
  description:
    "Surprise an enemy with a sweeping lunge, dealing 1799 Physical Damage to them and other nearby enemies, afflicting them with Minor Maim, reducing their damage done by 5% for 15 seconds.\n\nEnemies hit also have their Movement Speed reduced by 30% for 4 seconds.",
  icon: "/esoui/art/icons/ability_1handed_001_b.dds",
  esoSkillId: 41403,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 341,
  createdAt: "2026-05-26T02:38:38.305Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 15 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
